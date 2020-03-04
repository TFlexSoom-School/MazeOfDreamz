/*
 * Cory Hayes
 * 3/2/2020
 * Map Rendering Module
 */

// tile dimenstions
const tile_dim = 16;

function new_background(state){
	
    var tiles = gen_map(
		(state[render_stage_id].canvas.width / tile_dim), 
		(state[render_stage_id].canvas.height / tile_dim)
	);

    draw_map(state[render_stage_id], tiles);
}

function draw_map(stage, tiles){
	const assets_dir = "assets/images/";

	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[i].length; j++){
			var newTile;

			newTile = new createjs.Bitmap(assets_dir + tiles[i][j].color);
			newTile.x = tiles[i][j].x;
			newTile.y = tiles[i][j].y;
			stage.addChild(newTile);
		}
	}
}