
// http://www.wc3c.net/showthread.php?t=937

import BufferUtils from "./BufferUtils.mjs";

const readTiles = reader => {

	const length = reader.readInt32();
	console.log( { length } );
	if ( length > 16 )
		throw new Error( `bad length (${length})!` );

	const tiles = Array( length ).fill().map( () => reader.readChars( 4 ) );
	console.log( { tiles } );
	return tiles;

};

const w3eIndexToEbIndex = ( width, height, index ) =>
	( height - Math.floor( index / width ) - 1 ) * width + index % width;

export default reader => {

	// const reader = BufferUtils.wrap( w3eBuffer );

	// header: W3E!
	console.log( reader.readChars( 4 ) );

	// version: 11
	console.log( reader.readUint8() );

	const tileset = reader.readChar();

	const isUsingCustomTileset = !! reader.readInt16();
	console.log( { isUsingCustomTileset } );

	const groundTiles = readTiles( reader );

	const cliffTiles = readTiles( reader );

	const width = reader.readInt();
	const height = reader.readInt();

	const center = {
		x: reader.readFloat(),
		y: reader.readFloat()
	};
	console.log( { tileset, isUsingCustomTileset, groundTiles, cliffTiles, width, height, center } );
	const length = width * height;
	const data = [];
	for ( let i = 0; i < length; i ++ ) {

		const height = reader.readShort();
		const waterAndBoundary = reader.readShort();
		const flagsAndGroundTexture = reader.readFlags();
		const textureDetails = reader.readByte();
		const cliffTextureAndLayerHeight = reader.readByte();

		const tile = {
			height,
			boundary: 1 / waterAndBoundary < 0,
			water: Math.abs( waterAndBoundary ),
			flags: flagsAndGroundTexture >> 4,
			groundTextureType: flagsAndGroundTexture & 0xF,
			textureDetails,
			cliffTexture: cliffTextureAndLayerHeight >> 4,
			layerHeight: cliffTextureAndLayerHeight & 0xF
		};

		tile.finalHeight = ( tile.height - 0x2000 + ( tile.layerHeight - 2 ) * 0x0200 ) / 4;

		data.push( tile );

	}

	const cliffmap = [];
	for ( let i = 0; i < data.length; i ++ )
		cliffmap[ w3eIndexToEbIndex( width, height, i ) ] = data[ i ].finalHeight;

	return { cliffmap };

};
