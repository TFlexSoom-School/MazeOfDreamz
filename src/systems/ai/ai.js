/*
 * Tristan Hilbert
 * 3/4/2020
 * AI Entry system
 *
 */

const ai_id = "ai-system";

// ENUM Ai type for resolution
const ai_type_zombie = 0;

function register_ai(state, id, type){
    if(!state[ai_id]){
        state[ai_id] = {
            registry: []
        }
    }

    state[ai_id].registry.push({
        entity: id,
        type: type
    });
}


function resolve_ai(state){
    if(state[ai_id]){
        for(var i = 0; i < state[ai_id].registry.length; i ++){
            const entity_id = state[ai_id].registry[i].entity;
            switch(state[ai_id].registry[i].type){
                case ai_type_zombie:
                default:
                    resolve_zombie_ai(state, entity_id);
            }
        }
    }
}
