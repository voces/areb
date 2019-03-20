
import {
	Math,
	CylinderGeometry,
	BoxGeometry,
	TetrahedronGeometry,
	DodecahedronGeometry
} from "../../node_modules/three/build/three.module.js";

export const randColor = ( color, colorVariation = 1 / 24 ) =>
	color.clone().offsetHSL(
		Math.randFloatSpread( colorVariation ),
		Math.randFloatSpread( colorVariation ),
		Math.randFloatSpread( colorVariation ),
	);

export const randomize = ( geometry, {
	color,
	colorVariation = 1 / 24,
	positionVariation = 1 / 8
} = {} ) => {

	if ( color )
		for ( let i = 0; i < geometry.faces.length; i ++ )
			geometry.faces[ i ].color = randColor( color, colorVariation );

	if ( positionVariation !== 0 )
		for ( let i = 0; i < geometry.vertices.length; i ++ ) {

			geometry.vertices[ i ].x *= 1 + Math.randFloatSpread( positionVariation );
			geometry.vertices[ i ].y *= 1 + Math.randFloatSpread( positionVariation );
			geometry.vertices[ i ].z *= 1 + Math.randFloatSpread( positionVariation );

		}

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
