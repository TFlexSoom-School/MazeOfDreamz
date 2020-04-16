/*
 * Tristan Hilbert
 * 3/14/2020
 * This module is used to kill the entity should it collide with an object
 * 
 */

function resolve_collision_effect_death(state, reg_object){
    reg_object.typesEffected.forEach((otherID) => {
        if(state[reg_object.entity].collidedWith.has(otherID)){
            register_death(state, reg_object.entity);
        }
    });
}