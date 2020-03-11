/*
 * Tristan Hilbert
 * 3/3/2020
 * Entry Function for Movable Systems
 * 
 */

/* TODO use types field in registry rather than propagating to independent systems. */

function resolve_movable(state){
    resolve_player_movable(state);
    resolve_auto_movable(state);
}