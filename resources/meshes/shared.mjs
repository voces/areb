
import {
	Math,
	CylinderGeometry,
	Color,
	BoxGeometry
} from "../../node_modules/three/build/three.module.js";

export const WOOD = new Color( 0x663300 );

export const randomize = ( geometry, {
	color = WOOD.clone().offsetHSL( Math.randFloatSpread( 1 / 16 ), 0, 0 ),
	colorVariation = 1 / 24,
	positionVariation = 1 / 8
} = {} ) => {

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
	...rest
} = {} ) =>
	randomize( new CylinderGeometry(
		length + Math.randFloatSpread( lengthVariation ),
		length + Math.randFloatSpread( radiusVariation )
	), rest );

export const box = ( {
	width = 1,
	height = 1,
	depth = 1,
	...rest
} = {} ) => randomize( new BoxGeometry( width, height, depth ), rest );
