
import {
	Mesh,
	MeshPhongMaterial,
	FaceColors
} from "../../node_modules/three/build/three.module.js";
import { WOOD } from "../colors.mjs";
import Builder from "./util/Builder.mjs";
import Randomizer from "./util/Randomizer.mjs";

export default class Barn extends Mesh {

	constructor() {

		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );
		const color = Randomizer.colorSpread( WOOD );
		const paneling = color.clone();
		const roof = color.clone().offsetHSL( 0, - 0.05, 0.05 );
		const door = color.clone().offsetHSL( 0, 0.1, - 0.1 );

		const length = 15;
		const width = 11;
		const thickness = 1 / 32;

		const geometry = new Builder()
			// Front and back
			.repeat( 2, ( b, y ) => b.repeat( width, ( b, x, _0, mid ) => {

				const angle = Math.acos( x / mid );
				const height = 1 / 2 + Math.sin( angle ) * 8 / length;
				return b.box( 1 / 8, thickness, height )
					.translate( x / 8, y * length / 8, height / 2 )
					.color( paneling )
					.randomize( 1 / 2 );

			} ) )
			// Sides
			.repeat( 2, ( b, x ) => b.repeat( length, ( b, y ) =>
				b.box( thickness, 1 / 8, 1 / 2 )
					.translate( x * width / 8, y / 8, 1 / 4 )
					.color( paneling )
					.randomize() ) )
			// Top
			.repeat( width, ( b, x, _0, mid ) => b.repeat( length + 1, ( b, y ) =>{

				const width = Math.PI / 2 * x / mid;
				return b.box( thickness, 1 / 8, ( 1 / 8 + thickness ) * Math.PI / 2 )
					.translate(
						Math.sin( width ) * ( ( mid + 0.5 ) / 8 + thickness ),
						y / 8,
						1 / 4 + 2 * thickness + Math.abs( Math.cos( width ) * ( ( mid + 0.5 ) / 8 + thickness ) ) )
					.rotateY( - Math.acos( Math.sin( width ) ) )
					.color( roof )
					.randomize();

			} ) )
			// Door
			.box( 1 / 2, thickness, 3 / 4 ).translate( 0, - length / 2 / 8 - thickness / 2, 3 / 8 ).color( door ).randomize().parent
			.rotateZ( - Math.PI / 4 )
			.geometry();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
