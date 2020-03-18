/*
 * Tristan Hilbert and Cory Hayes
 * 3/3/2020
 * Render System using EasleJS with CreateJS
 * 
 */

/*
 * This is the one system which can have state!
 */

const render_stage_id = "stage"

function register_render_to_state(state){
    // init canvas object
    state[render_stage_id] = new createjs.Stage("game_board");
}

function register_render(state, id){
    if(state[render_stage_id] === undefined){
        throw "Cannot add to render stage because none exists!";
    }

    state[render_stage_id].addChild(state[id]);
    state[id].rendered = true;
}

function resolve_render(state){
    if(state[render_stage_id] !== undefined){
        state[render_stage_id].update(state.event);
    }
}

function unregister_render(state, id){
    if(state[render_stage_id] !== undefined){
        state[render_stage_id].removeChild(state[id]);
        state[id].rendered = false;
    }
}

function is_rendered(state, id){
    if(state[render_stage_id] !== undefined){
        if(state[id] !== undefined){
            return state[id].rendered;
        }
    }
}