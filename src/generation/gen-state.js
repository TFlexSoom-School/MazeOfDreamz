/*
 * Cory Hayes
 * 3/2/2020
 * This function handles the generation of the map.
 * 
 */

// Setup Function for Setting Up State Object
function setup(){
	var knightImg = new Image(96, 16);                             // width, height of resized knight image
	knightImg.src = "assets/images/knight_run_spritesheet.png";
	
	var spriteWidth = 16;
	var spriteHeight = 16;
	
	// knight run spritesheet data
	var knightSheet = {
		images: [knightImg],
		frames: {width: spriteWidth, height: spriteHeight},
		framerate: 15
	};
	
	// create sprites	
	var knightSprite = new createjs.SpriteSheet(knightSheet);
	var animation1 = new createjs.Sprite(knightSprite);
	var animation2 = new createjs.Sprite(knightSprite);
	
    // setup player data
    var state = {
		player1: {
			animation: animation1,
			isMoving: false,
			facingRight: true,
			facingRightPrev: true,
			width: spriteWidth,
			height: spriteHeight
		},
		player2: {
			animation: animation2,
			isMoving: false,
			facingRight: true,
			facingRightPrev: true,
			width: spriteWidth,
			height: spriteHeight
		},
        input: 0,
        exit: false
    }

    return state;
}