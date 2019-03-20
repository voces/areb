
import {
	Math as Math2,
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors
} from "../../node_modules/three/build/three.module.js";
import { WOOD } from "../colors.mjs";
import { box, cylinder, randColor, nudge, randomizeColor } from "./shared.mjs";

export default class BrokenWheelbarrow extends Mesh {

	constructor( {
		color,
		colorVariation = 1 / 8
	} = {} ) {

		if ( color === undefined ) color = randColor( WOOD, colorVariation );

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		const leftWheel = cylinder( { length: 1 / 32, radius: 1 / 8, color } );
		leftWheel.rotateX( nudge( Math.PI / 2, 1.00 ) );
		leftWheel.translate( nudge( - 3 / 8, 0.50 ), Math2.randFloatSpread( 1 / 2 ), 1 / 64 );
		geometry.merge( leftWheel );

		const rightWheel = cylinder( { length: 1 / 32, radius: 1 / 8, color } );
		rightWheel.rotateX( nudge( Math.PI / 2, 1.00 ) );
		rightWheel.translate( nudge( 3 / 8, 0.50 ), Math2.randFloatSpread( 1 / 2 ), 1 / 64 );
		geometry.merge( rightWheel );

		// Cage
		{

			const corner = box( { width: 1 / 16, height: 1 / 2, depth: 2 / 16 } );
			corner.rotateX( Math.PI / 2 );
			corner.translate( 0, 0, 1 / 4 );

			geometry.merge( randomizeColor( corner.clone().translate( - 3 / 8, 1 / 2, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( corner.clone().translate( 3 / 8, 1 / 2, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( corner.clone().translate( - 3 / 8, - 1 / 2, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( corner.clone().translate( 3 / 8, - 1 / 2, 0 ), randColor( color ) ) );

			const support = box( { width: 1 / 16, height: 1 / 2, depth: 1 / 16 } );
			support.rotateX( Math.PI / 2 );
			support.translate( 0, 0, 1 / 4 );

			geometry.merge( randomizeColor( support.clone().translate( - 3 / 8, 0, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( support.clone().translate( 3 / 8, 0, 0 ), randColor( color ) ) );

			const plank = box( { width: 2 / 16, height: 1, depth: 1 / 16 } );

			geometry.merge( randomizeColor( plank.clone().translate( - 2.5 / 8, 0, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( plank.clone().translate( - 0.75 / 8, 0, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( plank.clone().translate( 0.75 / 8, 0, 0 ), randColor( color ) ) );
			geometry.merge( randomizeColor( plank.clone().translate( 2.5 / 8, 0, 0 ), randColor( color ) ) );

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, material );

		this.scale.multiplyScalar( 5 );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
