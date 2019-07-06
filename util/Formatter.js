
export default class Formatter {

	static pascal( string ) {

		return new Formatter( string ).pascal;

	}

	constructor( string ) {

		this.string = string;

	}

	// "(1) Booty Bay v1.12" -> "Booty Bay v1 12"
	get identifier() {

		const match = name.match( /[a-zA-Z].*/ );
		if ( ! match )
			throw new Error( `Cannot make '${this.string}' an identifier` );
		const identifier = match[ 0 ]
			.replace( /[^0-9A-Za-z-._ ]/g, "" )
			.replace( /[-._]/g, " " );

		return new Formatter( identifier );

	}

	get alpha() {

		return new Formatter( this.string.replace( /[^A-Za-z]/g, "" ) );

	}

	get alphaNumeric() {

		return new Formatter( this.string.replace( /[^A-Za-z0-9]/g, "" ) );

	}

	get alphaPrefix() {

		return new Formatter( this.string.replace( /^[^A-Za-z]+/, "" ) );

	}

	clean( regex ) {

		return new Formatter( this.string.replace( regex, "" ) );

	}

	get isWords() {

		return Array.isArray( this.string );

	}

	get words() {

		return new Formatter( this.string.split( " " ) );

	}

	get hyphen() {

		if ( ! this.isWords ) return this.words.hyphen;
		return this.string
			.map( word => word.toLowerCase() )
			.join( "-" );

	}

	get pascal() {

		if ( ! this.isWords ) return this.words.pascal;
		return this.string
			.map( word => word[ 0 ].toUpperCase() + word.slice( 1 ) )
			.join( "" );

	}

	get camel() {

		const pascal = this.pascal;
		return pascal[ 0 ].toLowerCase() + pascal.slice( 1 );

	}

	toString() {

		return this.string;

	}

}
