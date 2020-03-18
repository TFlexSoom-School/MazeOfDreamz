/*
 * Tristan Hilbert
 * 3/14/2020
 * Collision Effect and resolution.
 * 
 */

/*
 * While collision.js decides if two entities collide, the collision
 * effect will check for the set of collided effects then make a decision.
 * 
 * There are many submodules within this directory that can be registered
 * to alongside this main module. This effect module will also clear the sets
 * as it should every frame.
 * 
 * Make sure to register to collision.js before registering to this module!
 * 
 */


const collision_effect_id = "collision-effect-system"

// Submodules :: collision-submodule(reg_object)

function register_systemname(state, id){
    var reg_obj = {}

    register_entity_system(state, collision_effect_id, reg_obj, id);

    state[id].effected = true;
}

function resolve_systemname(state){
    resolve_system(state, collision_effect_id, (state, reg_object) => {
        
	});  
}

