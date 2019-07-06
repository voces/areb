
// Returns a unique object for each tuple of input (same input yields same output)

const root = {};

export default ( ...vars ) => {

	let cur = root;
	for ( let i = 0; i < vars.length; i ++ )

		if ( typeof vars[ i ] === "object" ) {

			if ( cur._key_map === undefined ) cur._key_map = new WeakMap();
			cur = cur._key_map.get( vars[ i ] ) || cur._key_map.set( vars[ i ], {} );

		} else cur = cur[ vars[ i ] ] || ( cur[ vars[ i ] ] = {} );

	return cur;

};
