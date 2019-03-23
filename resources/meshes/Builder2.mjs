
import {
	BoxGeometry,
	Geometry,
	Vector3
} from "../../node_modules/three/build/three.module.js";
import Randomizer from "./Randomizer.mjs";

const compose = arr => {

	if ( arr.length === 0 ) return;

	if ( arr.length === 1 ) return arr[ 0 ];

	return val => {

		for ( let i = 0; i < arr.length; i ++ )
			val = arr[ i ]( val );

		return val;

	};

};

const IDENTITY = v => v;

export default class Builder {

	constructor( geometry, parent ) {

		this._geometry = geometry;
		this.parent = parent;
		this.children = [];

	}

	// Child builders

	box( ...args ) {

		const box = new Builder( new BoxGeometry( ...args ), this );
		this.children.push( box );

		return box;

	}

	clone() {}

	// Transformations

	color( color, variation ) {

		this._color = color;
		this._colorVaration = variation;

		return this;

	}

	translate( position, y = 0, z = 0, variation ) {

		let x;
		if ( typeof position === "object" ) {

			variation = typeof y === "function" ? y : undefined;
			x = position.x || 0;
			y = position.y || 0;
			z = position.z || 0;

		} else x = position || 0;

		this._posiion = this._posiion ? this._posiion.add( x, y, z ) : new Vector3( x, y, z );
		if ( this._posiionVariation ) this._posiionVariation.push( variation );
		else this._posiionVariation = [ variation ];

		return this;

	}

	rotate( rotation, y, z, variation ) {

		let x;
		if ( typeof rotation === "object" ) {

			variation = y;
			x = rotation.x || 0;
			y = rotation.y || 0;
			z = rotation.z || 0;

		} else x = rotation;

		this._rotation = this._rotation ? this._rotation.add( x, y, z ) : new Vector3( x, y, z );
		if ( this._rotationVariation ) this._rotationVariation.push( variation );
		else this._rotationVariation = [ variation ];

		return this;

	}

	spread( flat, percent ) {

		if ( typeof flat === "number" )
			this._flatSpread = ( this._flatSpread || 0 ) + flat;
		this._percentSpread = ( this._percentSpread || 0 ) + percent;

	}

	// Finalizers

	root() {

		let cur = this;
		while ( cur.parent ) cur = cur.parent;

		return cur;

	}

	geometry() {

		console.log( this );

		const geometry = this._geometry && this._geometry.clone() || new Geometry();

		for ( let i = 0; i < this.children.length; i ++ )
			geometry.merge( this.children[ i ].geometry() );

		if ( this._color )
			Randomizer.colorize( geometry, this._color, this._colorVaration );

		if ( this._posiion || this._posiionVariation )
			Randomizer.translate( geometry, this._posiion, compose( this._posiionVariation ) );

		if ( this._rotation || this._rotationVariation )
			Randomizer.rotate( geometry, this._rotation, compose( this._rotationVariation ) );

		return geometry;

	}

}
