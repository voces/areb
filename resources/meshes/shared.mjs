
import {
	Math,
	CylinderGeometry,
	Color,
	BoxGeometry,
	TetrahedronGeometry
} from "../../node_modules/three/build/three.module.js";

export const WOOD = new Color( 0x663300 );

export const randomize = ( geometry, {
	color,
	colorVariation = 1 / 24,
	positionVariation = 1 / 8
} = {} ) => {

	if ( color )
		for ( let i = 0; i < geometry.faces.length; i ++ )
			geometry.faces[ i ].color = color.clone()
				.offsetHSL( Math.randFloatSpread( colorVariation ), 0, 0 );

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

export const tetrahedron = ( { radius = 1, detail = 0 } = {} ) =>
	randomize( new TetrahedronGeometry( radius, detail ) );
