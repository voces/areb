
// http://www.wc3c.net/showthread.php?t=937

import BufferUtils from "./BufferUtils.mjs";

const readTiles = reader => {

	const length = reader.readInt();
	return Array( length ).fill().map( () => reader.readChars( 4 ) );

};

const w3eIndexToEbIndex = ( width, height, index ) =>
	( height - Math.floor( index / width ) - 1 ) * width + index % width;

export default w3eBuffer => {

	const reader = BufferUtils.wrap( w3eBuffer );

	// header: W3E!
	reader.readChars( 4 );

	// version: 11
	reader.readInt();

	const tileset = reader.readChars( 1 );

	const isUsingCustomTileset = !! reader.readInt();

	const groundTiles = readTiles( reader );

	const cliffTiles = readTiles( reader );

	const width = reader.readInt();
	const height = reader.readInt();

	const center = {
		x: reader.readFloat(),
		y: reader.readFloat()
	};

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
