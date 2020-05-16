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

// ID for Lifetime System
const lifetime_id = "lifetime-system"

// Register a given entity to be given a lifetime
// This is good for particle effects or animations
function register_lifetime(state, id, frames){
    var registry_obj = {};

    register_entity_system(state, lifetime_id, registry_obj, id);

    // ttl -> Time To Live
    state[id].ttl = frames;
}

// Resolve all Lifetime Entities
function resolve_lifetime(state){
    resolve_system(state, lifetime_id, (state, registry_obj) => {
        const entity_id = registry_obj.entity;

        if(countdown_lifetime(state, entity_id) === true){
            register_death(state, entity_id);
        }

    });
}

// Decrement the time to live and check if the entity should
// still live.
function countdown_lifetime(state, entity_id){
    state[entity_id].ttl -= 1;
    
    if(state[entity_id].ttl <= 0){
        return true;
    }

    return false;
}