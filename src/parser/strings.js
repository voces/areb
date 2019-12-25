// (4294963711).toString(2).slice(-12).split('').map(v => v === '1')

import { memoize } from "../../util.js";

const parseStrings = memoize( war3Map => war3Map.readStringTable().stringMap );

export default memoize( war3Map => {

	const strings = parseStrings( war3Map );

	return str => {

		const index = parseInt( str.split( "_" ).pop() );
		return strings.get( index );

	};

} );

export const replaceStrings = ( war3Map, input ) => {

	const strings = parseStrings( war3Map );

	if ( typeof input === "string" )
		return input.replace( /TRIGSTR_(\d+)/g, ( _, v ) => strings.get( parseInt( v ) ) );

	if ( typeof input === "object" )
		if ( Array.isArray( input ) ) {

			for ( let i = 0; i < input.length; i ++ )
				input[ i ] = replaceStrings( war3Map, input[ i ] );

		} else {

			for ( const prop in input )
				input[ prop ] = replaceStrings( war3Map, input[ prop ] );

		}

	return input;

};
