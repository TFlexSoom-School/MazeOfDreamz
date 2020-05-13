/* 
 * Refactored by Tristan Hilbert
 * 3/2/2020
 * Input System
 * 
 */

// Input Flag Enum
const input_flag_none = 0;
const input_flag_up1 = 1 << 0;
const input_flag_right1 = 1 << 1;
const input_flag_down1 = 1 << 2;
const input_flag_left1 = 1 << 3;
const input_flag_special1 = 1 << 4;
const input_flag_exit = 1 << 5;
const input_flag_up2 = 1 << 6;
const input_flag_right2 = 1 << 7;
const input_flag_down2 = 1 << 8;
const input_flag_left2 = 1 << 9;
const input_flag_special2 = 1 << 10;

/*
 * Eventually it might be nice to consider multiple
 * input flag Enums... This would prevent overflow
 * after shifting so many times. As long as we don't
 * have 32 different flags though, we should be fine.
 */


// ID for Input System
const input_id = "input";

// Register Input to State (No entity required)
// This should be done for most games
function register_input(state){
    state[input_id] = input_flag_none;
}

// Input Event Async Buffer
var input_buffer_down = input_flag_none;

// Add Any keys that are down to the down buffer
document.addEventListener("keydown", (event) => {
    var key_code_temp = event.keyCode;
    var string_conv_temp = String.fromCharCode(key_code_temp);
	
    // Key Definitions A->B Encoding
    switch(string_conv_temp){
        case "W":
            input_buffer_down = input_buffer_down | input_flag_up1;
            input_buffer_up = input_buffer_up & ~input_flag_up1;
            break;
        case "D":
            input_buffer_down = input_buffer_down | input_flag_right1;
            input_buffer_up = input_buffer_up & ~input_flag_right1;
            break;
        case "S":
            input_buffer_down = input_buffer_down | input_flag_down1;
            input_buffer_up = input_buffer_up & ~input_flag_down1;
            break;
        case "A":
            input_buffer_down = input_buffer_down | input_flag_left1;
            input_buffer_up = input_buffer_up & ~input_flag_left1;
            break;
        case "E":
            input_buffer_down = input_buffer_down | input_flag_special1;
            input_buffer_up = input_buffer_up & ~input_flag_special1;
            break;
		case "I":
            input_buffer_down = input_buffer_down | input_flag_up2;
            input_buffer_up = input_buffer_up & ~input_flag_up2;
            break;
        case "L":
            input_buffer_down = input_buffer_down | input_flag_right2;
            input_buffer_up = input_buffer_up & ~input_flag_right2;
            break;
        case "K":
            input_buffer_down = input_buffer_down | input_flag_down2;
            input_buffer_up = input_buffer_up & ~input_flag_down2;
            break;
        case "J":
            input_buffer_down = input_buffer_down | input_flag_left2;
            input_buffer_up = input_buffer_up & ~input_flag_left2;
            break;
        case "O":
            input_buffer_down = input_buffer_down | input_flag_special2;
            input_buffer_up = input_buffer_up & ~input_flag_special2;
            break;
        default:
            //console.log(key_code_temp);
            //console.log(string_conv_temp);
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

// Input Event Async Buffer
var input_buffer_up = input_flag_none;

// Add any keys that have come up in the on buffer
document.addEventListener("keyup", (event) => {
    var key_code_temp = event.keyCode;
    var string_conv_temp = String.fromCharCode(key_code_temp);
	
    // Key Definitions A->B Encoding
    switch(string_conv_temp){
        case "W":
            input_buffer_up = input_buffer_up | input_flag_up1;
            break;
        case "D":
            input_buffer_up = input_buffer_up | input_flag_right1;
            break;
        case "S":
            input_buffer_up = input_buffer_up | input_flag_down1;
            break;
        case "A":
            input_buffer_up = input_buffer_up | input_flag_left1;
            break;
        case "E":
            input_buffer_up = input_buffer_up | input_flag_special1;
            break;
		case "I":
            input_buffer_up = input_buffer_up | input_flag_up2;
            break;
        case "L":
            input_buffer_up = input_buffer_up | input_flag_right2;
            break;
        case "K":
            input_buffer_up = input_buffer_up | input_flag_down2;
            break;
        case "J":
            input_buffer_up = input_buffer_up | input_flag_left2;
            break;
        case "O":
            input_buffer_up = input_buffer_up | input_flag_special2;
            break;
        default:
            //console.log(key_code_temp);
            //console.log(string_conv_temp);
            break;
    }

    switch(key_code_temp){
        case 27: /* Escape Key */
            input_buffer_up = input_buffer_up | input_flag_exit;
            break;
        default:
            break;
    }
});

/* Systems -- Resolves */
// This function then copies the input buffers. Doing this
// in one instruction due to the race condition it causes
//
function copy_inputs(){
    // Initializations
    var copy = [input_buffer_down, input_buffer_up]; // READ_ONLY NO LOCK
    return copy;
}

// Changes Game State based on internal buffers
function resolve_input(state){
    var copy = copy_inputs();
    state[input_id] = copy[0] & ~copy[1];
}

// Getter for Control Maps to test if certain buttons are pressed
// or not.
function get_default_player_control_map(player){
    if(player == 1){
        return {
            "up": input_flag_up1,
            "right": input_flag_right1,
            "down": input_flag_down1,
            "left": input_flag_left1,
            "special": input_flag_special1
        }
    }else if(player == 2){
        return {
            "up": input_flag_up2,
            "right": input_flag_right2,
            "down": input_flag_down2,
            "left": input_flag_left2,
            "special": input_flag_special2
        }
    }else{
        throw "Only Players 1 and 2 have defined mappings!";
    }
}