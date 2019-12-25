
const merge = ( target, ...sources ) => {

	for ( const source of sources ) {

		if ( typeof source !== "object" )
			throw new Error( "Should only merge nested objects" );

		for ( const prop in source )

			// if value is primitive of key unset in target, just set
			if ( typeof source[ prop ] !== "object" || source[ prop ] === null || ! ( prop in target ) )
				target[ prop ] = source[ prop ];

			else if ( Array.isArray( source[ prop ] ) )
				// if source value is an array, but target is not, just set
				if ( ! Array.isArray( target[ prop ] ) ) target[ prop ] = source[ prop ];
				// otherwise merge entries
				else merge( target[ prop ], source[ prop ] );

			// if source value is an object, but target is not, just set
			else if ( typeof target[ prop ] !== "object" ) target[ prop ] = source[ prop ];
			// otherwise merge entries
			else merge( target[ prop ], source[ prop ] );

	}

	return target;

};

export default merge;
