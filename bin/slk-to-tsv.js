#!/usr/bin/env node --experimental-modules --no-warnings

import { promises as fs } from "fs";
import yargs from "yargs";
import slkToArr from "../src/converters/slkToArr.js";

const args = yargs.argv;
const filePaths = args._;

if ( filePaths.length === 0 ) {

	console.error( "Usage: slk-to-tsv <path1> [...path2] [--out '$fullname.tsv']" );
	process.exit( 1 );

}

const out = args.out || args.o;

Promise.all( filePaths.map( filePath =>
	fs.readFile( filePath, "utf-8" )
		.then( slk => {

			const tsv = slkToArr( slk ).map( row => row.join( "\t" ) ).join( "\n" );

			if ( out ) return fs.writeFile( out.replace( /\$fullname/g, filePath.replace( /\.\w+$/, "" ) ), tsv );
			else console.log( tsv );

		} )
		.catch( console.error )
) );

