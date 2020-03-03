/*
 * Tristan Hilbert
 * 3/3/2020
 * A Callback handler for the user pressing action keys!
 * 
 */


const attack_asset_dir = "assets/images/AttackEffect.png";


function attach_player_actions(action_lst, callback_lst, player_name){
    if(action_lst.length != callback_lst.length){
        console.error(
            "An action list was given to attach_player_actions," +
            " but callback list was not the same size."
        );
    }

    return (state, stage) => {
        for(var i = 0; i < action_lst.length; i ++){
            if(state.input & action_lst[i]){
                callback_lst[i](state, stage, state[player_name]);
            }
        }
    }
}

function get_attack_action(const_state, player_name){
    // Dimensions of the attacks image
    const effect_width = 64;
    const effect_height = 64;
    const frames = 8;
    const rate = 15;
    const attack_id = "attack-" + player_name;

    function attack(state, stage){
        if(!state.temp[attack_id]){
            var target_x = state[player_name].animation.x;
            var target_y = state[player_name].animation.y;
            var x = target_x - (effect_width / 2) + (state[player_name].animation.width / 2);
            var y = target_y - (effect_height / 2) + (state[player_name].animation.height / 2);

            var effectImage = new Image(frames * effect_width, effect_height); // New Image HTML element
            effectImage.src = "assets/images/AttackEffect.png";

            // knight run spritesheet data
            var data = {
                images: [effectImage],
                frames: {width: effect_width, height: effect_height},
                framerate: rate
            };

            var sheet = new createjs.SpriteSheet(data);
            var sprite = new createjs.Sprite(sheet);
            
            sprite.x = x;
            sprite.y = y;

            state.temp[attack_id] = {
                ref: sprite,
                ttl: Math.round(frames / Math.round(60 / rate))  
            }

            stage.addChild(state.temp[attack_id].ref);
            state.temp[attack_id].ref.gotoAndPlay(0);
        }
    }
    
    return attack;
}