// Input Flag Enum
const input_flag_none = 0;
const input_flag_up1 = 1;
const input_flag_right1 = 2;
const input_flag_down1 = 4;
const input_flag_left1 = 8;
const input_flag_special1 = 16;
const input_flag_exit = 32;
const input_flag_up2 = 64;
const input_flag_right2 = 128;
const input_flag_down2 = 256;
const input_flag_left2 = 512;
const input_flag_special2 = 1024;

// tile dimenstions
const tile_dim = 16;

// 2D array initialized in genMap to store map
var tiles;

// init canvas object
var stage = new createjs.Stage("game_board");

// stores game state
var state;

// Input Event Async Buffer
var input_buffer_down = input_flag_none;
document.addEventListener("keydown", (event) => {
    var key_code_temp = event.keyCode;
    var string_conv_temp = String.fromCharCode(key_code_temp);
	
	//start player1 run animation
	if(string_conv_temp == "W" || string_conv_temp == "D" || string_conv_temp == "S" || string_conv_temp == "A"){
		if(state.player1.isMoving == false){
			state.player1.animation.gotoAndPlay(0);
			state.player1.isMoving = true;
		}
	}
	
	//start player2 run animation
	if(string_conv_temp == "I" || string_conv_temp == "L" || string_conv_temp == "K" || string_conv_temp == "J"){
		if(state.player2.isMoving == false){
			state.player2.animation.gotoAndPlay(0);
			state.player2.isMoving = true;
		}
	}
	
    // Key Definitions A->B Encoding
    switch(string_conv_temp){
        case "W":
            input_buffer_down = input_buffer_down | input_flag_up1;
            break;
        case "D":
            input_buffer_down = input_buffer_down | input_flag_right1;
			state.player1.facingRight = true;
            break;
        case "S":
            input_buffer_down = input_buffer_down | input_flag_down1;
            break;
        case "A":
            input_buffer_down = input_buffer_down | input_flag_left1;
			state.player1.facingRight = false;
            break;
		case "I":
            input_buffer_down = input_buffer_down | input_flag_up2;
            break;
        case "L":
            input_buffer_down = input_buffer_down | input_flag_right2;
			state.player2.facingRight = true;
            break;
        case "K":
            input_buffer_down = input_buffer_down | input_flag_down2;
            break;
        case "J":
            input_buffer_down = input_buffer_down | input_flag_left2;
			state.player2.facingRight = false;
            break;
        default:
            console.log(key_code_temp);
            console.log(string_conv_temp);
            break;
    }

    switch(key_code_temp){
        case 27: /* Escape Key */
            input_buffer_down = input_buffer_down | input_flag_exit;
            break;
        default:
            break;
    }
});

document.addEventListener("keyup", (event) => {
    var key_code_temp = event.keyCode;
    var string_conv_temp = String.fromCharCode(key_code_temp);
	
	//stop player1 run animation
	if(string_conv_temp == "W" || string_conv_temp == "D" || string_conv_temp == "S" || string_conv_temp == "A"){
		if(state.player1.isMoving == true){
			state.player1.animation.gotoAndStop(0);
			state.player1.isMoving = false;
		}
	}
	
	//stop player2 run animation
	if(string_conv_temp == "I" || string_conv_temp == "L" || string_conv_temp == "K" || string_conv_temp == "J"){
		if(state.player2.isMoving == true){
			state.player2.animation.gotoAndStop(0);
			state.player2.isMoving = false;
		}
	}
	
    // Key Definitions A->B Encoding
    switch(string_conv_temp){
        case "W":
            input_buffer_down = input_buffer_down & ~input_flag_up1;
            break;
        case "D":
            input_buffer_down = input_buffer_down & ~input_flag_right1;
            break;
        case "S":
            input_buffer_down = input_buffer_down & ~input_flag_down1;
            break;
        case "A":
            input_buffer_down = input_buffer_down & ~input_flag_left1;
            break;
		case "I":
            input_buffer_down = input_buffer_down & ~input_flag_up2;
            break;
        case "L":
            input_buffer_down = input_buffer_down & ~input_flag_right2;
            break;
        case "K":
            input_buffer_down = input_buffer_down & ~input_flag_down2;
            break;
        case "J":
            input_buffer_down = input_buffer_down & ~input_flag_left2;
            break;
        default:
            break;
    }

    switch(key_code_temp){
        case 27: /* Escape Key */
            input_buffer_down = input_buffer_down & input_flag_exit;
            break;
        default:
            break;
    }
});

// Setup Function for Setting Up State Object
function setup(){
	var knightImg = new Image(196, 16);                             // width, height of resized knight image
	knightImg.src = "assets/images/knight_run_spritesheet.png";
	
	var spriteWidth = 16;
	var spriteHeight = 16;
	
	// knight run spritesheet data
	var knightSheet = {
		images: [knightImg],
		frames: {width: spriteWidth, height: spriteHeight},
		framerate: 15
	};
	
	// create sprites	
	var knightSprite = new createjs.SpriteSheet(knightSheet);
	var animation1 = new createjs.Sprite(knightSprite);
	var animation2 = new createjs.Sprite(knightSprite);
	
    // setup player data
    var state = {
		player1: {
			animation: animation1,
			isMoving: false,
			facingRight: true,
			facingRightPrev: true,
			width: spriteWidth,
			height: spriteHeight
		},
		player2: {
			animation: animation2,
			isMoving: false,
			facingRight: true,
			facingRightPrev: true,
			width: spriteWidth,
			height: spriteHeight
		},
        input: 0,
        exit: false
    }

    return state;
}

