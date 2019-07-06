
import doodadTypes from "../../resources/doodads.js";

const extractMeshClassName = mesh => mesh.split( "/" ).pop().split( "." )[ 0 ];

export default war3Map => {

	const doo = war3Map.readDoodads();

	const skippedDoodads = {};
	const markSkipped = doodad => {

		if ( ! skippedDoodads[ doodad.id ] ) skippedDoodads[ doodad.id ] = 0;
		skippedDoodads[ doodad.id ] ++;
		return false;

	};

	const imports = new Set();
	const storeMesh = type => {

		imports.add( `../${type.mesh.slice( 2 )}` );

		return { ...type, mesh: { toJS: () => extractMeshClassName( type.mesh ) } };

	};

	const doodads = doo.doodads.filter( doodad => doodadTypes[ doodad.id ] || markSkipped( doodad ) ).map( doodad => ( {
		...storeMesh( doodadTypes[ doodad.id ] ),
		id: doodad.editorId,
		position: {
			x: doodad.location[ 0 ] / 128,
			y: doodad.location[ 1 ] / 128,
			z: doodad.location[ 2 ] / 128
		},
		scale: ( doodad.scale[ 0 ] + doodad.scale[ 1 ] + doodad.scale[ 2 ] ) / 3,
		angle: doodad.angle,
		life: doodad.life
	} ) );

	if ( Object.keys( skippedDoodads ).length )
		console.warn( `Skipped unknown doodads (${Object.entries( skippedDoodads ).map( ( [ key, value ] ) =>
			`${key}: ${value}` ).join( ", " )})` );

	return {
		doodads,
		doodadImports: [ ...imports ].map( i =>
			`import ${extractMeshClassName( i )} from "${i}";` ).join( "\n" )
	};

};
