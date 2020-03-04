/*
 * Tristan Hilbert
 * 3/3/2020
 * Slime Attack Entity Definition
 * 
 */

const attack_asset_dir = "assets/images/AttackEffect.png";

function new_slime_attack(state, id){
    const effect_width = 64;
    const effect_height = 64;
    const frames = 8;
    const rate = 15;

    var effectImage = new Image(frames * effect_width, effect_height); // New Image HTML element
    effectImage.src = attack_asset_dir;

    // slime attack spritesheet data
    var data = {
        images: [effectImage],
        frames: {width: effect_width, height: effect_height},
        framerate: rate
    };

    var sheet = new createjs.SpriteSheet(data);
    var sprite = new createjs.Sprite(sheet);

    state[id] = sprite;
    state[id].width = effect_width;
    state[id].height = effect_height;
    
    // Register Render!
    register_render(state, id);
}