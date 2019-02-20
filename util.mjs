export const memoize = fn => {

	const cache = {};
	return ( ...args ) => {

		const n = args[ 0 ];
		if ( n in cache ) return cache[ n ];
		else return cache[ n ] = fn( n );

	};

};
