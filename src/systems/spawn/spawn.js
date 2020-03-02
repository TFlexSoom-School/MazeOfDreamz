/*
 * Tristan Hilbert
 * 3/2/2020
 * A Spawning Module.
 * 
 */


function spawn_with_plist(state, stage, spawn_ref, count, new_func){
    const len = spawn_ref.inst_list.length;
    if (len < count){
        spawn_ref.inst_list.push(new_func(state, stage));
        point = spawn_ref.spawn_points[Math.floor(Math.random() * spawn_ref.spawn_points.length)];
        spawn_ref.inst_list[len].x = point.x;
        spawn_ref.inst_list[len].y = point.y;
    }
}