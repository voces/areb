
import War3Map from "./node_modules/w3x-parser/dist/bundle.mjs";

import tiles from "./resources/tiles.mjs";

import mapToCharGradiant from "./util/mapToCharGradiant.mjs";
window.mapToCharGradiant = mapToCharGradiant;

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
	corners[ y ][ x ].ramp &&
	corners[ y ][ x - 1 ].ramp &&
	corners[ y ][ x + 1 ].ramp &&
	corners[ y - 1 ][ x ].ramp &&
	corners[ y + 1 ][ x ].ramp;

export const terrain = war3Map => {

	const environment = war3Map.readEnvironment();

	console.log( environment );

	const groundTiles = environment.groundTilesets.map( tile => tiles[ tile ] );
	const cliffTiles = environment.cliffTilesets.map( tile => tiles[ tile ] );

	const corners = environment.corners.reverse();

	const water = corners.map( row => row.map( corner => corner.water ) );

	return {
		size: {
			height: environment.mapSize[ 1 ],
			width: environment.mapSize[ 0 ]
		},
		tiles: [ ...groundTiles, ...cliffTiles ],
		maps: {
			cliff: corners.map( ( row, y ) => row.map( ( corner, x ) => isRamp( x, y, corners ) ? "r" : corner.layerHeight ) ),
			height: heightTilesToHeightMap( corners.map( row => row.map( corner => corner.groundHeight ) ) ),
			groundTile: corners.map( row => row.map( corner => corner.groundTexture ) ),
			cliffTile: corners.map( row => row.map( corner => groundTiles.length + ( corner.cliffTexture === 15 ? 0 : corner.cliffTexture ) ) ),
			water,
			waterHeight: heightTilesToHeightMap( corners.map( row => row.map( corner => corner.waterHeight ) ), water )
		}
	};

};

export default buffer => {

	const war3Map = new War3Map( buffer );

	return {
		terrain: terrain( war3Map )
	};

};
