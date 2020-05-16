/*
 * Tristan Hilbert
 * 3/14/2020
 * This module is used to log the collided entities.
 * 
 */

// A Pass Off Function for debugging
// This will log any component with a collision-effect 
// of type print
function resolve_collision_effect_print_collided(state, registry_obj){
    if(state[registry_obj.entity].collidedWith.size > 0){
        console.log(registry_obj.entity + " collided!");
        console.log(state[registry_obj.entity].collidedWith);
        console.log("===========");
        state[registry_obj.entity].collidedWith.clear();
    }
}