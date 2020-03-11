/*
 * Tristan Hilbert
 * 3/2/2020
 * Zombie AI Entrypoint
 *
 * This module represents all of the automation of behavior amongst the
 * generic enemy. This way any global variable and such can be contained
 * within this module.
 */


function resolve_zombie_ai(state, entity_id){
    const target_id = get_player_id(0); // See player entity : player.js
    const alt_target_id = get_player_id(1);

    if(state[target_id]){
        // Bad... This should just be x
        var x = state[target_id].x;
        var y = state[target_id].y;

        // Might want to use Movable ref instead of point
        state[entity_id].target_movex = x;
        state[entity_id].target_movey = y;
    }
}
