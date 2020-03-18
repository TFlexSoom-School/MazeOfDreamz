/*
 * Tristan Hilbert
 * 3/3/2020
 * Instance Lifetimes
 * 
 */

/*
 * Many instances need attachments and updates during runtime. These need their update
 * funtions called at different times during the game. They cannot be listed statically
 * aka the functions need to be in an array. The instances will be in a list but they should
 * also have a registry of update functions.
 * 
 */

const lifetime_id = "lifetime-system"

function register_lifetime(state, id, frames){
    var reg_obj = {};

    register_entity_system(state, lifetime_id, reg_obj, id);

    state[id].ttl = frames;
}


function resolve_lifetime(state){
    resolve_system(state, lifetime_id, (state, reg_object) => {
        const entity_id = reg_object.entity;

        if(countdown_lifetime(state, entity_id) === true){
            register_death(state, entity_id);
        }

    });
}

function countdown_lifetime(state, entity_id){
    state[entity_id].ttl -= 1;

    console.log(state[entity_id].ttl);
    
    if(state[entity_id].ttl <= 0){
        return true;
    }

    return false;
}