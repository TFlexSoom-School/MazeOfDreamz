/*
 * Tristan Hilbert
 * 3/3/2020
 * A Callback handler for the user pressing action keys!
 * 
 */


const player_action_id = "player-action";

function register_player_action(state, id, mapping_number){
    var reg_obj = { 
        input_mapping: get_default_player_control_map(mapping_number) // See input.js
    };

    register_entity_system(state, player_action_id, reg_obj, id);

    state[id].isUsingAbility = false;
}

function resolve_player_action(state){
    resolve_system(state, player_action_id, (state, reg_object) => {
        resolve_player_action_individual(
            state,
            reg_object.input_mapping,
            reg_object.entity
        );
    });
}

function resolve_player_action_individual(state, mapping, entity_id){
    if(state.input & mapping["special"]){
        if(state[entity_id].isUsingAbility === false){
            state[entity_id].isUsingAbility = true;
            player_action_slime_attack(state, entity_id);
        }
    }

    if(state[entity_id].isUsingAbility === true){
        player_action_cleanup(state, entity_id);
    }
}

// id for state hashtable
const attack_id_suffix = "-attack";
const slime_attack_frames = 20;

function player_action_slime_attack(state, entity_id){
    const temp_id = entity_id + attack_id_suffix
    if(state[temp_id] === undefined){
        console.log("Power!");
        new_slime_attack(state, temp_id);
        state[temp_id].gotoAndPlay(0);

        
        register_auto_movable(state, temp_id, auto_movable_type_teleportation_ref_with_offset, entity_id);

        // Get Offset!
        var offset_x = -1 * (state[temp_id].width / 2) + (state[entity_id].width / 2);
        var offset_y = -1 * (state[temp_id].height / 2) + (state[entity_id].height / 2);

        auto_movable_set_target_ref(state[temp_id], entity_id, temp_id);
        auto_movable_set_move_offset(state[temp_id], offset_x, offset_y);
        
        // Set Lifetime
        register_lifetime(state, temp_id, slime_attack_frames);

        // Set Collision
        register_collision(state, temp_id);
    }
}

function player_action_cleanup(state, entity_id){
    const temp_id = entity_id + attack_id_suffix
    if(state[temp_id] === undefined){
        state[entity_id].isUsingAbility = false;
    }
}