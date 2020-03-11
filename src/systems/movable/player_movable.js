/*
 * Tristan Hilbert & Cory Hayes & Haofeng Tian
 * 3/9/2020
 * 
 * Returns a function for a player movable object
 * 
 */

const player_movable_id = "player_movable"
function register_player_movable(state, id, mapping_number){
    
    var reg_obj = {
        input_mapping: get_default_player_control_map(mapping_number) // See input.js
    }

    register_entity_system(state, player_movable_id, reg_obj, id);

    state[id].speed_x = Math.floor(state[id].width / 8);
    state[id].speed_y = Math.floor(state[id].height / 8);
    // 1.414214 = SQRT(2)
    state[id].speed_lin = Math.round(state[id].height / (8 * 1.414214));
}

function resolve_player_movable(state){
    resolve_system(state, player_movable_id, (state, reg_object) => {
        resolve_movement_individual(
            state,
            state[ reg_object.entity  ],
            reg_object.input_mapping
        );
        
        resolve_rotate_individual(
            state[  reg_object.entity  ]
        );
    });

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
        var diffLinX = entity.speed_lin * (diffx / Math.abs(diffx));
        var diffLinY = entity.speed_lin * (diffy / Math.abs(diffy));
        entity.x += diffLinX;
        entity.y += diffLinY;
        entity.animation.x += diffLinX;
        entity.animation.y += diffLinY; 
    }else{
        entity.x += diffx;
        entity.y += diffy;
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
        entity.animation.scaleX *= -1;
        entity.animation.x -= entity.animation.scaleX * entity.width;
        entity.facingRightPrev = entity.facingRight;
    }
}