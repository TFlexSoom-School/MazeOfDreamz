/*
 * Tristan Hilbert
 * 3/14/2020
 * This module is used to kill the entity should it collide with an object
 * 
 */

// A Pass off function for any collision that should result
// in the death of the current sprite.
function resolve_collision_effect_death(state, registry_obj){
    registry_obj.typesEffected.forEach((otherID) => {
        if(state[registry_obj.entity].collidedWith.has(otherID)){
            register_death(state, registry_obj.entity);
        }
    });
}