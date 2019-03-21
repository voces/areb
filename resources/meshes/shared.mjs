
import {
	Math,
	CylinderGeometry,
	BoxGeometry,
	TetrahedronGeometry,
	DodecahedronGeometry,
	Color,
	Vector3
} from "../../node_modules/three/build/three.module.js";
import { randomizer } from "../../util/random.mjs";

export const nudge = randomizer( 1 / 16, 1 / 4 );

// We expect to ALWAYS have a base color
export const colorNudge = randomizer( 0, 1 / 24 );

// We should clamp rgb to [0, 1]
export const randColor = ( color, colorVariation = colorNudge ) =>
	new Color( colorVariation( color.r ), colorVariation( color.g ), colorVariation( color.b ) );

export const randomizeColor = ( geometry, color, colorVariation ) => {

	color = randColor( color, colorVariation );

	for ( let i = 0; i < geometry.faces.length; i ++ )
		geometry.faces[ i ].color = randColor( color, colorVariation );

	return geometry;

};

export const randomize = ( geometry, {
	color,
	colorVariation,
	// The position of the entire geometry
	position = new Vector3( 0, 0, 0 ),
	positionVariation = nudge,
	// The position of each vertex
	vertexVariation,
	// The rotation of the entire geometry
	rotation,
	rotationVariation = nudge
} = {} ) => {

	if ( color )
		randomizeColor( geometry, color, colorVariation );

	if ( vertexVariation )
		for ( let i = 0; i < geometry.vertices.length; i ++ ) {

			geometry.vertices[ i ].x = vertexVariation( geometry.vertices[ i ].x );
			geometry.vertices[ i ].y = vertexVariation( geometry.vertices[ i ].y );
			geometry.vertices[ i ].z = vertexVariation( geometry.vertices[ i ].z );

		}

	if ( rotation )
		geometry.lookAt( new Vector3(
			rotationVariation( rotation.x || 0 ),
			rotationVariation( rotation.y || 0 ),
			rotationVariation( rotation.z || 0 )
		) );

	if ( position )
		geometry.position = new Vector3(
			positionVariation( position.x || 0 ),
			positionVariation( position.y || 0 ),
			positionVariation( position.z || 0 )
		);

	return geometry;

};

export const cylinder = ( {
	length = 1,
	radius = 1 / 16,
	lengthVariation = length / 16,
	radiusVariation = radius / 16,
	radiusBottom,
	radialSegments,
	...rest
} = {} ) =>
	randomize( new CylinderGeometry(
		radius * ( 1 + Math.randFloatSpread( radiusVariation ) ),
		( radiusBottom === undefined ? radius : radiusBottom ) * ( 1 + Math.randFloatSpread( radiusVariation ) ),
		length * ( 1 + Math.randFloatSpread( lengthVariation ) ),
		radialSegments
	), rest );

export const box = ( {
	width = 1,
	height = 1,
	depth = 1,
	...rest
} = {} ) => randomize( new BoxGeometry( width, height, depth ), rest );

export const tetrahedron = ( { radius = 1, detail = 0, ...rest } = {} ) =>
	randomize( new TetrahedronGeometry( radius, detail ), rest );

export const dodecahedron = ( { radius = 1, detail = 0, ...rest } = {} ) =>
	randomize( new DodecahedronGeometry( radius, detail ), rest );
