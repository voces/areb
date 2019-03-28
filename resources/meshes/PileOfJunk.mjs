
import {
	Color,
	Curve,
	Math as Math2,
	Mesh,
	MeshPhongMaterial,
	FaceColors,
	Vector2,
	Vector3
} from "../../node_modules/three/build/three.module.js";
import Builder from "./Builder.mjs";
import Randomizer from "./Randomizer.mjs";
import { CLOTH, ROPE, WOOD, STONE } from "../colors.mjs";

// TODO: This has a lot of smaller geometries; we should pull them out to be reusable

const nearPoint = ( objects, min ) => {

	let spread = min;
	while ( spread < Infinity ) {

		const newPoint = new Vector2( Math2.randFloatSpread( spread ), Math2.randFloatSpread( spread ) );
		if ( objects.length === 0 ) return newPoint;
		else {

			const minDistObject = objects.reduce(
				( min, test ) =>
					newPoint.distanceTo( test.point ) - min.radius - test.radius < newPoint.distanceTo( min.point ) - min.radius - test.radius ? test : min,
				{ point: new Vector2( Infinity, Infinity ), radius: 0 } );

			if ( minDistObject.point.distanceTo( newPoint ) - minDistObject.radius - min > min ) return newPoint;
			else spread *= 1.05;

		}

	}

};

const spear = {
	radius: 1 / 128,
	builder: b => b
		.cylinder( 1 / 96, 1 / 96, 17 / 16 )
		.translateY( 17 / 32 )
		.color( Randomizer.colorSpread( WOOD ) )
		.blur( 0.01 )
		.parent
		.octahedron( 1 / 32 )
		.scale( 4 / 7, 0, 2 / 5 )
		.translateY( 17 / 16 )
		.color( Randomizer.colorSpread( STONE ) )
		.blur( 0.01 )
		.parent
		.rotate( Math2.randFloatSpread( 1 / 8 ), Math2.randFloatSpread( 1 / 8 ), Math2.randFloatSpread( 1 / 8 ) )
};

const shortSpear = {
	radius: 1 / 128,
	builder: b => b
		.cylinder( 1 / 96, 1 / 96, 15 / 16 )
		.translateY( 15 / 32 )
		.color( Randomizer.colorSpread( WOOD ) )
		.blur( 0.01 )
		.parent
		.octahedron( 1 / 32 )
		.scale( 4 / 7, 0, 2 / 5 )
		.translateY( 15 / 16 )
		.color( Randomizer.colorSpread( STONE ) )
		.blur( 0.01 )
		.parent
		.rotate( Math2.randFloatSpread( 1 / 8 ), Math2.randFloatSpread( 1 / 8 ), Math2.randFloatSpread( 1 / 8 ) )
};

class Helix extends Curve {

	constructor( length = Math.PI * 4, height = 2, bottomRadius = 1, topRadius = bottomRadius ) {

		super();

		this.length = length;
		this.height = height;
		this.bottomRadius = bottomRadius;
		this.topRadius = topRadius;

	}

	getPoint( t ) {

		const lerp = Math2.lerp( this.bottomRadius, this.topRadius, t );

		return new Vector3(
			Math.cos( t * this.length ) * lerp,
			Math.sin( t * this.length ) * lerp,
			t * this.height
		);

	}

}

const sword = {
	radius: 1 / 96,
	builder: b => b
		.cylinder( 1 / 96, 1 / 96, 15 / 16 ).scale( 2, 1, 1 / 4 ).translateY( 15 / 32 ).parent
		.cone( 1 / 96, 2 / 96 ).translateY( 30 / 32 + 2 / 96 / 2 ).scale( 2, 1, 1 / 4 ).parent
		.cylinder( 1 / 96, 1 / 96, 1 / 8 ).rotateZ( Math.PI / 2 ).color( WOOD ).parent
		.cylinder( 1 / 64 / 4, 1 / 96, 1 / 8 ).parent
		.tube( new Helix( Math.PI * 64, 1 / 16, 1 / 128, 1 / 96 ), 256, 1 / 1024 ).rotateX( Math.PI / 2 ).color( ROPE ).parent
		.rotateZ( Math.PI ).translateY( 30 / 32 + 2 / 96 )
		.rotateY( Math.PI * Math.random() )
};

const vaseContentTypes = [ spear, shortSpear, sword ];

const vase = {
	radius: 1 / 8,
	builder: b => {

		const count = Math2.randInt( 0, 3 );
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
	radius: 1 / 8,
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
	radius: 1 / 16,
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
		.color( Randomizer.colorSpread( CLOTH, Randomizer.flatSpreader( 1 / 32 ) ) )

};

const types = [ vase, pot, bag ];

export default class PileOfJunk extends Mesh {

	constructor() {

		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		// Generate n dense points
		const count = Math2.randInt( 3, 5 );
		const objects = [];

		const geometry = new Builder()
			.repeat( count, b => {

				const type = types[ Math.floor( Math.random() * types.length ) ];
				const center = nearPoint( objects, type.radius );
				objects.push( { point: center, radius: type.radius } );
				const child = b.group();
				type.builder( child );
				child
					.rotateX( Math.PI / 2 )
					.translate( center );

			} )
			.root()
			.geometry();

		super( geometry, material );

		// this.scale.multiplyScalar( 9 );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
