/*
 * Tristan Hilbert
 * 3/3/2020
 * Systems utilities!
 * 
 */


/*
 * REMEMBER!
 * Systems should hold no state!
 * The registries should be the only exception to this rule!
 * 
 */


function system_throw_on_invalid_id(state, id){
    if(state[id] === undefined){
        console.log(state);
        throw new Error("Cannot find the id: " + id + " in State!");
    }
}

/*
 * Boolean :: resolve_registry(...)
 * state :: GameState
 * entity_id :: Possible GameState Index
 * registry :: List
 * 
 * Removes entity from registry and returns false if entity does not exist in
 * state. Returns true if state contains entity.
 * 
 */

function resolve_registry(state, entity_id, registry, index){
    if(state[entity_id] === undefined){
        registry.splice(index, 1);
        return false;
    }
    
    return true;
}


/*
 * void :: resolve_system(...)
 * state :: GameState
 * id :: GameState index of system
 * apply :: function(state, reg_object) => A Function to manipulate state based on the entity
 * 
 * A generic function for systems to act upon the state safely with entities. This should be
 * used by most systems. This way code is not copied and instances are accurately handled.
 */

function resolve_system(state, id, apply){
    if(state[id] !== undefined){
        for(var i = 0; i < state[id].registry.length; i ++){
            if(resolve_registry(state, state[id].registry[i].entity, state[id].registry, i)){
                apply(state, state[id].registry[i]);
            }
        }
    }
}

/* Example implementation of the above closure/lambda function */
/*

resolve_system(state, system_id, (state, reg_object) => {

});

*/


/*
 * void :: register_entity_system(...)
 * state :: GameState
 * id :: GameState index of system
 * reg_obj :: register object to copy/push to registry 
 * 
 * POST: It is guaranteed state[id] will be instantiated after this call ;)
 * 
 * A generic function to make sure every system handling entities will have an entity field.
 * This will make sure that code is not copied and that entity lifetimes are handled correctly
 * 
 */

 function register_entity_system(state, id, registry_obj, entity_id){
     if(state[id] === undefined){
         state[id] = {
             registry: []
         }
     }

     registry_obj.entity = entity_id;
     state[id].registry.push(registry_obj);
 }