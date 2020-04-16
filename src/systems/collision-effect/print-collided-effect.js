/*
 * Tristan Hilbert
 * 3/14/2020
 * This module is used to log the collided entities.
 * 
 */

function resolve_collision_effect_print_collided(state, reg_object){
    console.log(reg_object.entity + " collided!");
    console.log(reg_object.collided);
    console.log("===========");
    state[reg_object.entity].collided.clear();
}