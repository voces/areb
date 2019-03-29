
import Map from "./webcraft/Map.mjs";
import tiles from "./resources/tiles.mjs";

import Mesh from "./node_modules/notextures/src/meshes/PileOfJunk.mjs";

const clean = ( [ str ] ) => str.split( "\n" ).slice( 1 ).map( row => row.trim().split( "" ).map( cell => isNaN( cell ) ? cell : parseFloat( cell ) ) );

const json = {
	terrain: {
		size: {
			width: 5,
			height: 5
		},
		tiles: Object.values( tiles ),
		// Generally = center
		offset: {
			x: 2.5,
			y: 2.5,
			z: 0
		},
		masks: {
			cliff: clean`
				00000
				00000
				00000
				00000
				00000`,
			height: clean`
				000000
				000000
				000000
				000000
				000000
				000000`,
			groundTile: clean`
				00000
				00000
				00000
				00000
				00000`,
			cliffTile: clean`
				00000
				00000
				00000
				00000
				00000`,
			water: clean`
				00000
				00000
				00000
				00000
				00000`,
			waterHeight: clean`
				000000
				000000
				000000
				000000
				000000
				000000`
		}
	},
	doodads: [
		{ mesh: Mesh }
	]
};

export default new Map( json );
