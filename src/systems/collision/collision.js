/*
 * Tristan Hilbert
 * 3/11/2020
 * Collision System
 * 
 */

const collision_id = "collision-system"
const collision_type_tristan = 0;
const collision_type_haofeng = 1;

function register_collision(state, id){
    var reg_obj = {
        type: collision_type_tristan
    }

    register_entity_system(state, collision_id, reg_obj, id);

    state[id].collidedWith = Set();

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

     // Ah Yes... N^2 Complexity
    resolve_system(state, collision_id, (state, reg_object) => {
        switch(reg_obj.type){
            case collision_type_haofeng:
                // Put In collision interface here!
                break;
            case collision_type_tristan:
            default:
                resolve_collision_tristan(state, reg_object.entity, lookupTable);
        }
	});  
}
 