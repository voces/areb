
import Map from "./webcraft/Map.mjs";
import tiles from "./resources/tiles.mjs";
import PineTree from "./resources/meshes/PineTree.mjs";

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
				00100
				00100
				11111
				001rr
				001r0`.map( r => r.map( v => v ) ),
			height: clean`
				543210
				432100
				321000
				210000
				100000
				000000`.map( r => r.map( v => v / 2 ) ),
			groundTile: clean`
				00000
				00000
				00000
				00000
				00000`,
			water: clean`
				00000
				00000
				00000
				11000
				11000`,
			waterHeight: clean`
				000000
				000000
				000000
				000000
				000000
				000000`.map( r => r.map( v => v ) )
		}
	},
	doodads: [
		{ mesh: PineTree, position: { x: 0, y: 0, z: 1.5 } }
	]
};

export default new Map( json );
