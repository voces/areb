
const gets = [
	"getInt8",
	"getUint8",
	"getInt16",
	"getUint16",
	"getInt32",
	"getUint32",
	"getFloat32",
	"getFloat64",
	"getBigInt64",
	"getBigUint64"
];

export default class DataReader {

	constructor( dataView ) {

		this.dataView = dataView;
		this.offset = 0;

	}

	readInt8() {

		const value = this.dataView.getInt8( this.offset );
		this.offset ++;
		return value;

	}

	readUint8() {

		const value = this.dataView.getUint8( this.offset );
		this.offset ++;
		return value;

	}

	readInt16() {

		const value = this.dataView.getInt16( this.offset, true );
		this.offset += 2;
		return value;

	}

	readUint16() {

		const value = this.dataView.getUint16( this.offset, true );
		this.offset += 2;
		return value;

	}

	readInt32() {

		const value = this.dataView.getInt32( this.offset, true );
		this.offset += 4;
		return value;

	}

	readUint32() {

		const value = this.dataView.getUint32( this.offset, true );
		this.offset += 4;
		return value;

	}

	readBigInt64() {

		const value = this.dataView.getBigInt64( this.offset, true );
		this.offset += 8;
		return value;

	}

	readBigUint64() {

		const value = this.dataView.getBigUint64( this.offset, true );
		this.offset += 8;
		return value;

	}

	readFloat32() {

		const value = this.dataView.getFloat32( this.offset );
		this.offset += 4;
		return value;

	}

	readFloat64() {

		const value = this.dataView.getFloat64( this.offset );
		this.offset += 8;
		return value;

	}

	readChar() {

		return String.fromCharCode( this.readUint8() );

	}

	readChars( length ) {

		console.log( "readChars", length );
		return Array( length ).fill().map( () => this.readChar() ).join( "" );

	}

	readBits() {

		const rawBits = this.readUint8( this.offset );

		const bits = [];
		for ( let i = 0; i < 8; i ++ )
			bits.push( !! ( rawBits & 1 << i ) );

		return bits;

	}

}