// create map of size X tiles width, Y tiles height
function gen_map(x, y){
	// random number of rooms between 3 - 5
	const room_count = Math.floor(Math.random() * 3 + 8);

	// room tile count variability +-5%
	const room_margin = 0.05;
	
	const tile_count = x * y;
	const tile_colors = [
		"floor_1.png",
		"floor_2.png",
		"floor_3.png",
		"floor_4.png",
		"floor_5.png",
		"floor_6.png",
		"floor_7.png",
		"floor_8.png",
		"floor_9.png",
		"floor_10.png",
	]
	
	var tilesRemaining = tile_count;
	var tilesPerRoom = [];
	
	tiles = [];
	
	// initialize tiles 2D array
	for(var i = 0; i < x; i++){
		tiles[i] = [];
		
		for(var j = 0; j < y; j++){
			tiles[i][j] = {
				color: null,
				x: i * tile_dim,
				y: j * tile_dim,
			};
		}
	}
	
	// allocate first (room_count - 1) rooms an amount of tiles
	for(var i = 0; i < room_count - 1; i++){
		//tilesPerRoom[i] = Math.floor(tile_count / room_count + (Math.random() * 2 * room_margin - room_margin) * tile_count); // giving too much variability
		tilesPerRoom[i] = Math.floor(tile_count / room_count);
		tilesRemaining -= tilesPerRoom[i];
	}
	
	// allocate last room remaining tiles
	tilesPerRoom[room_count - 1] = tilesRemaining;
	
	for(var i = 0; i < room_count; i++){
		var startTileX;
		var startTileY;
		
		do{
			startTileX = Math.floor(Math.random() * x);
			startTileY = Math.floor(Math.random() * y);
		}while(tiles[startTileX][startTileY].color != null)
		
		create_tiles(tilesPerRoom[i] - 1, tile_colors[i], startTileX, startTileY, x, y);
	}
	
	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[i].length; j++){
			if(tiles[i][j].color == null){
				tiles[i][j].color = "wall_1.png";
			}
		}
	}
	
}

function create_tiles(tileCount, setColor, x, y, max_x, max_y){
	if(x >= 0 && x < max_x && y >= 0 && y < max_y && tileCount > 0){
		if(tiles[x][y].color == null){
			tiles[x][y].color = setColor;
			
			create_tiles(--tileCount, setColor, --x, y, max_x, max_y);
			create_tiles(--tileCount, setColor, x, --y, max_x, max_y);
			create_tiles(--tileCount, setColor, ++x, y, max_x, max_y);
			create_tiles(--tileCount, setColor, x, ++y, max_x, max_y);
		}
		else if(tiles[x][y].color != setColor){
			tiles[x][y].color = "wall_1.png";
		}
		else{
			return;
		}
	}
	else{
		return;
	}
}

function draw_map(){
	const assets_dir = "assets/images/";
	// Bad tiles instantiation. Some tiles are empty
	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[i].length; j++){
			var newTile;

			newTile = new createjs.Bitmap(assets_dir + tiles[i][j].color);
			newTile.x = tiles[i][j].x;
			newTile.y = tiles[i][j].y;
			stage.addChild(newTile);
		}
	}
}

/* Systems -- Resolves */
function resolve_input(){
    // Initializations
    state.input = input_buffer_down; // READ_ONLY NO LOCK
    // No Need to return state as the object will be passed by ref
}

function resolve_player(){
    if(state.input & input_flag_none){
        return; // Reduce Workload
    }

	// Player one moves
    // Move Up
    if(state.input & input_flag_up1){
        state.player1.animation.y -= 2;
    }

    // Move Right
    if(state.input & input_flag_right1){
        state.player1.animation.x += 2;
    }

    // Move Down
    if(state.input & input_flag_down1){
        state.player1.animation.y += 2;
    }

    // Move Left
    if(state.input & input_flag_left1){
        state.player1.animation.x -= 2;
    }
	
	// Player two moves
	// Move Up
    if(state.input & input_flag_up2){
        state.player2.animation.y -= 2;
    }

    // Move Right
    if(state.input & input_flag_right2){
        state.player2.animation.x += 2;
    }

    // Move Down
    if(state.input & input_flag_down2){
        state.player2.animation.y += 2;
    }

    // Move Left
    if(state.input & input_flag_left2){
        state.player2.animation.x -= 2;
    }
}

function resolve_exit(){
    if(state.input & input_flag_exit){
        state.exit = true;
    }
}

// flip sprite to face proper direction
function rotate_player(){
	// turn sprite if necessary
	if(state.player1.facingRight != state.player1.facingRightPrev){
		state.player1.animation.scaleX = state.player1.animation.scaleX * -1;
		state.player1.animation.x -= state.player1.animation.scaleX * state.player1.width;
		state.player1.facingRightPrev = state.player1.facingRight;
	}
	
	// turn sprite if necessary
	if(state.player2.facingRight != state.player2.facingRightPrev){
		state.player2.animation.scaleX = state.player2.animation.scaleX * -1;
		state.player2.animation.x -= state.player2.animation.scaleX * state.player2.width;
		state.player2.facingRightPrev = state.player2.facingRight;
	}
}

// handles canvas updates
function update(event){
	// Tasks or Systems (resolves)
    resolve_input();
    resolve_player();
	rotate_player();
    resolve_exit();
    
    // Check Exit Condition
    if(state.exit){
        window.close();
    }
	
	stage.update(event);
}

function main(){
	state = setup();
	gen_map((Math.floor(stage.canvas.width / tile_dim)), (Math.floor(stage.canvas.height / tile_dim)));
	draw_map();
	
	stage.addChild(state.player1.animation);
	stage.addChild(state.player2.animation);
	createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", update);
}

main();