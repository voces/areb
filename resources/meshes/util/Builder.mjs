
import {
	BoxGeometry,
	ConeGeometry,
	CylinderGeometry,
	Geometry,
	LatheGeometry,
	OctahedronGeometry,
	SphereGeometry,
	TetrahedronGeometry,
	TubeGeometry,
	Vector3,
	Vector2
} from "../../../node_modules/three/build/three.module.js";
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

	group() {

		const group = new Builder( undefined, this );
		this.children.push( group );

		return group;

	}

	box( ...args ) {

		const box = new Builder( new BoxGeometry( ...args ), this );
		this.children.push( box );

		return box;

	}

	cone( ...args ) {

		const cone = new Builder( new ConeGeometry( ...args ), this );
		this.children.push( cone );

		return cone;

	}

	cylinder( ...args ) {

		const cylinder = new Builder( new CylinderGeometry( ...args ), this );
		this.children.push( cylinder );

		return cylinder;

	}

	octahedron( ...args ) {

		const octahedron = new Builder( new OctahedronGeometry( ...args ), this );
		this.children.push( octahedron );

		return octahedron;

	}

	sphere( ...args ) {

		const sphere = new Builder( new SphereGeometry( ...args ), this );
		this.children.push( sphere );

		return sphere;

	}

	tetrahedron( ...args ) {

		const tetrahedron = new Builder( new TetrahedronGeometry( ...args ), this );
		this.children.push( tetrahedron );

		return tetrahedron;

	}

	tube( ...args ) {

		const tube = new Builder( new TubeGeometry( ...args ), this );
		this.children.push( tube );

		return tube;

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

		if ( typeof position === "object" ) {

			variation = typeof y === "function" ? y : undefined;
			position.x = position.x || 0;
			position.y = position.y || 0;
			position.z = position.z || 0;

		} else position = new Vector3( position || 0, y || 0, z || 0 );

		this._position = this._position ? this._position.add( position ) : position;
		if ( variation )
			if ( this._positionVariation ) this._positionVariation.push( variation );
			else this._positionVariation = [ variation ];

		return this;

	}

	translateX( x ) {

		if ( this._position ) this._position.x += x;
		else this._position = new Vector3( x, 0, 0 );
		return this;

	}

	translateY( y ) {

		if ( this._position ) this._position.y += y;
		else this._position = new Vector3( 0, y, 0 );
		return this;

	}

	translateZ( z ) {

		if ( this._position ) this._position.z += z;
		else this._position = new Vector3( 0, 0, z );

		return this;

	}

	rotate( rotation, y = 0, z = 0, variation ) {

		let x;
		if ( typeof rotation === "object" ) {

			variation = typeof y === "function" ? y : undefined;
			if ( rotation instanceof Vector3 ) {

				rotation.x = x || 0;
				rotation.y = y || 0;
				rotation.z = z || 0;

			} else rotation = new Vector3( rotation.x || 0, rotation.y || 0, rotation.z || 0 );

		} else rotation = new Vector3( x || 0, y || 0, z || 0 );

		this._rotation = this._rotation ? this._rotation.add( rotation ) : rotation;
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

	scale( scale = 1, y = 1, z = 1, variation ) {

		let x;
		if ( typeof rotation === "object" ) {

			variation = typeof y === "function" ? y : undefined;
			x = scale.x || 1;
			y = scale.y || 1;
			z = scale.z || 1;

		} else x = scale;

		if ( this._scale ) this._scale.multiply( { x, y, z } );
		else this._scale = new Vector3( x, y, z );

		if ( variation )
			if ( this._scaleVariation ) this._scaleVariation.push( variation );
			else this._scaleVariation = [ variation ];

		return this;

	}

	scaleX( x ) {

		if ( this._scale ) this._scale.x += x;
		else this._scale = new Vector3( x, 0, 0 );

		return this;

	}

	scaleY( y ) {

		if ( this._scale ) this._scale.y += y;
		else this._scale = new Vector3( 0, y, 0 );

		return this;

	}

	scaleZ( z ) {

		if ( this._scale ) this._scale.z += z;
		else this._scale = new Vector3( 0, 0, z );

		return this;

	}

	// Some random translation, rotation, and blurring
	randomize( props = {
		color: Randomizer.flatSpreader( 1 / 24 ),
		position: Randomizer.percentSpreader(),
		rotation: Randomizer.flatSpreader(),
		scale: Randomizer.percentSpreader(),
		blur: 0.01
	} ) {

		let color, position, rotation, scale, blur;
		if ( typeof props === "number" ) {

			color = Randomizer.flatSpreader( 1 / 24 * props );
			position = Randomizer.percentSpreader( 1 / 32 * props );
			rotation = Randomizer.flatSpreader( 1 / 16 * props );
			blur = 0.01 * props;

		} else ( { color, props, rotation, scale, blur } = props );

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

		if ( scale ) {

			if ( typeof scale === "number" ) scale = Randomizer.percentSpreader( scale );
			if ( this._scaleVariation ) this._scaleVariation.push( scale );
			else this._scaleVariation = [ scale ];

		}

		return this.blur( blur );

	}

	blur( degree = 0.01 ) {

		this._blur = ( this._blur || 0 ) + degree;
		return this;

	}

	// Finalizers

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

	do( fn ) {

		fn( this );
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

	add( builder ) {

		this.children.push( builder );
		return this;

	}

	root() {

		let cur = this;
		while ( cur.parent ) cur = cur.parent;

		return cur;

	}

	geometry() {

		const geometry = this._geometry ? this._geometry.clone() : new Geometry();

		for ( let i = 0; i < this.children.length; i ++ )
			geometry.merge( this.children[ i ].geometry() );

		if ( this._color )
			Randomizer.colorize( geometry, this._color, compose( this._colorVaration ) || IDENTITY );

		if ( this._rotation || this._rotationVariation )
			Randomizer.rotate( geometry, this._rotation, compose( this._rotationVariation ) || IDENTITY );

		if ( this._position || this._positionVariation )
			Randomizer.translate( geometry, this._position, compose( this._positionVariation ) || IDENTITY );

		if ( this._scale || this._scaleVariation )
			Randomizer.scale( geometry, this._scale, compose( this._scaleVariation ) || IDENTITY );

		if ( this._blur )
			Randomizer.blur( geometry, this._blur );

		return geometry;

	}

}
