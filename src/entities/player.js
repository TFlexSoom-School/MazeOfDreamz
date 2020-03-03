/*
 * Tristan and Cory
 * 3/3/2020
 * Player Entity
 * 
 */

function generate_player_id(index){
    return player_id = "player" + (index + 1);
}


function new_num_players(const_state, render_stage, count){

    var resolve_player_move = [];
    var resolve_player_rotate = [];
    var resolve_player_special = [];

    for(var i = 0; i < count; i ++){
        var knightImg = new Image(384, 64);  // width, height of resized knight image
        knightImg.src = "assets/images/knight_run_spritesheet_large.png";
        
        var spriteWidth = 64;
        var spriteHeight = 64;
        
        // knight run spritesheet data
        var knightSheet = {
            images: [knightImg],
            frames: {width: spriteWidth, height: spriteHeight},
            framerate: 15
        };
        
        // create sprites	
        var knightSprite = new createjs.SpriteSheet(knightSheet);
        var animation = new createjs.Sprite(knightSprite);

        const player_id = generate_player_id(i);

        const_state[player_id] = {
			animation: animation,
			isMoving: false,
			facingRight: true,
			facingRightPrev: true,
			width: spriteWidth,
			height: spriteHeight
        }

        render_stage.addChild(const_state[player_id].animation);

        const player_mappings = get_default_player_control_map(i + 1);
        
        resolve_player_move.push(
            get_move_function(const_state, player_id, player_mappings)
        );

        resolve_player_rotate.push(
            get_rotate_function(const_state, player_id)
        );

        // Input mappings for special buttons/action buttons
        var action_mappings = [
            player_mappings["special"]
        ];

        // Functions to be called for actions. Each of these functions will get player_id and state
        var actions = [
            get_attack_action(const_state, player_id)
        ];

        resolve_player_special.push(
            attach_player_actions(action_mappings, actions, player_id)
        );
    }

    const_state.player_count = count;
    

    function update(state, stage){
        for(var i = 0; i < count; i ++){
            resolve_player_move[i](state);
            resolve_player_rotate[i](state);
            resolve_player_special[i](state, stage);
        }
    }

    return update; 
}