/*
 * Tristan Hilbert
 * 3/3/2020
 * Systems utilities!
 * 
 */


/*
 * REMEMBER!
 * Systems should hold no state!
 * The registries should be the only exception to this rule!
 * 
 */


function system_throw_on_invalid_id(state, id){
    if(!state[id]){
        console.log(state);
        throw new Error("Cannot find the id: " + id + " in State!");
    }
}