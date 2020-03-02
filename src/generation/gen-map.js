/*
 * Cory Hayes
 * 3/2/2020
 * Generation of Map
 */


 // create map of size X tiles width, Y tiles height
function gen_map(x, y){
	// random number of rooms between 3 - 4
	const room_count = Math.floor(Math.random() * 2 + 3);
	
	// room tile count variability +-5%
	const room_margin = 0.05;
	
	const tile_count = x  * y;
	const tile_colors = [
		"floor_1.png", 
		"floor_2.png", 
		"floor_9.png", 
		"floor_side4.png"
	];
	
	var tilesRemaining = tile_count;
	var tilesPerRoom = [];
	
	var tiles = [];
	
	// initialize tiles 2D array
	for(var i = 0; i < x; i++){
		tiles[i] = [];
	}
	
	// allocate first (room_count - 1) rooms an amount of tiles
	for(var i = 0; i < room_count - 1; i++){
		tilesPerRoom[i] = tile_count / room_count + Math.floor((Math.random() * 2 * room_margin - room_margin) * tile_count);
		tilesRemaining = tilesRemaining - tilesPerRoom[i];
	}
	
	// allocate last room remaining tiles
	tilesPerRoom[i - 1] = tilesRemaining;
	
	for(var i = 0; i < room_count; i++){
		var startTileX = 0;
		var startTileY = 0;
		
		while(tiles[startTileX][startTileY] != null){
			startTileX = Math.floor(Math.random() * x);
			startTileY = Math.floor(Math.random() * y);
		}
		
		create_tiles(tiles, tilesPerRoom[i], tile_colors[i], startTileX, startTileY, x, y);
    }
    
    return tiles;
}

function create_tiles(tiles, tileCount, color, x, y, max_x, max_y){
	if(x >= 0 && x < max_x && y >= 0 && y < max_y && tileCount > 0){
		if(tiles[x][y] == null){
			tiles[x][y] = {
				color: this.color,
				x: this.x * tile_dim,
				y: this.y * tile_dim,
			};
			
			create_tiles(--tileCount, color, --x, --y, max_x, max_y);
			create_tiles(--tileCount, color, --x, ++y, max_x, max_y);
			create_tiles(--tileCount, color, ++x, --y, max_x, max_y);
			create_tiles(--tileCount, color, ++x, ++y, max_x, max_y);
		}
		else if(tiles[x][y].color != this.color){
			tiles[x][y].color = "wall_1.png";
		}
		else{
			return;
		}
	}
	else{
		return;
	}
}