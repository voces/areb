
import fsCallbacks from "fs";
import path from "path";
import { spawn } from "child_process";
import glob from "fast-glob";
import parser from "./parser/parser.js";
import jsStringify from "./util/jsStringify.js";

const fs = fsCallbacks.promises;

const loadTemplate = async parsed => {

	console.log( "Globbing templates..." );
	const templatesPaths = await glob( "./src/template/**/*" );
	console.log( `Globed ${templatesPaths.length} templates` );
	return {
		templatesPaths,
		templates: await Promise.all( templatesPaths.map( async path => {

			// console.log( `Loading template ${path}...` );
			const file = await fs.readFile( path, "utf-8" );
			// console.log( `Loaded template ${path}` );

			const replacer = ( _, match ) => {

				const parts = match.split( "." );

				let cur = parsed;
				for ( let i = 0; i < parts.length && cur; i ++ )
					cur = cur[ parts[ i ] ];

				return cur;

			};

			return file.replace( /\/\* \{\{(.+?)\}\} \*\//g, replacer )
				.replace( /\bt\( "(.+?)" \);?/g, replacer )
				.replace( /\bts\( "(.+?)" \);?/g, ( ...args ) => `"${replacer( ...args )}"` )
				.replace( /\btj\( "(.+?)", ([0-9]|".+") \)?/g, ( _, match, spacing ) => {

					const str = jsStringify( replacer( _, match ) );
					const tab = isNaN( spacing ) ? JSON.parse( spacing ) : "\t".repeat( parseInt( spacing ) );
					const lines = str.split( "\n" );
					return [ lines[ 0 ], ...lines.slice( 1 ).map( v => v ? tab + v : v ) ].join( "\n" );

				} )
				.replace( /\btj\( "(.+?)" \)?/g, ( ...args ) => jsStringify( replacer( ...args ) ) );

		} ) )
	};

};

const setupOutputDirectory = async () => {

	if ( await fs.access( "./out" ).catch( err => err ) instanceof Error ) {

		console.log( "Making /out..." );
		await fs.mkdir( "./out" );
		console.log( "Made /out" );

	}

};

const writeTemplate = async ( templates, templatesPaths ) =>
	Promise.all( templates.map( async ( template, i ) => {

		const templateFile = templatesPaths[ i ].split( "/" ).slice( 3 ).join( "/" );
		const templatePath = path.join(
			"out",
			templateFile
		);
		const dir = path.dirname( templatePath );
		// console.log( `Writing template ${templateFile}` );
		await fs.mkdir( dir, { recursive: true } );
		const result = await fs.writeFile( templatePath, template );
		// console.log( `Template ${templateFile} written` );
		return result;

	} ) )
		.catch( console.error );

// We can probably just rebuild symlinks
const writeFiles = () => new Promise( ( resolve, reject ) => {

	console.log( "Cloning files..." );
	const child = spawn( "rsync", [
		"-a",
		"--copy-links",
		"src/files/",
		"resources",
		"out"
	], { shell: true } );

	let err = "";

	child.stderr.on( "data", data => err += data );

	child.on( "close", code => {

		if ( code === 0 ) {

			console.log( "Cloned files" );
			return resolve();

		}

		reject( err );

	} );

} );

export default async buffer => {

	const setupOutputDirectoryPromise = setupOutputDirectory();

	await Promise.all( [
		setupOutputDirectoryPromise.then( () => writeFiles() ),
		parser( buffer )
			.then( parsed => Promise.all( [ loadTemplate( parsed ), setupOutputDirectoryPromise ] ) )
			.then( ( [ { templates, templatesPaths } ] ) =>
				writeTemplate( templates, templatesPaths ) )
	] );

};
