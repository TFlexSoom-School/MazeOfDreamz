/*
 * CS29 DreamzCatcherz
 * 3/2/2020
 * Render Entry System
 * 
 */


function set_stage(state, render_stage){
    console.log(render_stage);
    var tiles = gen_map((render_stage.canvas.width / tile_dim), (render_stage.canvas.height / tile_dim));
    draw_map(render_stage, tiles)
    render_stage.addChild(state.player1.animation);
	render_stage.addChild(state.player2.animation);
}