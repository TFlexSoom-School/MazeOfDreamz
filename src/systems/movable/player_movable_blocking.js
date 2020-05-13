/*
 * Tristan Hilbert
 * 5/13/2020
 * Player Movable Blocking System
 * 
 * This marks all static objects that block the player
 * 
 * Kudos to Haofeng who made the collision for static objects different
 * than collision effect. It is now dependent on the movement system. Thus
 * we now have this system.
 */


// System ID for player_movable_blocking system
const player_movable_blocking_id = "player_blocking"

function register_player_movable_blocking(state, id){
    var registry_obj = {}

    register_entity_system(state, player_movable_blocking_id, registry_obj, id);

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

    // Array of all the wall registry_objs
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