
import tiles from "../../resources/tiles.js";

// WC3 describes heights by tile, but we want heights by tile corner
// https://docs.google.com/drawings/d/1lPw4KP92Bjea6GlovjH61MPClK3Csw9b44ts-H_WxSU/edit?usp=sharing
const heightTilesToHeightMap = ( heights, enabled ) => {

	const height = heights.length;
	const width = heights[ 0 ].length;

	const map = [];
	for ( let y = - 1; y < height; y ++ ) {

		const row = [];
		for ( let x = - 1; x < width; x ++ )
			row.push(
				[
					y >= 0 && ( ! enabled || enabled[ y ][ x ] ) ? heights[ y ][ x ] : NaN,
					y >= 0 && ( ! enabled || enabled[ y ][ x + 1 ] ) ? heights[ y ][ x + 1 ] : NaN,
					y + 1 < height && ( ! enabled || enabled[ y + 1 ][ x ] ) ? heights[ y + 1 ][ x ] : NaN,
					y + 1 < height && ( ! enabled || enabled[ y + 1 ][ x + 1 ] ) ? heights[ y + 1 ][ x + 1 ] : NaN
				]
					.filter( h => ! isNaN( h ) )
					.reduce( ( sum, height, index, arr ) => sum + height / arr.length, 0 )
			);

		map.push( row );

	}

	return map;

};

const isRamp = ( x, y, corners ) =>

	// Self must be a ramp
	corners[ y ][ x ].ramp &&
	// Protection against ramps on edges (not real!)
	x > 0 && y > 0 && y < corners.length - 1 && x < corners[ 0 ].length - 1 &&
	// General rule for a ramp:
	// - Both ends of the ramp are also ramps
	// - Both ends should have a different height
	// - The center of the ramp's height should be the same as the min
	(
		// Horizontal
		corners[ y ][ x - 1 ].ramp && corners[ y ][ x + 1 ].ramp &&
		corners[ y ][ x - 1 ].layerHeight !== corners[ y ][ x + 1 ].layerHeight &&
		corners[ y ][ x ].layerHeight === Math.min( corners[ y ][ x - 1 ].layerHeight, corners[ y ][ x + 1 ].layerHeight ) ||
		// Vertical
		corners[ y - 1 ][ x ].ramp && corners[ y + 1 ][ x ].ramp &&
		corners[ y - 1 ][ x ].layerHeight !== corners[ y + 1 ][ x ].layerHeight &&
		corners[ y ][ x ].layerHeight === Math.min( corners[ y - 1 ][ x ].layerHeight, corners[ y + 1 ][ x ].layerHeight ) ||
		// Corner \
		corners[ y - 1 ][ x - 1 ].ramp && corners[ y + 1 ][ x + 1 ].ramp &&
		corners[ y - 1 ][ x - 1 ].layerHeight !== corners[ y + 1 ][ x + 1 ].layerHeight &&
		corners[ y ][ x ].layerHeight === Math.min( corners[ y - 1 ][ x - 1 ].layerHeight, corners[ y + 1 ][ x + 1 ].layerHeight ) ||
		// Corner /
		corners[ y + 1 ][ x - 1 ].ramp && corners[ y - 1 ][ x + 1 ].ramp &&
		corners[ y + 1 ][ x - 1 ].layerHeight !== corners[ y - 1 ][ x + 1 ].layerHeight &&
		corners[ y ][ x ].layerHeight === Math.min( corners[ y + 1 ][ x - 1 ].layerHeight, corners[ y - 1 ][ x + 1 ].layerHeight )
	);

const tilesArr = Object.values( tiles );
const warnAndRandom = tile => {

	const randomTile = tilesArr[ Math.floor( tilesArr.length * Math.random() ) ];
	console.warn( `Unknown tile ${tile}, using ${randomTile.name}` );
	return randomTile;

};

export default war3Map => {

	const environment = war3Map.readEnvironment();

	const groundTiles = environment.groundTilesets.map( tile => tiles[ tile ] || warnAndRandom( tile ) );
	const cliffTiles = environment.cliffTilesets.map( tile => tiles[ tile ] || warnAndRandom( tile ) );

	const corners = environment.corners.reverse();

	const water = corners.map( row => row.map( corner => corner.water ) );

	const width = environment.mapSize[ 0 ];
	const height = environment.mapSize[ 1 ];
	const foundOffset = {
		x: - environment.centerOffset[ 0 ] / 128 + 0.5,
		y: - environment.centerOffset[ 1 ] / 128 - 0.5
	};
	const expectedOffset = {
		x: ( width - 1 ) / 2,
		y: ( height - 1 ) / 2
	};
	const offset = {
		x: expectedOffset.x - ( expectedOffset.x - foundOffset.x ),
		y: expectedOffset.y + ( expectedOffset.y - foundOffset.y ),
		z: - 2
	};

	const boundaryIndex = groundTiles.length + cliffTiles.length;

	return {
		size: { height, width },
		tiles: [ ...groundTiles, ...cliffTiles, tiles.Bdry ],
		masks: {
			// Per tile
			cliff: corners.map( ( row, y ) => row.map( ( corner, x ) => isRamp( x, y, corners ) ? "r" : corner.layerHeight ) ),
			// Per vertex
			height: heightTilesToHeightMap( corners.map( row => row.map( corner => corner.groundHeight ) ) ),
			// Per tile (TODO: boundaries are phase shifted, so do NOT work as per-vertex (or even per-face))
			groundTile: corners.map( row => row.map( corner => corner.boundary || corner.mapEdge ? boundaryIndex : corner.groundTexture ) ),
			// Per tile
			cliffTile: corners.map( row => row.map( corner => corner.boundary || corner.mapEdge ? boundaryIndex : groundTiles.length + ( corner.cliffTexture === 15 ? 0 : corner.cliffTexture ) ) ),
			// Per tile
			water,
			// Per vertex
			waterHeight: heightTilesToHeightMap( corners.map( row => row.map( corner => corner.waterHeight + 1 ) ), water )
		},
		offset
	};

};
