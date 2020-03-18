/*
 * Cory Hayes
 * 3/2/2020
 * Map Rendering Module
 */

// tile dimenstions
const tile_dim = 16;

// tile-id-prefix
const tile_id_prefix = "tile-"

function new_background(state){
	
    var tiles = gen_map(
		(state[render_stage_id].canvas.width / tile_dim), 
		(state[render_stage_id].canvas.height / tile_dim)
	);

    draw_map(state, state[render_stage_id], tiles);
}

function draw_map(state, stage, tiles){
	const assets_dir = "assets/images/";

	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[i].length; j++){
			var newTile;

			newTile = new createjs.Bitmap(assets_dir + tiles[i][j].color);
			newTile.x = tiles[i][j].x;
			newTile.y = tiles[i][j].y;
			stage.addChild(newTile);

			if(tiles[i][j].color == wall_png_name){
				var tile_id = tile_id_prefix + (i + j);
				state[tile_id] = tiles[i][j];
				state[tile_id].width = 16;
				state[tile_id].height = 16;
				register_player_movable_blocking(state, tile_id);
			}
		}
	}
}