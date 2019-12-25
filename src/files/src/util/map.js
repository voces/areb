
export const getOrSet = ( map, key, generator ) => {

	if ( map.has( key ) ) return map.get( key );
	const value = generator();
	map.set( key, value );
	return value;

};
