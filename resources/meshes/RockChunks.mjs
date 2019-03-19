
import {
	Math as Math2,
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors
} from "../../node_modules/three/build/three.module.js";

import { cylinder, tetrahedron } from "./shared.mjs";

export default class RockChunks extends Mesh {

	constructor() {

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		const base = cylinder( {
			length: 3 / 4,
			radius: 1,
			radialSegments: Math2.randInt( 6, 8 )
		} );
		base.rotateX( Math.PI / 2 );
		base.rotateZ( Math2.randFloatSpread( Math.PI ) );
		base.translate( 0, 0, 3 / 8 );
		geometry.merge( base );

		if ( Math.random() < 0.75 ) {

			const top = cylinder( {
				length: 1 / 2,
				radius: 1 / 3,
				radialSegments: Math2.randInt( 4, 6 )
			} );
			top.rotateX( Math.PI / 2 );
			base.rotateZ( Math2.randFloatSpread( Math.PI ) );
			top.translate( Math2.randFloatSpread( 7 / 8 ), Math2.randFloatSpread( 7 / 8 ), 3 / 4 + 1 / 4 );
			geometry.merge( top );

		}

		const sideChunks = Math2.randInt( 0, 2 );
		for ( let i = 0; i < sideChunks; i ++ ) {

			const chunk = cylinder( {
				length: 1 / 2,
				radius: 1 / 3,
				radialSegments: Math2.randInt( 4, 6 )
			} );
			chunk.rotateX( Math.PI / 2 );
			base.rotateZ( Math2.randFloatSpread( Math.PI ) );
			const angle = Math2.randFloatSpread( 2 * Math.PI );
			chunk.translate( Math.cos( angle ), Math.sin( angle ), 1 / 4 );
			geometry.merge( chunk );

		}

		window.Math2 = Math2;
		const fallenChunks = Math2.randInt( 0, 5 );
		for ( let i = 0; i < fallenChunks; i ++ ) {

			const chunk = tetrahedron( {
				radius: 1 / 5,
				detail: Math2.randInt( 0, 2 )
			} );
			chunk.rotateX( Math.PI / 2 );
			base.rotateZ( Math2.randFloatSpread( Math.PI ) );
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
