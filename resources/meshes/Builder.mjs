
import Randomier from "./Randomizer.mjs";

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
	static lookAt( geometry, rotation = {} ) {

		return geometry.lookAt( rotation );

	}

	lookAt( rotation ) {

		this.constructor.lookAt( this.geometry, rotation );
		return this;

	}

	static randomize( geometry, { colorize, translate, blur, lookAt } = {} ) {

		if ( colorize ) this.randomizer.colorize( geometry, colorize.color, colorize.variation );
		if ( translate ) this.randomizer.translate( geometry, translate.position, translate.variation );
		if ( blur ) this.randomizer.blur( geometry, blur );
		if ( lookAt ) this.randomizer.lookAt( geometry, lookAt.rotation, lookAt.variation );

		return this;

	}

}
