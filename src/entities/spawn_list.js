/*
 * Tristan Hilbert
 * 3/4/2020
 * Spawn List Entity
 *
 */

function new_spawn_list(state, id){
    state[id] = [];
}

function add_spawn_to_list(state, id, x, y){
    if(state[id]){
        state[id].push({
            x: x,
            y: y
        });
    }
}
