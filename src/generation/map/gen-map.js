/*
 * Cory Hayes
 * 3/2/2020
 * Generation of Map
 */

const wall_png_name = "wall_1.png";

// create map of size X tiles width, Y tiles height
function gen_map(x, y){
	// random number of rooms between 3 - 5
	const room_count = Math.floor(Math.random() * 3 + 8);

	// room tile count variability +-5%
	const room_margin = 0.05;
	
	const tile_count = x * y;
	const tile_colors = [
		"floor_1.png",
		"floor_2.png",
		"floor_3.png",
		"floor_4.png",
		"floor_5.png",
		"floor_6.png",
		"floor_7.png",
		"floor_8.png",
		"floor_9.png",
		"floor_10.png",
	]
	
	var tilesRemaining = tile_count;
	var tilesPerRoom = [];
	
	tiles = [];
	
	// initialize tiles 2D array
	// This is bad. We should us push methods.
	// Look at: https://www.tech.io/playgrounds/6181/javascript-arrays---tips-tricks-and-examples
	// under "The length property"
	/*
	for(var i = 0; i < x; i++){
		tiles[i] = [];
		
		for(var j = 0; j < y; j++){
			tiles[i][j] = {
				color: null,
				x: i * tile_dim,
				y: j * tile_dim,
			};
		}
	}
	*/

	for(var i = 0; i < x; i++){
		tiles.push([]);
		for(var j = 0; j < y; j ++){
			tiles[i].push({
				color: null,
				x: i * tile_dim,
				y: j * tile_dim,
			});
		}
	}
	
	// allocate first (room_count - 1) rooms an amount of tiles
	for(var i = 0; i < room_count - 1; i++){
		//tilesPerRoom[i] = Math.floor(tile_count / room_count + (Math.random() * 2 * room_margin - room_margin) * tile_count); // giving too much variability
		tilesPerRoom.push(Math.floor(tile_count / room_count))
		tilesRemaining -= tilesPerRoom[i];
	}
	
	// allocate last room remaining tiles
	tilesPerRoom.push(tilesRemaining);
	
	for(var i = 0; i < room_count; i++){
		var startTileX;
		var startTileY;
		
		do{
			startTileX = Math.floor(Math.random() * x);
			startTileY = Math.floor(Math.random() * y);
		}while(tiles[startTileX][startTileY].color != null)
		
		create_tiles(tilesPerRoom[i] - 1, tile_colors[i % tile_colors.length], startTileX, startTileY, x, y);
	}
	
	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[i].length; j++){
			if(tiles[i][j].color == null){
				tiles[i][j].color = wall_png_name;
			}
		}
	}
	
	return(tiles);
}

/* Recursion is very powerhungry. Iterative method would be nicer
   -- Tristan */
function create_tiles(tileCount, setColor, x, y, max_x, max_y){
	if(x >= 0 && x < max_x && y >= 0 && y < max_y && tileCount > 0){
		if(tiles[x][y].color == null){
			tiles[x][y].color = setColor;
			
			create_tiles(--tileCount, setColor, --x, y, max_x, max_y);
			create_tiles(--tileCount, setColor, x, --y, max_x, max_y);
			create_tiles(--tileCount, setColor, ++x, y, max_x, max_y);
			create_tiles(--tileCount, setColor, x, ++y, max_x, max_y);
		}
		else if(tiles[x][y].color != setColor){
			tiles[x][y].color = wall_png_name;
		}
		else{
			return;
		}
	}
	else{
		return;
	}
}