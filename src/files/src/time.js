
export default ( cb, log = true ) => {

	const seed = Math.random().toString().slice( 2 );
	performance.mark( seed );
	const res = cb();

	performance.measure( seed + "measure", seed );

	const measure = performance.getEntriesByName( seed + "measure" )[ 0 ];

	if ( log ) {

		console.log( measure.duration );
		return res;

	} else return [ measure.duration, res ];

};
