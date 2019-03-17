
import War3Map from "./node_modules/w3x-parser/dist/bundle.mjs";

import tiles from "./resources/tiles.mjs";
import doodadTypes from "./resources/doodads.mjs";

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
	x > 0 && y > 0 && y < corners.length - 1 && x < corners[ 0 ].length - 1 &&
	corners[ y ][ x ].ramp &&
	corners[ y ][ x - 1 ].ramp &&
	corners[ y ][ x + 1 ].ramp &&
	corners[ y - 1 ][ x ].ramp &&
	corners[ y + 1 ][ x ].ramp &&
	[
		corners[ y ][ x ].layerHeight,
		corners[ y ][ x - 1 ].layerHeight,
		corners[ y ][ x + 1 ].layerHeight,
		corners[ y - 1 ][ x ].layerHeight,
		corners[ y + 1 ][ x ].layerHeight
	].filter( ( v, i, arr ) => arr.indexOf( v ) === i ).length > 1;

const tilesArr = Object.values( tiles );
const warnAndRandom = tile => {

	const randomTile = tilesArr[ Math.floor( tilesArr.length * Math.random() ) ];
	console.warn( `Unknown tile ${tile}, using ${randomTile.name}` );
	return randomTile;

};

export const terrain = war3Map => {

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

	return {
		size: { height, width },
		tiles: [ ...groundTiles, ...cliffTiles ],
		masks: {
			// Per tile
			cliff: corners.map( ( row, y ) => row.map( ( corner, x ) => isRamp( x, y, corners ) ? "r" : corner.layerHeight ) ),
			// Per vertex
			height: heightTilesToHeightMap( corners.map( row => row.map( corner => corner.groundHeight ) ) ),
			// Per tile
			groundTile: corners.map( row => row.map( corner => corner.groundTexture ) ),
			// Per tile
			cliffTile: corners.map( row => row.map( corner => groundTiles.length + ( corner.cliffTexture === 15 ? 0 : corner.cliffTexture ) ) ),
			// Per tile
			water,
			// Per vertex
			waterHeight: heightTilesToHeightMap( corners.map( row => row.map( corner => corner.waterHeight + 1 ) ), water )
		},
		offset
	};

};

export const doodads = war3Map => {

	const doo = war3Map.readDoodads();

	return doo.doodads.filter( doodad => doodadTypes[ doodad.id ] ).map( doodad => ( {
		id: doodad.editorId,
		mesh: doodadTypes[ doodad.id ].mesh,
		position: {
			x: doodad.location[ 0 ] / 128,
			y: doodad.location[ 1 ] / 128,
			z: doodad.location[ 2 ] / 128
		},
		scale: ( doodad.scale[ 0 ] + doodad.scale[ 1 ] + doodad.scale[ 2 ] ) / 3,
		life: doodad.life
	} ) );

};

export default buffer => {

	const war3Map = window.war3Map = new War3Map( buffer );

	return {
		terrain: terrain( war3Map ),
		doodads: doodads( war3Map )
	};

};
