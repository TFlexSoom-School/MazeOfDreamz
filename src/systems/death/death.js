/*
 * Tristan Hilbert
 * 3/3/2020
 * Death System
 * 
 * Works in tandem with lifetimes. 
 * This system will take care of removal of an entity from the game state. Technically, system can occur in
 * any order with very little problem, but this system should preferrably be done last. This will ensure
 * garbage collection among other needs.
 * 
 */

// ID for Death-System
const death_id = "death-system"

// Register an entity to be removed from state
// Note this is near instantaneaous
// attachment to this function results in either removal
// in this frame or the next
// (You can also cheat death... just in case!)
function register_death(state, id){
    var registry_obj = {};
    register_entity_system(state, death_id, registry_obj, id);

    state[id].isDead = true; // to cheat death... set to false!
}

// Resolve all entities to be removed
function resolve_death(state){
    resolve_system(state, lifetime_id, (state, registry_obj) => {
        const entity_id = registry_obj.entity;
        if(state[entity_id].isDead){
            if(is_rendered(state, entity_id)){
                unregister_render(state, entity_id);
            }
            delete state[entity_id];
        }
    });
}