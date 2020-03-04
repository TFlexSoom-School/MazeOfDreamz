/*
 * Tristan Hilbert and Cory Hayes
 * 3/3/2020
 * Render System using EasleJS with CreateJS
 * 
 */

const render_stage_id = "stage"

function register_render_to_state(state){
    // init canvas object
    state[render_stage_id] = new createjs.Stage("game_board");
}

function register_render(state, id){
    if(!state[render_stage_id]){
        throw "Cannot add to render stage because none exists!";
    }

    state[render_stage_id].addChild(state[id]);
}

function resolve_render(state){
    if(state[render_stage_id]){
        state[render_stage_id].update(state.event);
    }
}