
import {
	Math as Math2,
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors,
	CylinderGeometry
} from "../../node_modules/three/build/three.module.js";

export default class RockChuncks extends Mesh {

	constructor() {

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		const base = new CylinderGeometry( 7 / 8, 1, 3 / 4, 7 );
		base.rotateX( Math.PI / 2 );
		base.rotateZ( Math2.randFloatSpread( Math.PI ) );
		base.translate( 0, 0, 3 / 8 );
		geometry.merge( base );

		if ( Math.random() < 0.75 ) {

			const top = new CylinderGeometry( 7 / 24, 1 / 3, 2 / 4, 5 );
			top.rotateX( Math.PI / 2 );
			base.rotateZ( Math2.randFloatSpread( Math.PI ) );
			top.translate( Math2.randFloatSpread( 7 / 8 ), Math2.randFloatSpread( 7 / 8 ), 3 / 4 + 1 / 4 );
			geometry.merge( top );

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
