/*
 * CS29 DreamzCatcherz
 * 3/2/2020
 * The Entry File for MazeOfDreamz
 * 
 */

function resolve_exit(state){
    if(state.input & input_flag_exit){
        state.exit = true;
    }
}

function main(){
	var state = setup();

	/* SETUP RENDERING */

	// init canvas object
	var render_stage = new createjs.Stage("game_board");

	set_stage(state, render_stage);

	/* SETUP UPDATE */
	var resolve_player_functions = [
		get_move_functions("player1", get_default_player1_control_map()),
		get_move_functions("player2", get_default_player2_control_map())
	];

	var enemy_tick = new_hive_mind(state);

	// handles canvas updates
	function update(event){
		// Tasks or Systems (resolves)
		state.input = resolve_input();
		resolve_player_functions[0].resolve_movement(state);
		resolve_player_functions[1].resolve_movement(state);
		resolve_player_functions[0].resolve_rotate(state);
		resolve_player_functions[1].resolve_rotate(state);

		/* Tick Functions */
		enemy_tick(state, render_stage);

		resolve_exit(state);
		
		// Check Exit Condition
		if(state.exit){
			window.close();
		}
		
		render_stage.update(event);
	}


	/* START GAME */
	createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", update);
}

main();