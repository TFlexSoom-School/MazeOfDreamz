/*
 * Tristan Hilbert
 * 3/2/2020
 * Zombie AI Entrypoint
 * 
 * This module represents all of the automation of behavior amongst the
 * generic enemy. This way any global variable and such can be contained
 * within this module.
 */


function zombie_ai(self_ref, target_ref){
    var x = target_ref.x;
    var y = target_ref.y;
    self_ref.target_movex = x;
    self_ref.target_movey = y;
}