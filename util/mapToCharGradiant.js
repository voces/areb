
import charGradient from "./charGradiant.js";

export default map => {

	let min = Infinity;
	let max = - Infinity;
	let ints = true;

	for ( let y = 0; y < map.length; y ++ )
		for ( let x = 0; x < map[ y ].length; x ++ ) {

			if ( map[ y ][ x ] < min ) min = map[ y ][ x ];
			if ( map[ y ][ x ] > max ) max = map[ y ][ x ];
			if ( ! ints || ! Number.isInteger( map[ y ][ x ] ) ) ints = false;

		}

	const range = max - min;
	const scaler = ints ? 1 : 93.5 / range;
	const set = charGradient( ints ? Math.min( range + 1, 94 ) : 94 );

	let s = "";
	for ( let y = 0; y < map.length; y ++ ) {

		for ( let x = 0; x < map[ y ].length; x ++ ) {

			s += set[ Math.floor( ( map[ y ][ x ] - min ) * scaler ) ];
			if ( set[ Math.floor( ( map[ y ][ x ] - min ) * scaler ) ] === undefined )
				console.log( x, y, map[ y ][ x ] - min, Math.floor( ( map[ y ][ x ] - min ) * scaler ) );

		}

		s += "\n";

	}

	return s.slice( 0, - 1 );

};
