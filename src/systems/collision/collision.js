/*
 * Tristan Hilbert
 * 3/11/2020
 * Collision System
 * 
 */

const collision_id = "collision-system"

function register_collision(state, id){
    var reg_obj = {}

    register_entity_system(state, collision_id, reg_obj, id);

    state[id].collidedWith = new Set();

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

    // If Collision type requires more setup then put that here
    // i.e. the type needs an explicit collision rectangle. or other shape
}

function resolve_collision(state){
    // List for subfunction to lookup previously read collision rectangles.
    var lookupTable = [];

     // Ah Yes... N^3 Complexity
    resolve_system(state, collision_id, (state, reg_object) => {
        resolve_collision_individual(state, reg_object.entity, lookupTable);
	});  
}

/*
 * Tristan Hilbert
 * 3/11/2020
 * Collision Algorithm for Collision System
 * 
 */

/*
 * Collided objects will be stored in a global lookup table. This will
 * be used to tell if a previously used object has collided with the current
 * object. This uses a simple 2D collision rectangle with CreateJS's intersect
 * function. This will be dope!
 * 
 */

function resolve_collision_individual(state, entity_id, lookup){
    if(lookup === undefined || lookup === null){
        throw "Invalid Lookup Table!";
    }

    var rect = new createjs.Rectangle(
        state[entity_id].x, 
        state[entity_id].y,
        state[entity_id].width,
        state[entity_id].height
    )

    for(var i = 0; i < lookup.length; i ++){
        if(rect.intersects(lookup[i].rect) === true){
            state[entity_id].collidedWith.add(lookup[i].id);
            state[lookup[i].id].collidedWith.add(entity_id);
        }
    }

    lookup.push({
        id: entity_id,
        rect: rect
    })
}
 