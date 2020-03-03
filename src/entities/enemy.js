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

const enemy_width = 16;
const enemy_height = 16;
const enemy_speed_default = 2;

const enemy_spawn_points = [
    {x: 200, y: 250},
    {x: 300, y: 150},
    {x: 100, y: 280},
    {x: 300, y: 220}
];

function new_hive_mind(state){
    state.enemy = {
        inst_list: [],
        spawn_points: enemy_spawn_points
    }

    return hive_mind_tick
}

function hive_mind_tick(state, stage){
    spawn_with_plist(state, stage, state.enemy, 3, newEnemy);
    for(var i = 0; i < state.enemy.inst_list.length; i ++){
        zombie_ai(state.enemy.inst_list[i], state.player1.animation);
        movable_steady_translation(state.enemy.inst_list[i]);
    }
}

/*
 * newEnemy(state, stage) :: Base Enemy Type
 * This function defines the fields of a basic enemy.
 */
function newEnemy(state, stage){
    // Setup Graphics
    var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, enemy_width, enemy_height);
    var enemy = new createjs.Shape(graphics);
    stage.addChild(enemy);
    
    enemy.target_movex = 0;
    enemy.target_movey = 0;
    enemy.speed = enemy_speed_default;
    return enemy;
}