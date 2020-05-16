/*
 * Tristan Hilbert
 * 3/4/2020
 * AI Entry system
 *
 */

// ID for AI-system
const ai_id = "ai-system";

// ENUM Ai type for resolution
const ai_type_zombie = 0;


// Register a given entity to become an AI
function register_ai(state, id, type){
    var registry_obj = {
        type: type
    };

    register_entity_system(state, ai_id, registry_obj, id);
}

// Resolve all AI Entities
function resolve_ai(state){
    resolve_system(state, ai_id, (state, registry_obj) => {
        const entity_id = registry_obj.entity;
        switch(registry_obj.type){
            case ai_type_zombie:
            default:
                resolve_zombie_ai(state, entity_id);
        }
    });
}
