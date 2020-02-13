// Input Flag Enum
const input_flag_none = 0;
const input_flag_up = 1;
const input_flag_right = 2;
const input_flag_down = 4;
const input_flag_left = 8;
const input_flag_special = 16;
const input_flag_exit = 32;

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
	var spriteWidth = 64;
	var spriteHeight = 64;
	
	// knight run spritesheet data
	var knightSheet = {
		images: ["assets/images/knight_run_spritesheet.png"],
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
	
	stage.addChild(state.player.animation);
	createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", update);
}

main();