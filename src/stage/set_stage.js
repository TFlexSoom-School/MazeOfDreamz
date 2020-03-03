/*
 * CS29 DreamzCatcherz
 * 3/2/2020
 * Render Entry System
 * 
 */


function set_stage(state, render_stage){
    var tiles = gen_map((render_stage.canvas.width / tile_dim), (render_stage.canvas.height / tile_dim));
    draw_map(render_stage, tiles)
}