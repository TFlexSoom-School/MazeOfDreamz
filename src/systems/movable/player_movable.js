/*
 * Tristan Hilbert & Cory Hayes & Haofeng Tian
 * 3/9/2020
 * 
 * Returns a function for a player movable object
 * 
 */

// Helper Function for movable. Registers given movable entity to player_movable
// mapping_number :: input.js input_mapping
// blockable :: Boolean can be blocked by static objects
function helper_register_player_movable(state, registry_obj, mapping_number, blockable){

    registry_obj.input_mapping = get_default_player_control_map(mapping_number); // See input.js
    registry_obj.blockable = blockable;

    const id = registry_obj.entity;
    // make the entity have speeds!
    state[id].speed_x = Math.floor(state[id].width / 8);
    state[id].speed_y = Math.floor(state[id].height / 8);

    // 1.414214 = SQRT(2)
    state[id].speed_lin = Math.round(state[id].height / (8 * 1.414214));
}

function resolve_player_movable(state, registry_obj){
    resolve_movement_individual(
        state,
        registry_obj.entity,
        registry_obj.input_mapping,
        registry_obj.blockable
    );
    
    resolve_rotate_individual(
        state[  registry_obj.entity  ]
    );
}


function resolve_movement_individual(state, entity_id, input_map, blockable){
    // Player moves
    var isPlayerMoving = false;
    var diffx = 0;
    var diffy = 0;
    // Move Up
    if (state.input & input_map["up"]) {
        if(blockable === false  || cannot_move(state, entity_id, "up") === false){
            diffy -= state[entity_id].speed_y;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
        }
    }

    // Move Down
    if (state.input & input_map["down"]) {
        if(blockable === false || cannot_move(state, entity_id, "down") === false){
            diffy += state[entity_id].speed_y;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
        }
    }

    // Move Right
    if(state.input & input_map["right"]){
        if(blockable === false || cannot_move(state, entity_id, "right") === false){
            diffx += state[entity_id].speed_x;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
            state[entity_id].facingRight = true;
        }
    }

    // Move Left
    if (state.input & input_map["left"]) {
        if(blockable === false || cannot_move(state, entity_id, "left") === false){
            diffx -= state[entity_id].speed_x;
            isPlayerMoving = true;
            isPlayerMovingHoriz = true;
            state[entity_id].facingRight = false;
        }
    }

    if(diffx != 0 && diffy != 0){
        var diffLinX = state[entity_id].speed_lin * (diffx / Math.abs(diffx));
        var diffLinY = state[entity_id].speed_lin * (diffy / Math.abs(diffy));
        state[entity_id].x += diffLinX;
        state[entity_id].y += diffLinY;
        state[entity_id].animation.x += diffLinX;
        state[entity_id].animation.y += diffLinY; 
    }else{
        state[entity_id].x += diffx;
        state[entity_id].y += diffy;
        state[entity_id].animation.x += diffx;
        state[entity_id].animation.y += diffy; 
    }

    // Animate Player
    if(isPlayerMoving && state[entity_id].isMoving == false){
        state[entity_id].animation.gotoAndPlay(0);
        state[entity_id].isMoving = true;
    }else if(isPlayerMoving == false){
        state[entity_id].animation.gotoAndStop(0);
        state[entity_id].isMoving = false;
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