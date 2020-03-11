/*
 * Tristan Hilbert & Cory Hayes & Haofeng Tian
 * 3/9/2020
 * 
 * Returns a function for a player movable object
 * 
 */

const player_movable_id = "player_movable"
function register_player_movable(state, id, mapping_number){
    if(!state[player_movable_id]){
        state[player_movable_id] = {
            registry: []
        };
    }

    state[player_movable_id].registry.push({
        entity: id, 
        input_mapping: get_default_player_control_map(mapping_number) // See input.js
    });

    state[id].speed_x = Math.floor(state[id].width / 8);
    state[id].speed_y = Math.floor(state[id].height / 8);
    // 1.414214 = SQRT(2)
    state[id].speed_lin = Math.round(state[id].height / (8 * 1.414214));
}

function resolve_player_movable(state){
    if(state[player_movable_id]){

        for(var i = 0; i < state[player_movable_id].registry.length; i ++){
            resolve_movement_individual(
                state,
                state[  state[player_movable_id].registry[i].entity  ],
                state[player_movable_id].registry[i].input_mapping,
                i
            );
            
            resolve_rotate_individual(
                state[  state[player_movable_id].registry[i].entity  ]
            );

        }
    }

}


function resolve_movement_individual(state, entity, input_map, i){
    // Player moves
    var isPlayerMoving = false;
    var diffx = 0;
    var diffy = 0;
    var direction;
    // Move Up
    if (state.input & input_map["up"]) {
        direction = "up";
        if (!collision(state, tiles, i, direction)) {
            diffy -= entity.speed_y;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
        }
    }

    // Move Down
    if (state.input & input_map["down"]) {
        direction = "down";
        if (!collision(state, tiles, i, direction)) {
            diffy += entity.speed_y;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
        }
    }

    // Move Right
    if(state.input & input_map["right"]){
        direction = "right";
        if (!collision(state, tiles, i, direction)) {
            diffx += entity.speed_x;
            entity.facingRight = true;
            isPlayerMoving = true;
        }
    }

    // Move Left
    if (state.input & input_map["left"]) {
        direction = "left";
        if (!collision(state, tiles, i, direction)) {
            diffx -= entity.speed_x;
            entity.facingRight = false;
            isPlayerMoving = true;
        }
    }

    if(diffx != 0 && diffy != 0){
        entity.animation.x += entity.speed_lin * (diffx / Math.abs(diffx));
        entity.animation.y += entity.speed_lin * (diffy / Math.abs(diffy));
    }else{
        entity.animation.x += diffx;
        entity.animation.y += diffy;
    }

    // Animate Player
    if(isPlayerMoving && entity.isMoving == false){
        entity.animation.gotoAndPlay(0);
        entity.isMoving = true;
    }else if(isPlayerMoving == false){
        entity.animation.gotoAndStop(0);
        entity.isMoving = false;
    }
}

// flip sprite to face proper direction
function resolve_rotate_individual(entity){
    // turn sprite if necessary
    if(entity.facingRight != entity.facingRightPrev){
        entity.animation.scaleX = entity.animation.scaleX * -1;
        entity.animation.x -= entity.animation.scaleX * entity.width;
        entity.facingRightPrev = entity.facingRight;
    }
}