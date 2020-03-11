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

const lifetime_id = "lifetime_system"

function attach_instance_to_lifetime(state, id){
    var reg_obj = {};

    register_entity_system(state, lifetime_id, reg_obj, id);

    state[id].ttl = 0;
}


function resolve_lifetime(state){
    resolve_system(state, lifetime_id, (state, reg_object) => {
        const entity_id 
    });
}