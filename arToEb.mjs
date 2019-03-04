
import War3Map from "./node_modules/w3x-parser/dist/bundle.mjs";

import tiles from "./resources/tiles.mjs";

import mapToCharGradiant from "./util/mapToCharGradiant.mjs";

window.mapToCharGradiant = mapToCharGradiant;

// WC3 describes heights by tile, but we want heights by tile corner
// https://docs.google.com/drawings/d/1lPw4KP92Bjea6GlovjH61MPClK3Csw9b44ts-H_WxSU/edit?usp=sharing
const heightTilesToHeightMap = tiles => {

	const height = tiles.length;
	const width = tiles[ 0 ].length;

	const map = [];
	for ( let y = - 1; y < height; y ++ ) {

		const row = [];
		for ( let x = - 1; x < width; x ++ )
			row.push(
				[
					y >= 0 ? tiles[ y ][ x ] : NaN,
					y >= 0 ? tiles[ y ][ x + 1 ] : NaN,
					y + 1 < height ? tiles[ y + 1 ][ x ] : NaN,
					y + 1 < height ? tiles[ y + 1 ][ x + 1 ] : NaN
				]
					.filter( h => ! isNaN( h ) )
					.reduce( ( sum, height, index, arr ) => sum + height / arr.length, 0 )
			);

		map.push( row );

	}

	return map;

};

export const terrain = war3Map => {

	const environment = war3Map.readEnvironment();

	console.log( environment );

	const groundTiles = environment.groundTilesets.map( tile => tiles[ tile ] );
	const cliffTiles = environment.cliffTilesets.map( tile => tiles[ tile ] );

	return {
		size: {
			height: environment.mapSize[ 1 ],
			width: environment.mapSize[ 0 ]
		},
		tiles: [ ...groundTiles, ...cliffTiles ],
		maps: {
			cliff: environment.corners.map( row => row.map( corner => corner.layerHeight ) ),
			height: heightTilesToHeightMap( environment.corners.map( row => row.map( corner => corner.groundHeight ) ) ),
			groundTiles: environment.corners.map( row => row.map( corner => corner.groundTexture ) ),
			cliffTiles: environment.corners.map( row => row.map( corner => groundTiles.length + ( corner.cliffTexture === 15 ? 0 : corner.cliffTexture ) ) ),
			water: environment.corners.map( row => row.map( corner => corner.water ) ),
			waterHeight: heightTilesToHeightMap( environment.corners.map( row => row.map( corner => corner.waterHeight ) ) )
		}
	};

};

export default buffer => {

	const war3Map = new War3Map( buffer );

	return {
		terrain: terrain( war3Map )
	};

};
