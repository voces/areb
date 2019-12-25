#!/usr/bin/env node --experimental-modules --no-warnings

import fs from "fs";
import parse from "jass-to-ast";
import { astToJS } from "../src/parser/source.js";

if ( process.argv.length < 3 ) {

	console.error( "Usage: jass-to-js <file>" );
	process.exit( 1 );

}

const filePath = process.argv[ 2 ];

fs.readFile( filePath, "utf-8", ( err, res ) => {

	if ( err ) {

		console.error( err.message );
		process.exit( 1 );

	}

	const ast = parse( res );
	console.log( astToJS( ast ) );

} );
