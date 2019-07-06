
const slowFetchCache = ( rootCache, CacheClass, args ) => {

	let cache = rootCache;
	for ( let i = 0; i < args.length - 1; i ++ ) {

		let subCache = cache.get( args[ i ] );
		if ( ! subCache ) {

			subCache = new CacheClass();
			cache.set( args[ i ], subCache );

		}

		cache = subCache;

	}

	const lastArg = args[ args.length - 1 ];
	return [ cache.get( lastArg ), cache, cache.has( lastArg ), lastArg ];

};

const slowMemoize = ( fn, CacheClass ) => {

	const cache = new CacheClass();
	const memoizedFn = function ( ...args ) {

		const [ value, container, contains, lastArg ] = slowFetchCache( cache, CacheClass, args );
		if ( contains ) return value;

		const newValue = fn.apply( this, args );
		container.set( lastArg, newValue );
		return newValue;

	};

	// memoizedFn.memoize = ( value, ...args ) => {

	// 	const [ , container,, lastArg ] = slowFetchCache( cache, args );
	// 	const value = fn.apply( this, args );
	// 	container.set(lastArg, value )
	// 	return value;

	// };

	return memoizedFn;

};

const fetchCache = ( rootCache, args ) => {

	let cache = rootCache;
	for ( let i = 0; i < args.length - 1; i ++ ) {

		if ( ! ( args[ i ] in cache ) ) cache[ args[ i ] ] = {};
		cache = cache[ args[ i ] ];

	}

	const lastArg = args[ args.length - 1 ];
	return [ cache[ lastArg ], cache, lastArg in cache, lastArg ];

};

export const memoize = ( fn, CacheClass ) => {

	if ( CacheClass ) return slowMemoize( fn, CacheClass );

	const cache = {};
	const memoizedFn = function ( ...args ) {

		const [ value, container, contains, lastArg ] = fetchCache( cache, args );
		if ( contains ) return value;
		else return container[ lastArg ] = fn.apply( this, args );

	};

	// memoizedFn.memoize = ( value, ...args ) => {

	// 	const [ , container,, lastArg ] = fetchCache( cache, args );
	// 	return container[ lastArg ] = fn.apply( this, args );

	// };

	return memoizedFn;

};
