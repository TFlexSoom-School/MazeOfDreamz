/*
 * Tristan Hilbert & Cory Hayes
 * 3/2/2020
 * 
 * Returns a function for a movable object
 * 
 */

/*
 * get_move_functions
 * Returns the resolves for movement associated with a player typically
 * 
 * player_name :: string name of player in state object
 * input_map :: {"up" : input_flag_val, "left": input_flag_val, "down"..., "right"}
 * 
 */

function get_move_functions(player_name, input_map){

    // flip sprite to face proper direction
    function resolve_rotate(state){
        // turn sprite if necessary
        if(state[player_name].facingRight != state[player_name].facingRightPrev){
            state[player_name].animation.scaleX = state[player_name].animation.scaleX * -1;
            state[player_name].animation.x -= state[player_name].animation.scaleX * state[player_name].width;
            state[player_name].facingRightPrev = state[player_name].facingRight;
        }
    }


    function resolve_movement(state){
        // Player one moves
        var isPlayerMoving = false;

        // Move Up
        if(state.input & input_map["up"]){
            state[player_name].animation.y -= 2;
            isPlayerMoving = true;
            console.log("UP");
        }

        // Move Right
        if(state.input & input_map["right"]){
            state[player_name].animation.x += 2;
            state[player_name].facingRight = true;
            isPlayerMoving = true;
            console.log("RIGHT");
        }

        // Move Down
        if(state.input & input_map["down"]){
            state[player_name].animation.y += 2;
            isPlayerMoving = true;
            console.log("DOWN");
        }

        // Move Left
        if(state.input & input_map["left"]){
            state[player_name].animation.x -= 2;
            state[player_name].facingRight = false;
            isPlayerMoving = true;
            console.log("LEFT");
        }
        
        // Animate Player
        if(isPlayerMoving && state[player_name].isMoving == false){
            state[player_name].animation.gotoAndPlay(0);
            state[player_name].isMoving = true;
        }else if(isPlayerMoving == false){
            state[player_name].animation.gotoAndStop(0);
            state[player_name].isMoving = false;
        }
    }

    return {
        resolve_movement: resolve_movement,
        resolve_rotate: resolve_rotate
    }
}