/*
 * Tristan Hilbert
 * 3/3/2020
 * Instance Lifetimes
 * 
 */

/*
 * Many instances need attachments and updates during runtime. These need their update
 * funtions called at different times during the game. They cannot be listed statically
 * aka the functions need to be in an array. The instances will be in a list but they should
 * also have a registry of update functions.
 * 
 */


