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

	// Get 2 Player Objects
	var player_tick = new_num_players(state, render_stage, 2);

	// Get Enemy Spawner/Hive Mind
	var enemy_tick = new_hive_mind(state);

	console.log(state)

	// handles canvas updates
	function update(event){
		// Tasks or Systems (resolves)
		state.input = resolve_input();

		/* Tick Functions */
		player_tick(state, render_stage);
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