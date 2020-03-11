/*
 * Tristan Hilbert
 * 3/4/2020
 * Rules Setup module
 *
 */

/*
 * This module takes care of generating pieces of the game. This could
 * include spawn points, puzzles, enemy types, patterns, etc.
 *
 * Here I will be setting up the enemies to periodically spawn on a set
 * of spawn spawn_points
 *
 */

function setup_game(state){
    var enemy_spawn_list_id = "enemy-spawners";
    new_spawn_list(state, enemy_spawn_list_id);

    state["enemy-spawners"] = [
        {x: 200, y: 250},
        {x: 300, y: 150},
        {x: 100, y: 280},
        {x: 300, y: 220}
    ];

    var tag = "";
    for(var i = 0; i < 3; i ++){
        tag = "enemy-" + i;
        new_enemy(state, tag);
        state[tag].speed_x = 1;
        state[tag].speed_y = 1;
        state[tag].speed_lin = 1;
        register_spawn(state, tag, spawn_type_periodic, enemy_spawn_list_id);
        state[tag].timer = 0;
    }
}
