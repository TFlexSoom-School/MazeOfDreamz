// Input Flag Enum
const input_flag_none = 0;
const input_flag_up = 1;
const input_flag_right = 2;
const input_flag_down = 4;
const input_flag_left = 8;
const input_flag_special = 16;
const input_flag_exit = 32;

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
	
	//start player run animation
	if(state.player.isMoving == false){
		state.player.animation.gotoAndPlay(0);
		state.player.isMoving = true;
	}
	
    // Key Definitions A->B Encoding
    switch(string_conv_temp){
        case "W":
            input_buffer_down = input_buffer_down | input_flag_up;
            break;
        case "D":
            input_buffer_down = input_buffer_down | input_flag_right;
			state.player.facingRight = true;
            break;
        case "S":
            input_buffer_down = input_buffer_down | input_flag_down;
            break;
        case "A":
            input_buffer_down = input_buffer_down | input_flag_left;
			state.player.facingRight = false;
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
	
	//stop player run animation
	if(state.player.isMoving == true){
		state.player.animation.gotoAndStop(0);
		state.player.isMoving = false;
	}
	
    // Key Definitions A->B Encoding
    switch(string_conv_temp){
        case "W":
            input_buffer_down = input_buffer_down & ~input_flag_up;
            break;
        case "D":
            input_buffer_down = input_buffer_down & ~input_flag_right;
            break;
        case "S":
            input_buffer_down = input_buffer_down & ~input_flag_down;
            break;
        case "A":
            input_buffer_down = input_buffer_down & ~input_flag_left;
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

	// create sprite	
	var knightSprite = new createjs.SpriteSheet(knightSheet);
	var animation = new createjs.Sprite(knightSprite);
	
    // setup player data
    var state = {
		player: {
			animation: animation,
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
	// random number of rooms between 3 - 4
	const room_count = Math.floor(Math.random() * 2 + 3);
	
	// room tile count variability +-5%
	const room_margin = 0.05;
	
	const tile_count = x  * y;
	const tile_colors = [
		"floor_1.png", 
		"floor_2.png", 
		"floor_9.png", 
		"floor_side4.png"
	];
	
	var tilesRemaining = tile_count;
	var tilesPerRoom = [];
	
	tiles = [];
	
	// initialize tiles 2D array
	for(var i = 0; i < x; i++){
		tiles[i] = [];
	}
	
	// allocate first (room_count - 1) rooms an amount of tiles
	for(var i = 0; i < room_count - 1; i++){
		tilesPerRoom[i] = tile_count / room_count + Math.floor((Math.random() * 2 * room_margin - room_margin) * tile_count);
		tilesRemaining = tilesRemaining - tilesPerRoom[i];
	}
	
	// allocate last room remaining tiles
	tilesPerRoom[i - 1] = tilesRemaining;
	
	for(var i = 0; i < room_count; i++){
		var startTileX = 0;
		var startTileY = 0;
		
		while(tiles[startTileX][startTileY] != null){
			startTileX = Math.floor(Math.random() * x);
			startTileY = Math.floor(Math.random() * y);
		}
		
		create_tiles(tilesPerRoom[i], tile_colors[i], startTileX, startTileY, x, y);
	}
}

function create_tiles(tileCount, color, x, y, max_x, max_y){
	if(x >= 0 && x < max_x && y >= 0 && y < max_y && tileCount > 0){
		if(tiles[x][y] == null){
			tiles[x][y] = {
				color: this.color,
				x: this.x * tile_dim,
				y: this.y * tile_dim,
			};
			
			create_tiles(--tileCount, color, --x, --y, max_x, max_y);
			create_tiles(--tileCount, color, --x, ++y, max_x, max_y);
			create_tiles(--tileCount, color, ++x, --y, max_x, max_y);
			create_tiles(--tileCount, color, ++x, ++y, max_x, max_y);
		}
		else if(tiles[x][y].color != this.color){
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
	/* Bad tiles instantiation. Some tiles are empty
	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[i].length; j++){
			console.log(i, j);
			var newTile = new createjs.Bitmap(assets_dir + tiles[i][j].color);
			
			newTile.x = tiles[i][j].x;
			newTile.y = tiles[i][j].y;
			stage.addChild(newTile);
		}
	}
	*/
	for(var i = 0; i < stage.canvas.width / tile_dim; i++){
		for(var j = 0; j < stage.canvas.height / tile_dim; j++){
			var newTile = new createjs.Bitmap(assets_dir + "floor_1.png");
			
			newTile.x = i * tile_dim;
			newTile.y = j * tile_dim;
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

    // Move Up
    if(state.input & input_flag_up){
        state.player.animation.y -= 2;
    }

    // Move Right
    if(state.input & input_flag_right){
        state.player.animation.x += 2;
    }

    // Move Down
    if(state.input & input_flag_down){
        state.player.animation.y += 2;
    }

    // Move Left
    if(state.input & input_flag_left){
        state.player.animation.x -= 2;
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
	if(state.player.facingRight != state.player.facingRightPrev){
		state.player.animation.scaleX = state.player.animation.scaleX * -1;
		state.player.animation.x -= state.player.animation.scaleX * state.player.width;
		state.player.facingRightPrev = state.player.facingRight;
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
	gen_map((stage.canvas.width / tile_dim), (stage.canvas.height / tile_dim));
	draw_map();
	
	stage.addChild(state.player.animation);
	createjs.Ticker.setFPS(45);
    createjs.Ticker.addEventListener("tick", update);
}

main();