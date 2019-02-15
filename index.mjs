#!/usr/bin/env node --experimental-modules --no-warnings

import fs from "fs";

import w3e2png from "./w3e2png.mjs";

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

	const png = w3e2png( res );
	png.pack().pipe( fs.createWriteStream( "out.png" ) );

} );
