/*
 * Tristan Hilbert
 * 3/3/2020
 * Entry Function for Movable Systems
 * 
 */

// ID for Movable-System
const movable_id = "movable-system";

// ENUM Movable type for resolution
const movable_type_player = 0;
const movable_type_auto = 1;

// Entry Function for all systems that move objects
function register_movable(state, id, type, arg0, arg1){
    var registry_obj = {
        type: type
    };

    register_entity_system(state, movable_id, registry_obj, id);

    if(state[id].x === undefined){
        state[id].x = 0;
    }

    if(state[id].y === undefined){
        state[id].y = 0;
    }

    switch(type){
        case movable_type_player:
            //player_movable.js
            helper_register_player_movable(state, registry_obj, arg0, arg1);
            break;
        case movable_type_auto:
            //auto_movable.js
            helper_register_auto_movable(state, registry_obj, arg0, arg1);
            break;
        default:
            throw "Unknown Collision Type!";
    }
}


// Resolve all movable entities
function resolve_movable(state){
    resolve_system(state, movable_id, (state, registry_obj) => {
        switch(registry_obj.type){
            case movable_type_player:
                //player_movable.js
                resolve_player_movable(state, registry_obj);
                break;
            case movable_type_auto:
                //auto_movable.js
                resolve_auto_movable(state, registry_obj);
                break;
            default:
                throw "Unknown Collision Type!";
        }
    });
}