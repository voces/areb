
import { Geometry, Mesh, MeshPhongMaterial, FaceColors, Vector3, Face3, Color } from "./node_modules/three/build/three.module.js";
import { memoize } from "./util.mjs";
// https://github.com/mrdoob/three.js/blob/master/examples/js/objects/Water2.js

const memoizedColor = memoize( hex => new Color( hex ) );

const empty2d = val => {

	const innerProxy = new Proxy( {}, { get: () => val } );
	const outerProxy = new Proxy( {}, { get: () => innerProxy } );
	return outerProxy;

};

export default class Terrain {

	constructor( {
		cliffmap,
		tilemap = empty2d( 0 ),
		tileTypes = [ { name: "Grass", color: "#608038" } ],
		flagmap = empty2d( {} ),
		heightmap = empty2d( 0 )
	} ) {

		this._zHeight = memoize( this._zHeight );

		this._cliffmap = cliffmap;
		this._heightmap = heightmap;

		const height = cliffmap.length - 1;
		const width = Math.min( ...cliffmap.map( row => row.length ) ) - 1;

		this.dimensions = { width, height };

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		const waterGeometry = new Geometry();
		const waterMaterial = new MeshPhongMaterial( {
			color: 0x0077be,
			flatShading: true,
			opacity: 0.25,
			transparent: true
		} );

		function color( x, y ) {

			try {

				const hex = tileTypes[ tilemap[ y ][ x ] ].color.toUpperCase();
				return memoizedColor( hex );

			} catch ( err ) {

				throw new Error( `Tile ( ${x}, ${y} ) uses undefined color ${tilemap[ y ][ x ]}.` );

			}

		}
		color.colors = {};

		const rampWalls = [];

		for ( let y = height; y >= 0; y -- )
			for ( let x = 0; x <= width; x ++ )

				if ( ! isNaN( cliffmap[ y ][ x ] ) ) {

					// Floor
					const index = geometry.vertices.length;
					const { topLeft, topRight, botLeft, botRight } = this._zHeight( x, y );
					geometry.vertices.push(
						new Vector3( x, - y, cliffmap[ y ][ x ] + topLeft ),
						new Vector3( x + 1, - y, cliffmap[ y ][ x ] + topRight ),
						new Vector3( x, - y - 1, cliffmap[ y ][ x ] + botLeft ),
						new Vector3( x + 1, - y - 1, cliffmap[ y ][ x ] + botRight )
					);
					geometry.faces.push( new Face3( index + 1, index, index + 2, undefined, color( x, y ) ) );
					geometry.faces.push( new Face3( index + 1, index + 2, index + 3, undefined, color( x, y ) ) );

					if ( flagmap[ y ][ x ].water ) {

						const index = waterGeometry.vertices.length;
						waterGeometry.vertices.push(
							new Vector3( x, - y, cliffmap[ y ][ x ] + botLeft + 3 / 8 ),
							new Vector3( x + 1, - y, cliffmap[ y ][ x ] + botRight + 3 / 8 ),
							new Vector3( x, - y - 1, cliffmap[ y ][ x ] + topLeft + 3 / 8 ),
							new Vector3( x + 1, - y - 1, cliffmap[ y ][ x ] + topRight + 3 / 8 )
						);
						waterGeometry.faces.push( new Face3( index + 1, index, index + 2 ) );
						waterGeometry.faces.push( new Face3( index + 1, index + 2, index + 3 ) );

					}

					// Left wall (next gets right)
					if ( x > 0 ) {

						const altHeight = this._tileHeight( x - 1, y );
						const currentIsLow = cliffmap[ y ][ x ] < altHeight;
						const low = currentIsLow ? cliffmap[ y ][ x ] : altHeight;
						const high = currentIsLow ? altHeight : cliffmap[ y ][ x ];

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z ),
								new Vector3( x, - y - 1, z ),
								new Vector3( x, - y, z + 1 ),
								new Vector3( x, - y - 1, z + 1 )
							);

							if ( currentIsLow )
								geometry.faces.push(
									new Face3( index + 1, index, index + 2 ),
									new Face3( index + 1, index + 2, index + 3 )
								);

							else
								geometry.faces.push(
									new Face3( index + 2, index, index + 1 ),
									new Face3( index + 2, index + 1, index + 3 )
								);

						}

					}

					// Top wall (next gets bottom)
					if ( y > 0 ) {

						const altHeight = this._tileHeight( x, y - 1 );
						const currentIsLow = cliffmap[ y ][ x ] < altHeight;
						const low = currentIsLow ? cliffmap[ y ][ x ] : altHeight;
						const high = currentIsLow ? altHeight : cliffmap[ y ][ x ];

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z ),
								new Vector3( x + 1, - y, z ),
								new Vector3( x, - y, z + 1 ),
								new Vector3( x + 1, - y, z + 1 )
							);

							if ( currentIsLow )
								geometry.faces.push(
									new Face3( index + 2, index, index + 1 ),
									new Face3( index + 2, index + 1, index + 3 )
								);

							else
								geometry.faces.push(
									new Face3( index + 1, index, index + 2 ),
									new Face3( index + 1, index + 2, index + 3 )
								);

						}

					}

				} else if ( cliffmap[ y ][ x ].toLowerCase() === "r" ) {

					const nearRaw = [
						y > 0 && x > 0 ? cliffmap[ y - 1 ][ x - 1 ] : undefined,
						y > 0 ? cliffmap[ y - 1 ][ x ] : undefined,
						y > 0 && x < width ? cliffmap[ y - 1 ][ x + 1 ] : undefined,
						x > 0 ? cliffmap[ y ][ x - 1 ] : undefined,
						x < width ? cliffmap[ y ][ x + 1 ] : undefined,
						y < height && x > 0 ? cliffmap[ y + 1 ][ x - 1 ] : undefined,
						y < height ? cliffmap[ y + 1 ][ x ] : undefined,
						y < height && x < width ? cliffmap[ y + 1 ][ x + 1 ] : undefined
					];

					const near = nearRaw.map( tile => isNaN( tile ) ? - Infinity : tile );
					const [ topLeft, top, topRight, left, right, botLeft, bot, botRight ] = near;

					const topLeftHeight = Math.max( topLeft, top, left );
					const topRightHeight = Math.max( topRight, top, right );
					const botLeftHeight = Math.max( botLeft, bot, left );
					const botRightHeight = Math.max( botRight, bot, right );

					const index = geometry.vertices.length;
					geometry.vertices.push(
						new Vector3( x, - y, topLeftHeight ),
						new Vector3( x + 1, - y, topRightHeight ),
						new Vector3( x, - y - 1, botLeftHeight ),
						new Vector3( x + 1, - y - 1, botRightHeight )
					);

					geometry.faces.push( new Face3( index + 1, index, index + 2, undefined, color( x, y ) ) );
					geometry.faces.push( new Face3( index + 1, index + 2, index + 3, undefined, color( x, y ) ) );

					const walls = [
						{ a: 0, b: 1, neighbor: { x: 0, y: - 1 } },
						{ a: 1, b: 3, neighbor: { x: 1, y: 0 } },
						{ a: 3, b: 2, neighbor: { x: 0, y: 1 } },
						{ a: 2, b: 0, neighbor: { x: - 1, y: 0 } }
					];
					for ( let i = 0; i < walls.length; i ++ ) {

						// Don't put triangles where they won't be seen
						if ( y + walls[ i ].neighbor.y < 0 || y + walls[ i ].neighbor.y > height ||
							x + walls[ i ].neighbor.x < 0 || x + walls[ i ].neighbor.x > width ||
								typeof cliffmap[ y + walls[ i ].neighbor.y ][ x + walls[ i ].neighbor.x ] === "string" &&
								cliffmap[ y + walls[ i ].neighbor.y ][ x + walls[ i ].neighbor.x ].toLowerCase() === "r" )

							continue;

						const a = geometry.vertices[ index + walls[ i ].a ];
						const b = geometry.vertices[ index + walls[ i ].b ];

						if ( a.z !== b.z && ( a.x === b.x || a.y === b.y ) ) {

							const z = Math.min( a.z, b.z );
							const { x, y } = a.z === z ? b : a;
							const v = new Vector3( x, y, z );

							const newVertex = geometry.vertices.push( v ) - 1;
							rampWalls.push( new Face3( index + walls[ i ].a, index + walls[ i ].b, newVertex ) );

						}

					}

					const minHeight = Math.min( topLeftHeight, topRightHeight, botLeftHeight, botRightHeight );

					// Left wall (next gets right)
					if ( topLeftHeight !== botLeftHeight && x > 0 ) {

						const currentIsLow = minHeight < cliffmap[ y ][ x - 1 ];
						const low = currentIsLow ? minHeight : cliffmap[ y ][ x - 1 ];
						const high = currentIsLow ? cliffmap[ y ][ x - 1 ] : minHeight;

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z ),
								new Vector3( x, - y - 1, z ),
								new Vector3( x, - y, z + 1 ),
								new Vector3( x, - y - 1, z + 1 )
							);

							if ( currentIsLow )
								geometry.faces.push(
									new Face3( index + 1, index, index + 2 ),
									new Face3( index + 1, index + 2, index + 3 )
								);

							else
								geometry.faces.push(
									new Face3( index + 2, index, index + 1 ),
									new Face3( index + 2, index + 1, index + 3 )
								);

						}

					}

					// Top wall (next gets bottom)
					if ( topLeftHeight !== topRightHeight && y > 0 ) {

						const currentIsLow = minHeight < cliffmap[ y - 1 ][ x ];
						const low = currentIsLow ? minHeight : cliffmap[ y - 1 ][ x ];
						const high = currentIsLow ? cliffmap[ y - 1 ][ x ] : minHeight;

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z ),
								new Vector3( x + 1, - y, z ),
								new Vector3( x, - y, z + 1 ),
								new Vector3( x + 1, - y, z + 1 )
							);

							if ( currentIsLow )
								geometry.faces.push(
									new Face3( index + 2, index, index + 1 ),
									new Face3( index + 2, index + 1, index + 3 )
								);

							else
								geometry.faces.push(
									new Face3( index + 1, index, index + 2 ),
									new Face3( index + 1, index + 2, index + 3 )
								);

						}

					}

				}

		// Randomly rotate 50% of squares
		for ( let i = 0; i < geometry.faces.length / 2; i ++ )
			if ( Math.random() < 0.5 ) {

				geometry.faces[ i * 2 ].c = geometry.faces[ i * 2 + 1 ].c;
				geometry.faces[ i * 2 + 1 ].a = geometry.faces[ i * 2 ].b;

			}

		geometry.faces.push( ...rampWalls );

		geometry.mergeVertices();

		// Center x & y
		geometry.computeBoundingBox();
		const offset = geometry.boundingBox.getCenter().negate();
		geometry.translate( offset.x, offset.y, 0 );
		waterGeometry.translate( offset.x, offset.y, 0 );

		// Randomly move vertices a bit (so we don't have completely flat surfaces)
		for ( let i = 0; i < geometry.vertices.length; i ++ ) {

			geometry.vertices[ i ].x += ( Math.random() - 0.5 ) * ( Math.random() - 0.5 ) * 0.75;
			geometry.vertices[ i ].y += ( Math.random() - 0.5 ) * ( Math.random() - 0.5 ) * 0.75;
			geometry.vertices[ i ].z += ( Math.random() - 0.5 ) * ( Math.random() - 0.5 ) * 0.75;

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		this.mesh = new Mesh( geometry, material );
		this.waterMesh = new Mesh( waterGeometry, waterMaterial );

		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

	}

	_tileHeight( x, y ) {

		if ( ! isNaN( this._cliffmap[ y ][ x ] ) ) return this._cliffmap[ y ][ x ];

		if ( this._cliffmap[ y ][ x ].toLowerCase() !== "r" ) return;

		const { width, height } = this.dimensions;

		const [ topLeft, top, topRight, left, right, botLeft, bot, botRight ] = [
			y > 0 && x > 0 ? this._cliffmap[ y - 1 ][ x - 1 ] : undefined,
			y > 0 ? this._cliffmap[ y - 1 ][ x ] : undefined,
			y > 0 && x < width ? this._cliffmap[ y - 1 ][ x + 1 ] : undefined,
			x > 0 ? this._cliffmap[ y ][ x - 1 ] : undefined,
			x < width ? this._cliffmap[ y ][ x + 1 ] : undefined,
			y < height && x > 0 ? this._cliffmap[ y + 1 ][ x - 1 ] : undefined,
			y < height ? this._cliffmap[ y + 1 ][ x ] : undefined,
			y < height && x < width ? this._cliffmap[ y + 1 ][ x + 1 ] : undefined
		].map( tile => isNaN( tile ) ? - Infinity : tile );

		const topLeftHeight = Math.max( topLeft, top, left );
		const topRightHeight = Math.max( topRight, top, right );
		const botLeftHeight = Math.max( botLeft, bot, left );
		const botRightHeight = Math.max( botRight, bot, right );

		return Math.min( topLeftHeight, topRightHeight, botLeftHeight, botRightHeight );

	}

	_zHeight( x, y ) {

		const parts = zHeightConsts
			.map( corner => corner.map( ( { x: xOffset, y: yOffset } ) => {

				const finalX = x + xOffset;
				const finalY = y + yOffset;
				if ( finalX < 0 || finalY < 0 ) return;
				const row = this._heightmap[ finalY ];
				if ( ! row ) return;
				return row[ finalX ];

			} ) );

		const [ topLeft, topRight, botRight, botLeft ] = parts
			.map( heights => heights.filter( height => ! isNaN( height ) ) )
			.map( heights => heights.reduce( ( sum, part ) => isNaN( part ) ? sum : sum + part, 0 ) / heights.length );

		return { topLeft, topRight, botLeft, botRight };

	}

}

const zHeightConsts = [
	[ { y: 0, x: 0 }, { y: - 1, x: 0 }, { y: 0, x: - 1 }, { y: - 1, x: - 1 } ],
	[ { y: 0, x: 0 }, { y: - 1, x: 0 }, { y: 0, x: 1 }, { y: - 1, x: 1 } ],
	[ { y: 0, x: 0 }, { y: 1, x: 0 }, { y: 0, x: 1 }, { y: 1, x: 1 } ],
	[ { y: 0, x: 0 }, { y: 1, x: 0 }, { y: 0, x: - 1 }, { y: 1, x: - 1 } ]
];
