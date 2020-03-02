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

// Input Event Async Buffer
var input_buffer_down = input_flag_none;
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
function copy_inputs(){
    // Initializations
    var copy = [input_buffer_down, input_buffer_up]; // READ_ONLY NO LOCK
    return copy;
}


function resolve_input(){
    var copy = copy_inputs();

    return copy[0] & ~copy[1];
    // No Need to return state as the object will be passed by ref
}

function get_default_player1_control_map(){
    return {
        "up": input_flag_up1,
        "right": input_flag_right1,
        "down": input_flag_down1,
        "left": input_flag_left1,
        "special": input_flag_special1
    }
}

function get_default_player2_control_map(){
    return {
        "up": input_flag_up2,
        "right": input_flag_right2,
        "down": input_flag_down2,
        "left": input_flag_left2,
        "special": input_flag_special2
    }
}