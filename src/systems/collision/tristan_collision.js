/*
 * Tristan Hilbert
 * 3/11/2020
 * Collision Algorithm for Collision System
 * 
 */

/*
 * Collided objects will be stored in a global lookup table. This will
 * be used to tell if a previously used object has collided with the current
 * object. This uses a simple 2D collision rectangle with CreateJS's intersect
 * function. This will be dope!
 * 
 */

function resolve_collision_tristan(state, entity_id, lookup){
    if(lookup === undefined || lookup === null){
        throw "Invalid Lookup Table!";
    }

    var rect = new createjs.Rectangle(
        state[entity_id].x, 
        state[entity_id].y,
        state[entity_id].width,
        state[entity_id].height
    )

    for(var i = 0; i < lookup.length; i ++){
        if(rect.intersects(lookup[i].rect) === true){
            state[entity_id].collidedWith.add(lookup[i].id);
            state[lookup[i].id].collidedWith.add(entity_id);
        }
    }

    lookup.push({
        id: entity_id,
        rect: rect
    })
}