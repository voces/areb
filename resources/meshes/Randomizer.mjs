
import { Color } from "../../node_modules/three/build/three.module.js";

export default class Randomizer {

	constructor( geometry, builder ) {

		this.geometry = geometry;
		this.builder = builder;

	}

	static flatSpread( value = 0, spread = 1 / 16 ) {

		return value + ( Math.random() - 0.5 ) * 2 * spread;

	}

	static flatSpreader( spread = 1 / 16 ) {

		return v => v + ( Math.random() - 0.5 ) * 2 * spread;

	}

	static percentSpread( value, spread = 1 / 32 ) {

		return value * ( 1 + ( Math.random() - 0.5 ) * 2 * spread );

	}

	static percentSpreader( spread = 1 / 32 ) {

		return v => v * ( 1 + ( Math.random() - 0.5 ) * 2 * spread );

	}

	static spread( value, flat = 1 / 16, percent = 1 / 32 ) {

		return ( value +
			( Math.random() - 0.5 ) * 2 * flat ) *
			( 1 + ( Math.random() - 0.5 ) * 2 * percent );

	}

	static spreader( flat = 1 / 16, percent = 1 / 32 ) {

		return v => (
			// Base
			v +
			// Flat
			( Math.random() - 0.5 ) * 2 * flat ) *
			// Percent
			( 1 + ( Math.random() - 0.5 ) * 2 * percent );

	}

	static colorSpread( color, variation = this.flatSpreader( 1 / 32 ) ) {

		return new Color( variation( color.r ), variation( color.g ), variation( color.b ) );

	}

	static colorize( geometry, color, variation ) {

		// Shift the entire geometry
		color = this.colorSpread( color, variation );

		for ( let i = 0; i < geometry.faces.length; i ++ )
			geometry.faces[ i ].color = this.colorSpread( color, variation );

		return geometry;

	}

	colorize( color, variation ) {

		this.constructor.colorize( this.geometry, color, variation );
		return this;

	}

	// Nudges the entire geometry
	static translate( geometry, position = {}, variation = this.spreader() ) {

		return geometry.translate(
			variation( position.x || 0 ),
			variation( position.y || 0 ),
			variation( position.z || 0 )
		);

	}

	translate( position, variation ) {

		this.constructor.translate( this.geometry, position, variation );
		return this;

	}

	static blur( geometry, degree = 0.01 ) {

		geometry.computeBoundingBox();

		for ( let i = 0; i < geometry.vertices.length; i ++ ) {

			geometry.vertices[ i ].x = this.flatSpread(
				geometry.vertices[ i ].x,
				( geometry.boundingBox.max.x - geometry.boundingBox.min.x ) * degree
			);
			geometry.vertices[ i ].y = this.flatSpread(
				geometry.vertices[ i ].y,
				( geometry.boundingBox.max.y - geometry.boundingBox.min.y ) * degree
			);
			geometry.vertices[ i ].z = this.flatSpread(
				geometry.vertices[ i ].z,
				( geometry.boundingBox.max.z - geometry.boundingBox.min.z ) * degree
			);

		}

		return geometry;

	}

	blur( variation ) {

		this.constructor.blur( this.geometry, variation );
		return this;

	}

	// Rotates the entire geometry
	static rotate( geometry, rotation = {}, variation = this.spread() ) {

		Object.entries( rotation ).filter( ( [ key ] ) => "xyz".includes( key ) ).forEach( ( [ axis, value ] ) =>
			geometry[ `rotate${axis.toUpperCase()}` ]( variation( value ) ) );

		return geometry;

	}

	rotate( rotation, variation ) {

		this.constructor.rotate( this.geometry, rotation, variation );
		return this;

	}

	static randomize( geometry, { colorize, translate, blur, rotate } = {} ) {

		if ( colorize ) this.colorize( geometry, colorize.color, colorize.variation );
		if ( translate ) this.translate( geometry, translate.position, translate.variation );
		if ( blur ) this.blur( geometry, blur );
		if ( rotate ) this.rotate( geometry, rotate.rotation, rotate.variation );

		return this;

	}

}
