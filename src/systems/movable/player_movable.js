/*
 * Tristan Hilbert & Cory Hayes
 * 3/2/2020
 * 
 * Returns a function for a player movable object
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

function get_move_functions(state_const, player_name, input_map){

    // flip sprite to face proper direction
    function resolve_rotate(state){
        // turn sprite if necessary
        if(state[player_name].facingRight != state[player_name].facingRightPrev){
            state[player_name].animation.scaleX = state[player_name].animation.scaleX * -1;
            state[player_name].animation.x -= state[player_name].animation.scaleX * state[player_name].width;
            state[player_name].facingRightPrev = state[player_name].facingRight;
        }
    }

    const speed_x = Math.floor(state_const[player_name].width / 8);
    const speed_y = Math.floor(state_const[player_name].height / 8);

    // 1.414214 = SQRT(2)
    const speed_lin = Math.round(state_const[player_name].height / (8 * 1.414214));

    function resolve_movement(state){

        // Player moves
        var isPlayerMoving = false;
        var diffx = 0;
        var diffy = 0;

        // Move Up
        if(state.input & input_map["up"]){
            diffy -= speed_y;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
        }

        // Move Down
        if(state.input & input_map["down"]){
            diffy += speed_y;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
        }

        // Move Right
        if(state.input & input_map["right"]){
            diffx += speed_x;
            state[player_name].facingRight = true;
            isPlayerMoving = true;
        }

        // Move Left
        if(state.input & input_map["left"]){
            diffx -= speed_x;
            state[player_name].facingRight = false;
            isPlayerMoving = true;
        }

        if(diffx != 0 && diffy != 0){
            state[player_name].animation.x += speed_lin * (diffx / Math.abs(diffx));
            state[player_name].animation.y += speed_lin * (diffy / Math.abs(diffy));
        }else{
            state[player_name].animation.x += diffx;
            state[player_name].animation.y += diffy;
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