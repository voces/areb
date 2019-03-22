
import {
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors,
	BoxGeometry
} from "../../node_modules/three/build/three.module.js";
import { WOOD } from "../colors.mjs";
import Builder from "./Builder.mjs";
import Randomizer from "./Randomizer.mjs";

export default class Barn extends Mesh {

	constructor() {

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );
		const builder = new Builder( geometry );
		const color = Randomizer.colorSpread( WOOD );

		// builder.map( - 5 / 8, 5 / 8, 1 / 8, i => new BoxGeometry( 1 / 8, 1 / 32, 1 ).translate( i * 1.5, 0, 1 ) );

		const plank = ( length = 1 ) => Builder.colorize( new BoxGeometry( 1 / 8, 1 / 32, length ), color );

		builder.map( {
			start: - 5 / 8,
			step: 1 / 8,
			end: 5 / 8,
			handler: i => plank().translate( i * 1.5, 0, 1 )
		} );

		// Roof
		// for ( let x = - 1; x <= 1; x += 1 / 8 )
		// 	geometry.merge( new BoxGeometry( 1 / 8, 1 / 32, 1 ).translate( x, 0, 1 ) );

		// geometry.merge( new ParametricGeometry( ( a, b, v ) => v.set( a * width, b * length, Math.sin( a * Math.PI ) * height / 2 ), 5, 1 ).center().translate( 0, 0, 1 ) );

		super( geometry, material );

	}

}
