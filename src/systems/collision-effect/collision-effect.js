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

// ID for Collision-System
const collision_effect_id = "collision-effect-system"

// ENUM Collision Effect type for resolution
const CE_type_print_collided = 0;
const CE_type_death = 1;
// TODO
const CE_type_stat_change = 2;
const CE_type_register_system = 3;

// Register a given entity to have a collision effect
// This will also register the entity to have collision
// if that is not already done.
// type :: Type of collision
// [arg] :: a value dependent on type of collision
function register_collision_effect(state, id, type, args){
    if(state[id].collidedWith === undefined){
        register_collision(state, id);
    }

    var registry_obj = {
        type: type
    }

    register_entity_system(state, collision_effect_id, registry_obj, id);

    state[id].effected = true;

    switch(registry_obj.type){
        case (CE_type_print_collided):
            break;
        case (CE_type_death):
            // Arg should be a set!
            registry_obj.typesEffected = args;
            break;
        default:
            throw "Unknown Collision Type!";
    }
}

// Resolve all entities with collision effect
function resolve_collision_effect(state){
    resolve_system(state, collision_effect_id, (state, registry_obj) => {
        //const entity_id = reg_object.entity;
        switch(registry_obj.type){
            case (CE_type_print_collided):
                resolve_collision_effect_print_collided(state, registry_obj);
                break;
            case (CE_type_death):
                resolve_collision_effect_death(state, registry_obj);
                break;
            default:
                throw "Unknown Collision Type!";
        }
	});  
}

