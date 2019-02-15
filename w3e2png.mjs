
// http://www.wc3c.net/showthread.php?t=937

import pngjs from "pngjs";

import BufferUtils from "./BufferUtils.mjs";

const PNG = pngjs.PNG;

const tilesetNames = {
	A: "Ashenvale",
	B: "Barrens",
	F: "Lordaeron Fall",
	L: "Lordaeron Summer",
	N: "Northrend",
	V: "Village",
	W: "Lordaeron Winter",
	X: "City Dalaran",
	Y: "City Lordaeron"
};

const readTiles = reader => {

	const length = reader.readInt();
	return Array( length ).fill().map( () => reader.readChars( 4 ) );

};

const warIndexToPngIndex = ( width, height, index ) =>
	( ( height - Math.floor( index / width ) - 1 ) * width + index % width ) * 4;
const pngIndexToWarIndex = ( width, height, index ) =>
	( height - Math.floor( Math.floor( index / 4 ) / width ) ) * width + Math.floor( index / 4 ) % width;

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

	let min = Infinity;
	let max = - Infinity;
	for ( let i = 0; i < data.length; i ++ ) {

		if ( min > data[ i ].finalHeight ) min = data[ i ].finalHeight;
		if ( max < data[ i ].finalHeight ) max = data[ i ].finalHeight;

	}
	const ratio = max - min;

	const png = new PNG( { width, height, colorType: 2 } );
	for ( let i = 0; i < data.length; i ++ ) {

		const value = Math.floor( ( data[ i ].finalHeight - min ) / ratio * 256 );
		const index = warIndexToPngIndex( width, height, i );

		if ( index < 161 * 4 + 1 ) console.log( i );

		png.data[ index ] = value;
		png.data[ index + 1 ] = value;
		png.data[ index + 2 ] = data[ i ].flags ? Math.min( value * 1.5 + 16, 255 ) : value;
		png.data[ index + 3 ] = 255;

	}

	return png;

};
