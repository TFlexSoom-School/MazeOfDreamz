/*
 * Tristan Hilbert
 * 3/2/2020
 * A Spawning Module.
 *
 */


// ID for Spawning System
const spawning_id = "spawning-system"

// ENUM for Spawning Types within Spawning System
const spawn_type_periodic = 0;

// Register a given entity to be a spawning entity
// Currently this is used for respawning entities.
// -- This could be used for anything though, including the player.
// list_id :: id of a list/array within state that can be referenced for x/y
//      coordinate points. Something like typeof state[list_id] === [{x:0, y:0}]
function register_spawn(state, id, type, list_id){
    if(state[list_id]){

        var reg_obj = {
            type: type,
            spawn_list: list_id
        };

        register_entity_system(state, spawning_id, reg_obj, id);

        state[id].isAlive = false;

        switch(type){
            case spawn_type_periodic:
            default:
                setup_spawn_type_periodic(state, id);
        }
    }else{
        throw new Error(
            "The spawn point list: " + list_id + " does not exist!"
        );
    }

}

// Helper Function for Spawning Registry adding
function setup_spawn_type_periodic(state, id){
    const period_default = 120;
    state[id].timer = period_default;
    state[id].timer_start = period_default;
}


// Resolve all of the Spawn Entities
function resolve_spawn(state){
    resolve_system(state, spawning_id, (state, registry_obj) => {
        const entity_id = registry_obj.entity;
        const list_id = registry_obj.spawn_list;
        switch(registry_obj.type){
            case spawn_type_periodic:
            default:
                resolve_spawn_periodic(state, entity_id, list_id);
        }
    });
}

// Helper Function for gathering a random spawnpoint
function get_random_spawn(state, list_id){
    if(state[list_id]){
        var len = state[list_id].length;
        var rand_index = Math.floor(Math.random() * len);
        return state[list_id][rand_index];
    }else{
        console.warn("Could not find "+ list_id + " in state!");
        return {
            x: 0,
            y: 0
        };
    }
}

// Helper Function for Periodic spawning alongside the spawn system.
function resolve_spawn_periodic(state, entity_id, list_id){
    if(state[entity_id].isAlive === false){
        if(state[entity_id].timer <= 0){
            state[entity_id].timer = state[entity_id].timer_start;
            state[entity_id].isAlive = true;

            var point = get_random_spawn(state, list_id);
            //console.log(point);
            state[entity_id].x = point.x;
            state[entity_id].y = point.y;

            //console.log(state);
        }else{
            state[entity_id].timer --;
        }
    }
}
