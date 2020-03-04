/*
 * Tristan Hilbert
 * 3/2/2020
 * A Spawning Module.
 *
 */


const spawning_id = "spawning-system"

const spawn_type_periodic = 0;

function register_spawn(state, id, type, list_id){
    if(!state[spawning_id]){
        state[spawning_id] = {
            registry: []
        }
    }

    if(state[list_id]){

        state[spawning_id].registry.push({
            entity: id,
            type: type,
            spawn_list: list_id
        });

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

function setup_spawn_type_periodic(state, id){
    const period_default = 120;
    state[id].timer = period_default;
    state[id].timer_start = period_default;
}

function resolve_spawn(state){
    if(state[spawning_id]){
        for(var i = 0; i < state[spawning_id].registry.length; i ++){
            const entity_id = state[spawning_id].registry[i].entity;
            const list_id = state[spawning_id].registry[i].spawn_list;
            switch(state[spawning_id].registry[i].type){
                case spawn_type_periodic:
                default:
                    resolve_spawn_periodic(state, entity_id, list_id);
            }
        }
    }
}

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

function resolve_spawn_periodic(state, entity_id, list_id){
    if(state[entity_id].isAlive === false){
        if(state[entity_id].timer <= 0){
            state[entity_id].timer = state[entity_id].timer_start;
            state[entity_id].isAlive = true;

            var point = get_random_spawn(state, list_id);
            console.log(point);
            state[entity_id].x = point.x;
            state[entity_id].y = point.y;

            console.log(state);
        }else{
            state[entity_id].timer --;
        }
    }
}
