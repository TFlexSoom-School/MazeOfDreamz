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

/*
 * Entry Function into MazeOfDreamz
 * This function starts the game.
 * 
 */
function main(){

	// Generates an empty object to attach things to
	var state = new_state();

	/* -- SETUP INPUT -- */
	register_input(state);

	/* -- SETUP MAP -- */

	// Attaches EasleJS Stage to State Object.
	register_render_to_state(state);
	
	// Get a new Background into State (Cheats! Also adds itself to renderer)
	new_background(state);

	/* -- SETUP PLAYERS -- */

	// Attach 2 players to State
	new_num_players(state, 2);

	/* -- SETUP GAME -- */
	setup_game(state); // See generation/game/rules.js

	// For Debugging!
	console.log(state)

	/* SETUP LOOP */
	// handles canvas updates
	function update(event){
		state.event = event
		// Tasks or Systems (resolves)
		resolve_input(state);
        resolve_ai(state);
		resolve_movable(state);
		resolve_player_action(state);
		resolve_spawn(state);
		resolve_lifetime(state);
		resolve_collision(state);
		resolve_collision_effect(state);
		resolve_render(state);
		resolve_death(state);


		// Check Exit Condition
		resolve_exit(state);
		if(state.exit){
			window.close();
		}
	}
	createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", update);
}

// Call Entry Function
main();
