
// From https://github.com/ChiefOfGxBxL/WC3MapTranslator/blob/master/lib/W3Buffer.js

export default {
	wrap: buffer => {

		let offset = 0; // current offset, in bytes
		return {

			readInt() {

				const int = buffer.readInt32LE( offset );
				offset += 4;
				return int;

			},

			readShort() {

				const short = buffer.readInt16LE( offset );
				offset += 2;
				return short;

			},

			readFlags() {

				const rawFlags = buffer.readUInt8( offset, 1 );
				const flags = [];
				for ( let i = 0; i < 8; i ++ )
					flags.push( !! ( rawFlags & 1 << i ) );

				offset += 1;
				return rawFlags;

			},

			readFloat() {

				const float = buffer.readFloatLE( offset );
				offset += 4;
				return float;

			},

			readString() {

				const string = [];

				while ( buffer[ offset ] !== 0x00 ) {

					string.push( buffer[ offset ] );
					offset += 1;

				}

				offset += 1; // consume the \0 end-of-string delimiter

				return string.map( ch => String.fromCharCode( ch ) ).join( "" );

			},

			readChars( len ) {

				const string = [],
					numCharsToRead = len || 1;

				for ( let i = 0; i < numCharsToRead; i ++ ) {

					string.push( buffer[ offset ] );
					offset += 1;

				}

				return string.map( ch => {

					if ( ch === 0x0 ) return "0";
					return String.fromCharCode( ch );

				} ).join( "" );

			},

			readByte() {

				const byte = buffer[ offset ];
				offset += 1;
				return byte;

			}

		};

	}

};
