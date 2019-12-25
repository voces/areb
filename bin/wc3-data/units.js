#!/usr/bin/env node --experimental-modules --no-warnings
// Builds units.json from unit .tsv files

import { promises as fs } from "fs";
import { inspect } from "util";
import glob from "fast-glob";
import jsStringify from "../../src/util/jsStringify.js";
import castValue from "../../src/parser/helpers/castValue.js";

const killWithError = err => {

	console.error( err );
	process.exit( 1 );

};

const fromPathEntries = arr => {

	// We can produce another array
	const obj = arr[ 0 ] && arr[ 0 ][ 0 ] && ! isNaN( arr[ 0 ][ 0 ].split( "." )[ 0 ] ) ? [] : {};
	if ( ! Array.isArray( arr ) ) throw new Error( `not an array: ${inspect( arr, true, 10, true )}` );
	for ( const [ path, value ] of arr ) {

		const parts = path.split( "." );
		let cur = obj;
		for ( const part of parts.slice( 0, - 1 ) )
			cur = cur[ part ] || ( cur[ part ] = isNaN( part ) ? {} : [] );
		cur[ parts[ parts.length - 1 ] ] = value;

	}

	return obj;

};

const dir = "lib/1.31.1.12164/units/raw";
glob( dir + "/*.tsv" )
	.then( tsvPaths => {

		if ( tsvPaths.length === 0 ) throw new Error( `No tsv files found at ${dir}` );

		return Promise.all( [
			Promise.all( tsvPaths.map( tsvPath =>
				fs.readFile( tsvPath, "utf-8" )
					.then( file => file.split( "\n" ).map( row => row.split( "\t" ) ) ) ) ),
			fs.readFile( dir + "/../UnitMetaData.tsv", "utf-8" )
				.then( file => file.split( "\n" ).map( row => row.split( "\t" ) ) ),
		] );

	} )
	.then( ( [ tsvs, defs ] ) => {

		const units = {};
		for ( const tsv of tsvs ) {

			const header = tsv[ 0 ];
			for ( const row of tsv.slice( 1 ) ) {

				const unit = units[ row[ 0 ] ] || ( units[ row[ 0 ] ] = {} );
				for ( let i = 1; i < row.length; i ++ ) {

					const column = header[ i ];
					const value = row[ i ];
					if ( unit[ column ] !== undefined ) {

						if ( Array.isArray( unit[ column ] ) ) {

							if ( ! unit[ column ].includes( value ) ) unit[ column ].push( value );

						} else if ( unit[ column ] !== value ) unit[ column ] = [ unit[ column ], value ];

					} else unit[ column ] = value;

				}

			}

		}

		defs = defs.reduce( ( defs, def ) => {

			if ( defs[ def[ 1 ] ] ) throw new Error( `dup ${def[ 1 ]}` );
			return Object.assign( defs, { [ def[ 1 ] ]: { category: def[ 4 ], type: def[ 7 ] } } );

		}, {} );

		console.log( "defs done!" );

		const sorted = Object.fromEntries( Object.entries( units ).map( ( [ id, unit ] ) => [
			id,
			fromPathEntries( Object.entries( unit ).map( ( [ field, value ] ) => [
				defs[ field ] && defs[ field ].category ? `${defs[ field ].category}.${field}` : field,
				castValue( value, field, defs ),
			] ).filter( ( [ , value ] ) => value !== undefined ).sort( ( a, b ) => a[ 0 ].localeCompare( b[ 0 ] ) ) ),
		] ).sort( ( a, b ) => a[ 0 ].localeCompare( b[ 0 ] ) ) );

		console.log( jsStringify( sorted ) );

	} )
	.catch( killWithError );
