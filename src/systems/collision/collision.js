/*
 * Haofeng Tian
 * 3/9/2020
 * Collision function
 *
 */


function collision(state, tiles, player, direction) {
	//defult set that the player is not blocked
	var is_blocked = false;
	//create a detection area for player(x,y=player.x/y,size = player size)
	var area = new createjs.Shape();
	area.graphics.beginStroke("rgba(255,0,0,0.5)").drawRect(0, 0, state.player1.width, state.player1.height);
	if (player_movable_id == 1) {
		area.x = state.player1.animation.x;
		area.y = state.player1.animation.y;
		if (!state.player1.facingRight) {
			area.x = area.x - 16;  //when change the facing direction of the player, the player.x will move the width of the player
		}
	}
	if (player_movable_id == 2) {
		area.x = state.player2.animation.x;
		area.y = state.player2.animation.y;
		if (!state.player2.facingRight) {
			area.x = area.x - 16;
		}
	}




	console.log(area.x, area.y, state.player1.animation.x, state.player1.animation.y);

	switch (direction) {
		case "up":
			area.y = area.y - 2;
			break;
		case "down":
			area.y = area.y + 2;
			break;
		case "left":
			area.x = area.x - 2;
			break;
		case "right":
			area.x = area.x + 2;
			break;
	}



	//(x1 + w1) < x2 || (x2 + w2) < x1 || (y1 + h1) < y2 || (y2 + h2) < y1
	//x,y is the position of left up corner of the square. w=width h=height


	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if (tiles[i][j].color == "wall_1.png") {
				if ((area.x + 16) < tiles[i][j].x ||
					tiles[i][j].x + 16 < area.x ||
					(area.y + 16) < tiles[i][j].y ||
					tiles[i][j].y + 16 < area.y) {

					is_blocked = false;
				}

				else {
					return is_blocked = true;
				}
			}
		}

	}
	console.log(is_blocked);
	return is_blocked;
}