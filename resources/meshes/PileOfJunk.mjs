
import {
	Color,
	Math as Math2,
	Mesh,
	MeshPhongMaterial,
	FaceColors,
	Vector2,
	Vector3
} from "../../node_modules/three/build/three.module.js";
import Builder from "./Builder.mjs";
import Randomizer from "./Randomizer.mjs";
import { WOOD, STONE } from "../colors.mjs";

const BAG_COLOR = new Color( "#493113" );

const nearPoint = ( objects, min ) => {

	let spread = min * 2;
	while ( spread < Infinity ) {

		const newPoint = new Vector2( Math2.randFloatSpread( spread ), Math2.randFloatSpread( spread ) );
		if ( objects.length === 0 ) return newPoint;
		else {

			const minDistObject = objects.reduce(
				( min, test ) =>
					newPoint.distanceTo( test.point ) - min.radius - test.radius < newPoint.distanceTo( min.point ) - min.radius - test.radius ? test : min,
				{ point: new Vector2( Infinity, Infinity ), radius: 0 } );

			if ( minDistObject.point.distanceTo( newPoint ) - minDistObject.radius - min > min ) return newPoint;
			else spread *= 1.1;

		}

	}

};

const spear = {
	radius: 1 / 6,
	builder: b => b
		.cylinder( 1 / 96, 1 / 96, 1 )
		.translateY( 1 / 2 )
		.color( Randomizer.colorSpread( WOOD ) )
		.blur( 0.01 )
		.parent
		.octahedron( 1 / 32 )
		.scale( 4 / 7, 0, 2 / 5 )
		.translateY( 1 )
		.color( Randomizer.colorSpread( STONE ) )
		.blur( 0.01 )
		.parent
		.rotate( Math2.randFloatSpread( 1 / 8 ), Math2.randFloatSpread( 1 / 8 ), Math2.randFloatSpread( 1 / 8 ) )
};

const vaseContentTypes = [ spear ];

const vase = {
	radius: 1 / 6,
	builder: b => {

		// const count = Math2.randInt( 0, 3 );
		const count = 1;
		const objects = [];
		return b
			.thickLathe( [
				new Vector2( 0, 0 ),
				new Vector2( 1 / 16, 0 ),
				new Vector2( 2 / 16, 1 / 32 ),
				new Vector2( 3 / 16, 1 / 2 ),
				new Vector2( 2 / 16, 24 / 32 ),
				new Vector2( 3 / 32, 26 / 32 )
			] )
			.color( new Color().setHSL( Math.random(), Math2.randFloat( 0.25, 0.8 ), Math2.randFloat( 0.25, 0.75 ) ) )
			.parent
			.repeat( count, b => {

				const type = vaseContentTypes[ Math.floor( Math.random() * vaseContentTypes.length ) ];
				const center2 = nearPoint( objects, type.radius );
				const center3 = new Vector3( center2.x, 0, center2.y );
				objects.push( { point: center2, radius: type.radius } );
				type.builder( b.group() )
					.translate( center3 );

			} );

	}

};

const pot = {
	radius: 1 / 6,
	builder: b => b
		.thickLathe( [
			new Vector2( 0, 0 ),
			new Vector2( 1 / 16, 0 ),
			new Vector2( 2 / 16, 1 / 64 ),
			new Vector2( 3 / 16, 16 / 64 ),
			new Vector2( 2 / 16, 24 / 64 )
		] )
		.color( new Color().setHSL( Math.random(), Math2.randFloat( 0.25, 0.8 ), Math2.randFloat( 0.25, 0.75 ) ) )
};

const bag = {
	radius: 1 / 12,
	builder: b => b
		.thickLathe( [
			new Vector2( 0, 0 ),
			new Vector2( 1 / 32, 0 ),
			new Vector2( 2 / 32, 1 / 64 ),
			new Vector2( 3 / 32, 8 / 64 ),
			new Vector2( 3 / 64, 13 / 64 ),
			new Vector2( 1 / 128, 14 / 64 ),
			new Vector2( 4 / 128, 16 / 64 )
		] )
		.color( Randomizer.colorSpread( BAG_COLOR, Randomizer.flatSpreader( 1 / 32 ) ) )

};

const types = [ vase, pot, bag ];

export default class PileOfJunk extends Mesh {

	constructor() {

		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		// Generate n dense points
		// const count = Math2.randInt( 3, 6 );
		const count = 1;
		const objects = [];

		const geometry = new Builder()
			.repeat( count, b => {

				// const type = types[ Math.floor( Math.random() * types.length ) ];
				const type = types[ 0 ];
				const center = nearPoint( objects, type.radius );
				objects.push( { point: center, radius: type.radius } );
				type.builder( b )
					.rotateX( Math.PI / 2 )
					.translate( center );

			} )
			.do( console.log )
			.root()
			// .randomize()
			.geometry();

		super( geometry, material );

		this.scale.multiplyScalar( 8 );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
