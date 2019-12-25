
export default table => {

	const headers = table[ 0 ];

	return table.slice( 1 ).filter( Array.isArray ).map( row => {

		const entries = [];
		for ( let i = 0; i < row.length; i ++ )
			entries.push( [ headers[ i ], row[ i ] ] );
		return Object.fromEntries( entries );

	} );

};
