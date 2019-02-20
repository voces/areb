
const fetchCache = ( rootCache, args ) => {

	let cache = rootCache;
	for ( let i = 0; i < args.length - 1; i ++ ) {

		if ( ! ( args[ i ] in cache ) ) cache[ args[ i ] ] = {};
		cache = cache[ args[ i ] ];

	}

	const lastArg = args[ args.length - 1 ];
	return [ cache[ lastArg ], cache, lastArg in cache, lastArg ];

};

export const memoize = fn => {

	const cache = {};
	return function ( ...args ) {

		const [ value, container, contains, lastArg ] = fetchCache( cache, args );
		if ( contains ) return value;
		else return container[ lastArg ] = fn.apply( this, args );

	};

};
