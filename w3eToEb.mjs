
// http://www.wc3c.net/showthread.php?t=937
// Ldrt", "Ldro", "Ldrg", "Lrok", "Lgrs", "Lgrd"
const tileMap = {
	Ldrt: { name: "Lordaeron Dirt", color: "#474632" },
	Ldro: { name: "Lrodaeron Rough Dirt", color: "#835931" },
	Ldrg: { name: "Lrodaeron Grassy Dirt", color: "#2b3c1f" },
	Lrok: { name: "Lrodaeron Rock", color: "#876b62" },
	Lgrs: { name: "Lrodaeron Grass", color: "#0c4013" },
	Lgrd: { name: "Lrodaeron Dark Grass", color: "#043609" },
	Watr: { name: "Water", color: "#567ebf" },
	Bdry: { name: "Boundary", color: "#000000" },
	Blgt: { name: "Blight", color: "#564725" }
};

const BOUNDARY_FLAG = 0b1000;
const WATER_FLAG = 0b0100;
const BLIGHT_FLAG = 0b010;
const RAMP_FLAG = 0b0001;

const readTiles = reader => {

	const length = reader.readUint32();
	if ( length > 16 )
		throw new Error( `bad length (${length})!` );

	const tiles = Array( length ).fill().map( () => reader.readChars( 4 ) );
	return tiles;

};

const isRamp = ( flagmap, cliffmap, x, y ) =>
	// WC3 ramps should be surrounded
	flagmap[ y ][ x ].ramp &&
	flagmap[ y - 1 ][ x ].ramp &&
	flagmap[ y + 1 ][ x ].ramp &&
	flagmap[ y ][ x - 1 ].ramp &&
	flagmap[ y ][ x + 1 ].ramp;

const w3eIndexToEbIndex = ( width, height, index ) =>
	( height - Math.floor( index / width ) - 1 ) * width + index % width;

export default reader => {

	// const reader = BufferUtils.wrap( w3eBuffer );

	// header: W3E!
	reader.readChars( 4 );

	// version: 11
	reader.readUint32();

	const tileset = reader.readChar();

	const isUsingCustomTileset = !! reader.readInt32();

	const groundTiles = readTiles( reader );
	const cliffTiles = readTiles( reader );

	const tileTypes = [
		...groundTiles.map( code => tileMap[ code ] || tileMap.Ldrt ),
		tileMap.Watr,
		tileMap.Blgt,
		tileMap.Bdry
	];
	// const waterIndex = tileTypes.length - 3;
	// const blightIndex = tileTypes.length - 2;
	const boundaryIndex = tileTypes.length - 1;

	const width = reader.readInt32();
	const height = reader.readInt32();

	const center = {
		x: reader.readFloat32(),
		y: reader.readFloat32()
	};

	const length = width * height;
	const data = [];
	for ( let i = 0; i < length; i ++ ) {

		const [ height ] = reader.readShort();
		const [ water, boundary ] = reader.readShort();
		const [ flags, groundTextureType ] = reader.readNibbles();
		const textureDetails = reader.readUint8();
		const [ cliffTexture, layerHeight ] = reader.readNibbles();

		const tile = {
			height,
			boundary,
			water,
			flags,
			groundTextureType,
			textureDetails,
			cliffTexture,
			layerHeight
		};

		tile.finalHeight = ( tile.height - 0x2000 + ( tile.layerHeight - 2 ) * 0x0200 ) / 4;

		data.push( tile );

	}

	const rawCliffmap = [];
	const rawTilemap = [];
	const rawFlagmap = [];
	for ( let i = 0; i < data.length; i ++ ) {

		const index = w3eIndexToEbIndex( width, height, i );

		rawCliffmap[ index ] = data[ i ].layerHeight;

		rawTilemap[ index ] =
			data[ i ].flags & BOUNDARY_FLAG && boundaryIndex ||
			// data[ i ].flags & WATER_FLAG && waterIndex ||
			// data[ i ].flags & BLIGHT_FLAG && blightIndex ||
			data[ i ].groundTextureType;

		rawFlagmap[ index ] = {
			boundary: ( data[ i ].flags & BOUNDARY_FLAG ) > 0,
			water: ( data[ i ].flags & WATER_FLAG ) > 0,
			blight: ( data[ i ].flags & BLIGHT_FLAG ) > 0,
			ramp: ( data[ i ].flags & RAMP_FLAG ) > 0
		};

	}
	const tilemap = Array( height ).fill().map( ( _, y ) => rawTilemap.slice( y * width, ( y + 1 ) * width - 1 ) );
	const flagmap = Array( height ).fill().map( ( _, y ) => rawFlagmap.slice( y * width, ( y + 1 ) * width - 1 ) );
	const cliffmap = Array( height ).fill().map( ( _, y ) => rawCliffmap.slice( y * width, ( y + 1 ) * width - 1 ) )
		.map( ( rows, y, cliffmap ) => rows.map( ( height, x ) => isRamp( flagmap, cliffmap, x, y ) ? "r" : height - 4 ) );

	return { tileset, isUsingCustomTileset, groundTiles, cliffTiles, width, height, center, cliffmap, tilemap, tileTypes, flagmap, data };

};
