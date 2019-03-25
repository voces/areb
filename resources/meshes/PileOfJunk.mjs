
import {
	Math as Math2,
	Mesh,
	MeshPhongMaterial,
	FaceColors,
	Vector2,
	Color
} from "../../node_modules/three/build/three.module.js";
import Builder from "./Builder.mjs";
import Randomizer from "./Randomizer.mjs";

const BAG_COLOR = new Color( "#493113" );

const VASE = {
	radius: 1 / 6,
	get color() {

		return new Color().setHSL( Math.random(), Math2.randFloat( 0.25, 0.8 ), Math2.randFloat( 0.25, 0.75 ) );

	},
	lathe: [
		new Vector2( 0, 0 ),
		new Vector2( 1 / 16, 0 ),
		new Vector2( 2 / 16, 1 / 32 ),
		new Vector2( 3 / 16, 1 / 2 ),
		new Vector2( 2 / 16, 24 / 32 )
	]
};

const BAG = {
	radius: 1 / 12,
	get color() {

		return Randomizer.colorSpread( BAG_COLOR, Randomizer.flatSpreader( 1 / 32 ) );

	},
	lathe: [
		new Vector2( 0, 0 ),
		new Vector2( 1 / 32, 0 ),
		new Vector2( 2 / 32, 1 / 64 ),
		new Vector2( 3 / 32, 8 / 64 ),
		new Vector2( 3 / 64, 13 / 64 ),
		new Vector2( 1 / 128, 14 / 64 ),
		new Vector2( 4 / 128, 16 / 64 )
	]
};

const types = [ VASE, BAG ];

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

			if ( minDistObject.point.distanceTo( newPoint ) - minDistObject.radius > min ) return newPoint;
			else spread *= 1.1;

		}

	}

};

export default class PileOfJunk extends Mesh {

	constructor() {

		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		// Generate n dense points
		const count = Math2.randInt( 3, 6 );
		const objects = [];

		const geometry = new Builder()
			.repeat( count, b => {

				const type = types[ Math.floor( Math.random() * types.length ) ];
				const center = nearPoint( objects, type.radius );
				objects.push( { point: center, radius: type.radius } );
				b.thickLathe( type.lathe, type.thickness )
					.rotateX( Math.PI / 2 )
					.translate( center )
					.color( type.color );
				// .color( )
				// .randomize();
				// .blur( 1 / 64 )
				// .color( Randomizer.colorSpread( BAG_COLOR, Randomizer.flatSpreader( 1 / 16 ) ), Randomizer.flatSpreader( 1 / 64 ) );

			} )
			.root()
			// .randomize()
			.geometry();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
