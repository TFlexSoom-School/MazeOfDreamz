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

const death_id = "death-system"

function register_death(state, id){
    var reg_obj = {};
    register_entity_system(state, death_id, reg_obj, id);

    state[id].isDead = true; // to cheat death... set to false!
}


function resolve_death(state){
    resolve_system(state, lifetime_id, (state, reg_object) => {
        const entity_id = reg_object.entity;
        if(state[entity_id].isDead){
            if(is_rendered(state, entity_id)){
                unregister_render(state, entity_id);
            }
            delete state[entity_id];
        }
    });
}