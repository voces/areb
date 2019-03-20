
import {
	Math as Math2,
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors
} from "../../node_modules/three/build/three.module.js";
import { STONE } from "../colors.mjs";
import { dodecahedron, tetrahedron, randColor } from "./shared.mjs";

export default class RockChunks extends Mesh {

	constructor( {
		color,
		colorVariation = 1 / 8
	} = {} ) {

		if ( color === undefined ) color = randColor( STONE, colorVariation );

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		const base = dodecahedron( {
			radius: 1,
			color: randColor( color, colorVariation ),
			positionVariation: 1 / 2
		} );
		base.rotateX( Math.PI / 2 );
		base.rotateZ( Math2.randFloatSpread( Math.PI ) );
		base.translate( 0, 0, 3 / 8 );
		geometry.merge( base );

		const fallenChunks = Math2.randInt( 0, 3 );
		for ( let i = 0; i < fallenChunks; i ++ ) {

			const chunk = tetrahedron( {
				radius: 1 / 3,
				detail: Math2.randInt( 0, 1 ),
				color: randColor( color, colorVariation ),
				positionVariation: 1 / 2
			} );
			const angle = Math2.randFloatSpread( 2 * Math.PI );
			const dist = Math2.randFloat( 1, 5 / 4 );
			chunk.translate( dist * Math.cos( angle ), dist * Math.sin( angle ), 1 / 10 );
			geometry.merge( chunk );

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
