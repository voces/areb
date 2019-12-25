#!/usr/bin/env node --experimental-modules --no-warnings
// Builds types.js from unit .slk files

import { promises as fs } from "fs";
import path from "path";
import glob from "fast-glob";
import jsStringify from "../../src/util/jsStringify.js";
import slkToArr from "../../src/converters/slkToArr.js";
import tableToObjs from "../../src/converters/tableToObjs.js";

const killWithError = err => {

	console.error( err );
	process.exit( 1 );

};

if ( process.argv.length < 3 )
	killWithError( `Directory required\nUsage: ${process.argv[ 1 ].replace( process.cwd(), "." )} <path/to/slks>` );
const input = process.argv[ 2 ];

const output = process.argv[ 3 ] || "lib/1.31.1.12164/types.js";

glob( path.join( input, "*MetaData.slk" ) )
	.then( slkPaths => {

		if ( slkPaths.length === 0 ) throw new Error( `No slk files found at ${input}` );

		return Promise.all( slkPaths.map( tsvPath =>
			fs.readFile( tsvPath, "utf-8" )
				.then( slkToArr )
		) );

	} )
	.then( slkFiles => {

		const types = {};
		slkFiles.forEach( file => tableToObjs( file ).forEach( row => {

			const key = `${row.slk}-${row.section}-${row.field}`;
			if ( types[ key ] ) Object.assign( types[ key ], row );
			else types[ key ] = row;

		} ) );
		return Object.values( types );

	} )
	.then( types => fs.writeFile(
		output,
		`\nexport default ${jsStringify( types )};\n`,
	) )
	.catch( killWithError );
