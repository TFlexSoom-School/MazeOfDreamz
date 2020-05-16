/*
 * Tristan Hilbert
 * 3/2/2020
 * Enemy Main Module
 *
 *
 * This module works to define the enemies in the game it also. Acts as the
 *   hivemind of the enemies. Spawning, AI, and interactions will be held by
 *   this entrypoint. It will then be called within the main update functions
 *
 * It will also register itself to be rendered when needed. It will also register
 *    itself for collisions.
 *
 */

const enemy_width = 8;
const enemy_height = 8;

/*
 * newEnemy(state, stage) :: Base Enemy Type
 * This function defines the fields of a basic enemy.
 */
function new_enemy(state, id){
    // Setup Graphics
    var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, enemy_width, enemy_height);
    var enemy = new createjs.Shape(graphics);

    state[id] = enemy;
    state[id].width = enemy_width;
    state[id].height = enemy_height;

    register_movable(state, id, movable_type_auto, auto_movable_type_translation_point, null);
    register_ai(state, id, ai_type_zombie);
    register_render(state, id);

    return enemy;
}
