
export default class NDArray {

	constructor() {

		this._root = [];
		this.length = 0;

	}

	get( ...indicies ) {

		let cur = this._root;
		let i = 0;
		for ( ; i < indicies.length && cur; i ++ )
			cur = cur[ indicies[ i ] ];

		if ( i !== indicies.length ) return undefined;
		return cur;

	}

	set( value, ...indicies ) {

		let cur = this._root;
		for ( let i = 0; i < indicies.length - 1; i ++ ) {

			if ( ! cur[ indicies[ i ] ] ) cur[ indicies[ i ] ] = [];
			cur = cur[ indicies[ i ] ];

		}

		this.length ++;

		return cur[ indicies[ indicies.length - 1 ] ] = value;

	}

	getOrSet( cb, ...indicies ) {

		let cur = this._root;
		for ( let i = 0; i < indicies.length - 1; i ++ ) {

			if ( ! cur[ indicies[ i ] ] ) cur[ indicies[ i ] ] = [];
			cur = cur[ indicies[ i ] ];

		}

		if ( indicies[ indicies.length - 1 ] in cur )
			return cur[ indicies[ indicies.length - 1 ] ];

		this.length ++;

		return cur[ indicies[ indicies.length - 1 ] ] = cb();

	}

}
