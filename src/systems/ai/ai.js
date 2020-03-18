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
    var reg_obj = {
        type: type
    };

    register_entity_system(state, ai_id, reg_obj, id);
}


function resolve_ai(state){
    resolve_system(state, ai_id, (state, reg_object) => {
        const entity_id = reg_object.entity;
        switch(reg_object.type){
            case ai_type_zombie:
            default:
                resolve_zombie_ai(state, entity_id);
        }
    });
}
