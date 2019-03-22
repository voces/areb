
import Randomier from "./Randomizer.mjs";
import { memoize } from "../../util.mjs";

const incrementer = memoize( step => v => v + step );

export default class Builder {

	constructor( geometry, randomizer = new Randomier( geometry, this ) ) {

		this.geometry = geometry;
		this.randomizer = randomizer;

	}

	static colorize( geometry, color ) {

		for ( let i = 0; i < geometry.faces.length; i ++ )
			geometry.faces[ i ].color = color;

		return geometry;

	}

	colorize( color ) {

		this.constructor.colorize( this.geometry, color );
		return this;

	}

	// Nudges the entire geometry
	static translate( geometry, position ) {

		return geometry.position = position;

	}

	translate( position ) {

		this.constructor.translate( this.geometry, position ).center();
		return this;

	}

	// Rotates the entire geometry
	static rotate( geometry, rotation = {} ) {

		return geometry.rotate( rotation );

	}

	rotate( rotation ) {

		this.constructor.rotate( this.geometry, rotation );
		return this;

	}

	static randomize( geometry, { colorize, translate, blur, rotate } = {} ) {

		if ( colorize ) this.randomizer.colorize( geometry, colorize.color, colorize.variation );
		if ( translate ) this.randomizer.translate( geometry, translate.position, translate.variation );
		if ( blur ) this.randomizer.blur( geometry, blur );
		if ( rotate ) this.randomizer.rotate( geometry, rotate.rotation, rotate.variation );

		return this;

	}

	apply( geometry, { colorize, translate, rotate } = {} ) {

		if ( colorize ) this.randomizer.colorize( geometry, colorize.color, colorize.variation );
		if ( translate ) this.randomizer.translate( geometry, translate.position, translate.variation );
		if ( rotate ) this.randomizer.rotate( geometry, rotate.rotation, rotate.variation );

	}

	merge( geometry ) {

		this.geometry.merge( geometry );
		return this;

	}

	map( { start, end, step, count, handler } ) {

		// Simple counter
		if ( count )
			for ( let i = 0; i < count; i ++ )
				this.apply.merge( handler( i ) );

		// Complex stepper
		else {

			if ( typeof step === "number" ) step = incrementer( step );

			let cur = start;
			while ( cur <= end ) {

				this.merge( handler( cur ) );
				cur = step( cur );

			}

		}

		return this;

	}

}
