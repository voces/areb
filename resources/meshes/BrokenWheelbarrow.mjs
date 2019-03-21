
import {
	Math as Math2,
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors
} from "../../node_modules/three/build/three.module.js";
import { WOOD } from "../colors.mjs";
import { box, cylinder, randColor, nudge } from "./shared.mjs";

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

		const leftWheel = cylinder( { length: 1 / 16, radius: 1 / 4, color } );
		leftWheel.rotateX( nudge( Math.PI / 2, 1.00 ) );
		leftWheel.translate( nudge( - 3 / 5, 0.50 ), Math2.randFloatSpread( 1 / 2 ), 1 / 64 );
		geometry.merge( leftWheel );

		const rightWheel = cylinder( { length: 1 / 16, radius: 1 / 4, color } );
		rightWheel.rotateX( nudge( Math.PI / 2, 1.00 ) );
		rightWheel.translate( nudge( 3 / 5, 0.50 ), Math2.randFloatSpread( 1 / 2 ), 1 / 64 );
		geometry.merge( rightWheel );

		// Cage
		{

			const corner = ( x, y ) =>
				box( { width: 1 / 16, height: 1 / 2, depth: 2 / 16, color: randColor( color ) } )
					.rotateX( Math.PI / 2 )
					.translate( x, y, 1 / 4 );

			geometry.merge( corner( - 3 / 8, 1 / 2 ) );
			geometry.merge( corner( 3 / 8, 1 / 2 ) );
			geometry.merge( corner( - 3 / 8, - 1 / 2 ) );
			geometry.merge( corner( 3 / 8, - 1 / 2 ) );

			const support = x =>
				box( { width: 1 / 16, height: 1 / 2, depth: 1 / 16, color: randColor( color ) } )
					.rotateX( Math.PI / 2 )
					.translate( x, 0, 1 / 4 );

			geometry.merge( support( - 3 / 8, 0, 0 ) );
			geometry.merge( support( 3 / 8, 0, 0 ) );

			const plank = ( x = 0, y = 0, z = 0 ) => {

				const plank = box( { width: 2 / 16, height: 1, depth: 1 / 16, color: randColor( color ) } )
					.rotateZ( Math2.randFloatSpread( 1 / 12 ) )
					.translate( x, y, z );

				return plank;

			};

			geometry.merge( plank( - 3 / 9 ) );
			geometry.merge( plank( - 1 / 9 ) );
			geometry.merge( plank( 1 / 9 ) );
			geometry.merge( plank( 3 / 9 ) );

			geometry.merge( plank().rotateY( Math.PI / 2 ).translate( - 3 / 9, 0, 3 / 16 ) );
			geometry.merge( plank().rotateY( Math.PI / 2 ).translate( - 3 / 9, 0, 7 / 16 ) );

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, material );

		this.scale.multiplyScalar( 5 );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
