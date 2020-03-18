/*
 * Tristan Hilbert & Cory Hayes & Haofeng Tian
 * 3/9/2020
 * 
 * Returns a function for a player movable object
 * 
 */

const player_movable_id = "player_movable"
const player_movable_blocking_id = "player_blocking"

// mapping_number :: input.js input_mapping
// blockable :: Boolean can be blocked by static objects

function register_player_movable(state, id, mapping_number, blockable){
    
    var reg_obj = {
        input_mapping: get_default_player_control_map(mapping_number), // See input.js
        blockable: blockable
    }

    register_entity_system(state, player_movable_id, reg_obj, id);

    state[id].speed_x = Math.floor(state[id].width / 8);
    state[id].speed_y = Math.floor(state[id].height / 8);
    // 1.414214 = SQRT(2)
    state[id].speed_lin = Math.round(state[id].height / (8 * 1.414214));
}

function register_player_movable_blocking(state, id){
    var reg_obj = {}

    register_entity_system(state, player_movable_blocking_id, reg_obj, id);

    // Ugh wish we had a type system.
    if(state[id].width === undefined){
        state[id].width = 0;
    }

    if(state[id].height === undefined){
        state[id].height = 0;
    }

    if(state[id].x === undefined){
        state[id].x = 0;
    }

    if(state[id].y === undefined){
        state[id].y = 0;
    }
}

function resolve_player_movable(state){
    resolve_system(state, player_movable_id, (state, reg_object) => {
        resolve_movement_individual(
            state,
            reg_object.entity,
            reg_object.input_mapping,
            reg_object.blockable
        );
        
        resolve_rotate_individual(
            state[  reg_object.entity  ]
        );
    });

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

/*
* Haofeng Tian
 * 3/9/2020
 * Collision function
 *
 */


function cannot_move(state, entity_id, direction) {
	//defult set that the player is not blocked
	var is_blocked = false;
	//create a detection area for player(x,y=player.x/y,size = player size)
	var area = new createjs.Shape();
	//area.graphics.beginStroke("rgba(255,0,0,0.5)").drawRect(0, 0, state.player1.width, state.player1.height);
    
    const player = state[entity_id];
    
    // Tristan Hilbert
    // I fixed the x and y values of the player so that it will always gesture to the upper left
    // :wink: Hope this helps!
    area.x = player.x;
    area.y = player.y;
	
	//console.log(player);
	//console.log(area.x, area.y, state.player1.animation.x, state.player1.animation.y);

	switch (direction) {
		case "up":
			area.y = area.y - 2;
			break;
		case "down":
			area.y = area.y + 2;
			break;
		case "left":
			area.x = area.x - 2;
			break;
		case "right":
			area.x = area.x + 2;
			break;
	}



	//(x1 + w1) < x2 || (x2 + w2) < x1 || (y1 + h1) < y2 || (y2 + h2) < y1
	//x,y is the position of left up corner of the square. w=width h=height

    const walls = state[player_movable_blocking_id].registry;

    //console.log(walls);

	for (var i = 0; i < walls.length; i++) {
        if ((area.x + 16) < state[walls[i].entity].x ||
            state[walls[i].entity].x + 16 < area.x ||
            (area.y + 16) < state[walls[i].entity].y ||
            state[walls[i].entity].y + 16 < area.y) {
            is_blocked = false;
        }

        else {
            return is_blocked = true;
        }
    }
    
	//console.log(is_blocked);
	return is_blocked;
}