#!/usr/bin/env node --experimental-modules --no-warnings

import fs from "fs";
import arToEb from "./src/arToEb.js";

if ( process.argv.length < 3 ) {

	console.error( "Usage: w3e2png <file>" );
	process.exit( 1 );

}

const filePath = process.argv[ 2 ];

fs.readFile( filePath, ( err, res ) => {

	if ( err ) {

		console.error( err.message );
		process.exit( 1 );

	}

	arToEb( res.buffer );

} );
