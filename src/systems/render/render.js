/*
 * Tristan Hilbert and Cory Hayes
 * 3/3/2020
 * Render System using EasleJS with CreateJS
 * 
 */

/*
 * This is the one system which can have internal state!
 * This is based on the third party library which has it's own asynchronous
 * container independent of the game's state. It would be better to
 * somehow reference the container within CreateJS
 */

const render_stage_id = "stage"

// Register System to State
function register_render_to_state(state){
    // init canvas object
    state[render_stage_id] = new createjs.Stage("game_board");
}

// Register given entity to renderer state
function register_render(state, id){
    if(state[render_stage_id] === undefined){
        throw "Cannot add to render stage because none exists!";
    }

    state[render_stage_id].addChild(state[id]);
    state[id].rendered = true;
}

// Update renderer
function resolve_render(state){
    if(state[render_stage_id] !== undefined){
        state[render_stage_id].update(state.event);
    }
}

// unregister renderer -- needed because of the internal state.
function unregister_render(state, id){
    if(state[render_stage_id] !== undefined){
        state[render_stage_id].removeChild(state[id]);
        state[id].rendered = false;
    }
}

// Getter for if the given object is rendered -- needed because of the internal state
function is_rendered(state, id){
    if(state[render_stage_id] !== undefined){
        if(state[id] !== undefined){
            return state[id].rendered;
        }
    }
}