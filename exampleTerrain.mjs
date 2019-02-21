
import Terrain from "./Terrain.mjs";

const clean = ( [ str ] ) => str.split( "\n" ).slice( 1 ).map( row => row.trim().split( "" ).map( cell => isNaN( cell ) ? cell : parseFloat( cell ) ) );

export default new Terrain( {
	// cliffmap: clean`
	// 	00000
	// 	00000
	// 	00000
	// 	00000
	// 	00000`,
	cliffmap: clean`
		00100
		00100
		11111
		001r0
		00100`,
	heightmap: clean`
		54321
		43210
		32100
		21000
		10000`.map( r => r.map( v => v / 1 	) )
} );
