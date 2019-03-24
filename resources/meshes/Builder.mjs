
import {
	BoxGeometry,
	CylinderGeometry,
	Geometry,
	LatheGeometry,
	SphereGeometry,
	Vector3,
	Vector2
} from "../../node_modules/three/build/three.module.js";
import Randomizer from "./Randomizer.mjs";

const compose = arr => {

	if ( ! arr || arr.length === 0 ) return;

	if ( arr.length === 1 ) return arr[ 0 ];

	return val => {

		for ( let i = 0; i < arr.length; i ++ )
			val = arr[ i ]( val );

		return val;

	};

};

const IDENTITY = v => v;
const LEFT = new Vector2( - 1, 0 );

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

	cylinder( ...args ) {

		const cylinder = new Builder( new CylinderGeometry( ...args ), this );
		this.children.push( cylinder );

		return cylinder;

	}

	sphere( ...args ) {

		const sphere = new Builder( new SphereGeometry( ...args ), this );
		this.children.push( sphere );

		return sphere;

	}

	lathe( ...args ) {

		const lathe = new Builder( new LatheGeometry( ...args ), this );
		this.children.push( lathe );

		return lathe;

	}

	thickLathe( points, thickness = 1 / 32, direction = LEFT, ...rest ) {

		const adjustment = direction.clone().multiplyScalar( thickness );
		const allPoints = [
			...points,
			...[ ...points ].reverse().map( p => p.clone().add( adjustment ) ),
			points[ 0 ]
		];

		return this.lathe( allPoints, ...rest );

	}

	clone() {}

	// Transformations

	color( color, variation ) {

		this._color = color;
		if ( variation )
			if ( this._colorVariation ) this._colorVariation.push( variation );
			else this._colorVariation = [ variation ];

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

		this._position = this._position ? this._position.add( x, y, z ) : new Vector3( x, y, z );
		if ( variation )
			if ( this._positionVariation ) this._positionVariation.push( variation );
			else this._positionVariation = [ variation ];

		return this;

	}

	translateX( x ) {

		this._position = this._position ? this._position.add( x, 0, 0 ) : new Vector3( x, 0, 0 );
		return this;

	}

	translateY( y ) {

		this._position = this._position ? this._position.add( 0, y, 0 ) : new Vector3( 0, y, 0 );
		return this;

	}

	translateZ( z ) {

		if ( this._position ) this._position.z += z;
		else this._position = new Vector3( 0, 0, z );

		return this;

	}

	rotate( rotation = 0, y = 0, z = 0, variation ) {

		let x;
		if ( typeof rotation === "object" ) {

			variation = y;
			x = rotation.x || 0;
			y = rotation.y || 0;
			z = rotation.z || 0;

		} else x = rotation;

		this._rotation = this._rotation ? this._rotation.add( x, y, z ) : new Vector3( x, y, z );
		if ( variation )
			if ( this._rotationVariation ) this._rotationVariation.push( variation );
			else this._rotationVariation = [ variation ];

		return this;

	}

	rotateX( x ) {

		if ( this._rotation ) this._rotation.x += x;
		else this._rotation = new Vector3( x, 0, 0 );

		return this;

	}

	rotateY( y ) {

		if ( this._rotation ) this._rotation.y += y;
		else this._rotation = new Vector3( 0, y, 0 );

		return this;

	}

	rotateZ( z ) {

		if ( this._rotation ) this._rotation.z += z;
		else this._rotation = new Vector3( 0, 0, z );

		return this;

	}

	repeat( count, fn ) {

		const mid = ( count - 1 ) / 2;

		for ( let i = 0; i < count; i ++ )
			fn( this, i - mid, mid - Math.abs( i - mid ), mid, i, count );

		return this;

	}

	for( count, fn ) {

		const mid = ( count - 1 ) / 2;

		for ( let i = 0; i < count; i ++ )
			fn( this, i, count, i - mid, mid - Math.abs( i - mid ), mid, );

		return this;

	}

	map( fn, centered = true ) {

		const mid = ( this.children.length - 1 ) / 2;

		if ( centered )
			for ( let i = 0; i < this.children.length; i ++ )
				fn( this.children[ i ], i - mid, mid - Math.abs( i - mid ), mid, i, this.children.length );

		else
			for ( let i = 0; i < this.children.length; i ++ )
				fn( this.children[ i ], i, this.children.length, i - mid, mid - Math.abs( i - mid ), mid, );

		return this;

	}

	// Some random translation, rotation, and blurring
	randomize( props = {
		color: Randomizer.flatSpreader( 1 / 24 ),
		position: Randomizer.percentSpreader(),
		rotation: Randomizer.flatSpreader(),
		blur: 0.01
	} ) {

		let color, position, rotation, blur;
		if ( typeof props === "number" ) {

			color = Randomizer.flatSpreader( 1 / 24 * props );
			position = Randomizer.percentSpreader( 1 / 32 * props );
			rotation = Randomizer.flatSpreader( 1 / 16 * props );
			blur = 0.01 * props;

		} else ( { color, props, rotation, blur } = props );

		if ( color ) {

			if ( typeof color === "number" ) color = Randomizer.flatSpreader( color );
			if ( this._colorVariation ) this._colorVariation.push( color );
			else this._colorVariation = [ color ];

		}

		if ( position ) {

			if ( typeof position === "number" ) position = Randomizer.percentSpreader( position );
			if ( this._positionVariation ) this._positionVariation.push( position );
			else this._positionVariation = [ position ];

		}

		if ( rotation ) {

			if ( typeof rotation === "number" ) rotation = Randomizer.flatSpreader( rotation );
			if ( this._rotationVariation ) this._rotationVariation.push( rotation );
			else this._rotationVariation = [ rotation ];

		}

		return this.blur( blur );

	}

	blur( degree = 0.01 ) {

		this._blur = ( this._blur || 0 ) + degree;
		return this;

	}

	// Finalizers

	root() {

		let cur = this;
		while ( cur.parent ) cur = cur.parent;

		return cur;

	}

	geometry() {

		const geometry = this._geometry && this._geometry.clone() || new Geometry();

		for ( let i = 0; i < this.children.length; i ++ )
			geometry.merge( this.children[ i ].geometry() );

		if ( this._color )
			Randomizer.colorize( geometry, this._color, compose( this._colorVaration ) || IDENTITY );

		if ( this._rotation || this._rotationVariation )
			Randomizer.rotate( geometry, this._rotation, compose( this._rotationVariation ) || IDENTITY );

		if ( this._position || this._positionVariation )
			Randomizer.translate( geometry, this._position, compose( this._positionVariation ) || IDENTITY );

		if ( this._blur )
			Randomizer.blur( geometry, this._blur );

		return geometry;

	}

}
