
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

		return Array( length ).fill().map( () => this.readChar() ).join( "" );

	}

	// WC3-style short, where it's 2 bytes, except first byte is a flag and second is the sign...
	readShort() {

		const value = this.readUint16();

		// Returns a number between -16384 and 16383 and a boolean
		const unsignedShortComponent = value & 0x3FFF;
		const signedShortComponent = value & 0x4000 ? unsignedShortComponent * - 1 - 1 : unsignedShortComponent;
		return [ signedShortComponent, !! ( value & 0x8000 ) ];

	}

	readBits() {

		const rawBits = this.readUint8( this.offset );

		const bits = [];
		for ( let i = 0; i < 8; i ++ )
			bits.push( !! ( rawBits & 1 << i ) );

		return bits;

	}

	readNibbles() {

		const value = this.readUint8();
		return [ value >> 4, value & 0xF ];

	}

}
