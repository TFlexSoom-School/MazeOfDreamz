/*
 * Tristan Hilbert
 * 3/2/2020
 * Systems for automated movement systems/functions
 *
 */


const auto_movable_id = "auto_movable"

// ENUM for movable types and function
const auto_movable_type_translation_point = 0;
const auto_movable_type_teleportation_point = 1;
const auto_movable_type_translation_ref = 2;
const auto_movable_type_teleportation_ref = 3;
const auto_movable_type_teleportation_point_with_offset = 4;
const auto_movable_type_teleportation_ref_with_offset = 5;

/* --------------- REGISTRY ------------------- */

// state :: state_obj, type :: int => Type of auto_movement
function register_auto_movable(state, id, type, ref_id){
    var reg_obj = {
        type: type
    };

    register_entity_system(state, auto_movable_id, reg_obj, id);

    state[id].x = 0;
    state[id].y = 0;

    // Setup fields for Entity based on type!
    switch(type){
        case auto_movable_type_translation_ref:
            movable_translation_ref_setup(state, id, ref_id);
            break;
        case auto_movable_type_teleportation_ref:
            movable_teleportation_ref_setup(state, id, ref_id);
            break;
        case auto_movable_type_translation_point:
            movable_translation_point_setup(state, id);
            break;
        case auto_movable_type_teleportation_point_with_offset:
            movable_teleportation_point_with_offset_setup(state, id);
            break;
        case auto_movable_type_teleportation_ref_with_offset:
            movable_teleportation_ref_with_offset_setup(state, id, ref_id);
            break;
        case auto_movable_type_teleportation_point:
        default:
            movable_teleportation_point_setup(state, id);
    }
}

/* --- REGISTRY: state setup functions */

function movable_translation_point_setup(state, id){
    state[id].speed_x = Math.floor(state[id].width / 8);
    state[id].speed_y = Math.floor(state[id].height / 8);
    // 1.414214 = SQRT(2)
    state[id].speed_lin = Math.round(state[id].height / (8 * 1.414214));
    state[id].target_movex = 0;
    state[id].target_movey = 0;
}

function movable_teleportation_point_setup(state, id){
    state[id].target_movex = 0;
    state[id].target_movey = 0;
}

function movable_translation_ref_setup(state, id, ref_id){
    system_throw_on_invalid_id(state, ref_id);
    state[id].speed_x = Math.floor(state[id].width / 8);
    state[id].speed_y = Math.floor(state[id].height / 8);
    // 1.414214 = SQRT(2)
    state[id].speed_lin = Math.round(state[id].height / (8 * 1.414214));
    state[id].target_move_ref = ref_id;
}

function movable_teleportation_ref_setup(state, id, ref_id){
    system_throw_on_invalid_id(state, ref_id);
    state[id].target_move_ref = ref_id;
}

function movable_teleportation_point_with_offset_setup(state, id, ref_id){
    state[id].target_movex = 0;
    state[id].target_movey = 0;
    state[id].target_move_offsetx = 0;
    state[id].target_move_offsety = 0;
}

function movable_teleportation_ref_with_offset_setup(state, id, ref_id){
    system_throw_on_invalid_id(state, ref_id);
    state[id].target_move_ref = ref_id;
    state[id].target_move_offsetx = 0;
    state[id].target_move_offsety = 0;
}


function register_auto_movable_target(state, id){
    if(!state[id].x){
        state[id].x = 0;
    }

    if(!state[id].y){
        state[id].y = 0;
    }
}


/* --------------- Entry Point ------------------- */

function resolve_auto_movable(state){
    resolve_system(state, auto_movable_id, (state, reg_object) => {
        switch(reg_object.type){
            case auto_movable_type_translation_ref:
                movable_resolve_translation_ref(
                    state,
                    state[reg_object.entity]
                );
                break;
            case auto_movable_type_teleportation_ref:
                movable_resolve_teleportation_ref(
                    state,
                    state[reg_object.entity],
                    false
                );
                break;
            case auto_movable_type_translation_point:
                movable_resolve_translation_point(
                    state[reg_object.entity]
                );
                break;
            case auto_movable_type_teleportation_point_with_offset:
                movable_resolve_telportation_point(
                    state[reg_object.entity],
                    true
                );
                break;
            case auto_movable_type_teleportation_ref_with_offset:
                movable_resolve_teleportation_ref(
                    state,
                    state[reg_object.entity],
                    true
                );
                break;
            case auto_movable_type_teleportation_point:
            default:
                movable_resolve_teleportation_point(
                    state[reg_object.entity],
                    false
                );
            }
    });
}

/* ----- DEFINITIONS ----- */

function movable_resolve_translation_point(ref){
    var diffx = ref.target_movex - ref.x;
    var diffy = ref.target_movey - ref.y;
    var hyp = Math.sqrt(diffx * diffx + diffy * diffy);

    if(hyp > ref.speed_lin){
        var scaler = 0;
        scaler = hyp / ref.speed_lin;
        diffx = Math.round(diffx / scaler);
        diffy = Math.round(diffy / scaler);
    }

    ref.x += diffx;
    ref.y += diffy;
}

function movable_resolve_translation_ref(state, ref){
    const target = state[ref.target_move_ref]
    if(target){
        // Maybe consider switching these to utility getters
        // This way things like player1.animate.x do not trip up call
        var diffx = target.x - ref.x;
        var diffy = target.y - ref.y;
        var hyp = Math.sqrt(diffx * diffx + diffy * diffy);

        if(hyp > ref.speed_lin){
            var scaler = 0;
            scaler = hyp / ref.speed_lin;
            diffx = Math.round(diffx / scaler);
            diffy = Math.round(diffy / scaler);
        }

        ref.x += diffx;
        ref.y += diffy;
    }
}

function movable_resolve_teleportation_ref(state, ref, isOffset){
    const target = state[ref.target_move_ref]
    if(target){
        ref.x = target.x;
        ref.y = target.y;

        if(isOffset){
            ref.x += ref.target_move_offsetx;
            ref.y += ref.target_move_offsety;
        }
    }
}

function movable_resolve_teleportation_point(state, ref, isOffset){
    ref.x = ref.target_movex;
    ref.y = ref.target_movey;

    if(isOffset){
        ref.x += ref.target_move_offsetx;
        ref.y += ref.target_move_offsety;
    }
}

function auto_movable_set_move_offset(entity, x, y){
    if(entity["target_move_offsetx"] !== undefined){
        entity.target_move_offsetx = x;
    }

    if(entity["target_move_offsety"] !== undefined){
        entity.target_move_offsety = y;
    }
}

function  auto_movable_set_target_ref(entity, target_id){
    if(entity["target_move_ref"] !== undefined){
        entity.target_move_ref = target_id;
    }
}
