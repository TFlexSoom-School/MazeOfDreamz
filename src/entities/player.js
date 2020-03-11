/*
 * Tristan and Cory
 * 3/3/2020
 * Player Entity
 * 
 */

// Index should be [0,1]
function get_player_id(index){
    return player_id = "player" + (index + 1);
}

// Attach new players to state
// Return functions for ticking players
function new_num_players(state, count){

    for(var i = 0; i < count; i ++){
        new_player(state, get_player_id(i), i + 1);
    }

}

// state :: game_state, 
// player_id :: string => key, 
// mapping :: int [1,2] => default mapping to use
function new_player(state, player_id, mapping){
    /* CREATE NEW INSTANCE */
    const spriteWidth = 16;
    const spriteHeight = 16;

    var knightImg = new Image(spriteWidth * 6, spriteHeight);  // width, height of resized knight image
    knightImg.src = "assets/images/knight_run_spritesheet.png";

    // knight run spritesheet data
    var knightSheet = {
        images: [knightImg],
        frames: {width: spriteWidth, height: spriteHeight},
        framerate: 15
    };

    // create sprites	
    var knightSprite = new createjs.SpriteSheet(knightSheet);
    var animation = new createjs.Sprite(knightSprite);

    state[player_id] = {
        animation: animation,
        isMoving: false,
        facingRight: true,
        facingRightPrev: true,
        width: spriteWidth,
        height: spriteHeight,
        x: 0,
        y: 0
    }
    

    /* ADD TO RENDER */
    state[render_stage_id].addChild(state[player_id].animation);

    /* Register to Input Feedback */
    // state :: state object, player_id :: key in table, i + 1 :: player_input_mapping
    // player_input_mapping --> See input.js
    register_player_movable(state, player_id, mapping);

    register_player_action(state, player_id, mapping);
}