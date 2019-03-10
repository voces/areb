
// https://github.com/mrdoob/three.js/blob/master/examples/js/objects/Water2.js

import { Geometry, Mesh, MeshPhongMaterial, FaceColors, Vector3, Face3, Color } from "./node_modules/three/build/three.module.js";
import { memoize } from "./util.mjs";
import NDArray from ".util/NDArray.mjs";

const memoizedColor = memoize( hex => new Color( hex ) );

class Tile {

	constructor( { terrain, terrainDef, geometry, x, y } ) {

		this.terrain = terrain;
		this.x = x;
		this.y = y;

		this.buildGeometry( { terrainDef, x, y } );

		const index = geometry.vertices.length;
		geometry.vertices.push(
			new Vector3( x, - y, map.maps.cliff[ y ][ x ] + topLeft ),
			new Vector3( x + 1, - y, map.maps.cliff[ y ][ x ] + topRight ),
			new Vector3( x, - y - 1, map.maps.cliff[ y ][ x ] + botLeft ),
			new Vector3( x + 1, - y - 1, map.maps.cliff[ y ][ x ] + botRight )
		);
		geometry.faces.push( new Face3( index + 1, index, index + 2, undefined, color( x, y ) ) );
		geometry.faces.push( new Face3( index + 1, index + 2, index + 3, undefined, color( x, y ) ) );

	}

	buildGeometry( { terrainDef, geometry, x, y } ) {

		const topLeft = terrainDef.maps.height[ y ][ x ];
		const topRight = terrainDef.maps.height[ y ][ x + 1 ];
		const botLeft = terrainDef.maps.height[ y + 1 ][ x ];
		const botRight = terrainDef.maps.height[ y + 1 ][ x + 1 ];

		const z = terrainDef.maps.cliff[ y ][ x ];

		const newVertices = [];
		const newVertex = ( x, y, z ) => {

			const vertex = new Vector3( x, y, z );
			geometry.vert;

		};

		this.vertices = [
			this.terrain._vertices.getOrSet( () => new Vector3( x, - y, z + topLeft ), x, y, z ),
			this.terrain._vertices.getOrSet( () => new Vector3( x + 1, - y, z + topRight ), x + 1, y, z ),
			this.terrain._vertices.getOrSet( () => new Vector3( x, - y - 1, z + botLeft ), x, y + 1, z ),
			this.terrain._vertices.getOrSet( () => new Vector3( x, - y, z + topLeft ), x, y, z )
		];

	}

	getOrSetVertexIndex( x, y, z, geometry ) {

	}

}

export default class Terrain {

	constructor( map ) {

		this._map = map;

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true,
			shininess: 5
		} );

		const { width, height } = map.size;
		this.width = width;
		this.height = height;

		this._tiles = new NDArray();
		this._vertices = new NDArray();
		this._water = new NDArray();

		const waterGeometry = new Geometry();
		const waterMaterial = new MeshPhongMaterial( {
			color: 0x0077be,
			flatShading: true,
			opacity: 0.25,
			transparent: true
		} );

		function color( x, y ) {

			try {

				const hex = map.tiles[ map.maps.groundTile[ y ][ x ] ].color.toUpperCase();
				return memoizedColor( hex );

			} catch ( err ) {

				throw new Error( `Tile ( ${x}, ${y} ) uses undefined color ${map.maps.groundTile[ y ][ x ]}.` );

			}

		}
		color.colors = {};

		const rampWalls = [];

		for ( let y = map.size.height - 1; y >= 0; y -- )
			for ( let x = 0; x < map.size.width; x ++ ) {

				const topLeft = map.maps.height[ y ][ x ];
				const topRight = map.maps.height[ y ][ x + 1 ];
				const botLeft = map.maps.height[ y + 1 ][ x ];
				const botRight = map.maps.height[ y + 1 ][ x + 1 ];

				if ( ! isNaN( map.maps.cliff[ y ][ x ] ) ) {

					// Floor
					const index = geometry.vertices.length;
					geometry.vertices.push(
						new Vector3( x, - y, map.maps.cliff[ y ][ x ] + topLeft ),
						new Vector3( x + 1, - y, map.maps.cliff[ y ][ x ] + topRight ),
						new Vector3( x, - y - 1, map.maps.cliff[ y ][ x ] + botLeft ),
						new Vector3( x + 1, - y - 1, map.maps.cliff[ y ][ x ] + botRight )
					);
					geometry.faces.push( new Face3( index + 1, index, index + 2, undefined, color( x, y ) ) );
					geometry.faces.push( new Face3( index + 1, index + 2, index + 3, undefined, color( x, y ) ) );

					if ( map.maps.water[ y ][ x ] ) {

						// const waterHeight = this._waterHeight( x, y );

						const index = waterGeometry.vertices.length;
						waterGeometry.vertices.push(
							new Vector3( x, - y, waterHeight.topLeft ),
							new Vector3( x + 1, - y, waterHeight.topRight ),
							new Vector3( x, - y - 1, waterHeight.botLeft ),
							new Vector3( x + 1, - y - 1, waterHeight.botRight )
						);
						waterGeometry.faces.push( new Face3( index + 1, index, index + 2 ) );
						waterGeometry.faces.push( new Face3( index + 1, index + 2, index + 3 ) );

					}

					// Left wall (next gets right)
					if ( x > 0 ) {

						const altHeight = this._tileHeight( map.maps.cliff, x - 1, y );
						const currentIsLow = map.maps.cliff[ y ][ x ] < altHeight;
						const low = currentIsLow ? map.maps.cliff[ y ][ x ] : altHeight;
						const high = currentIsLow ? altHeight : map.maps.cliff[ y ][ x ];

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z + topLeft ),
								new Vector3( x, - y - 1, z + botLeft ),
								new Vector3( x, - y, z + 1 + topLeft ),
								new Vector3( x, - y - 1, z + 1 + botLeft )
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

						const altHeight = this._tileHeight( map.maps.cliff, x, y - 1 );
						const currentIsLow = map.maps.cliff[ y ][ x ] < altHeight;
						const low = currentIsLow ? map.maps.cliff[ y ][ x ] : altHeight;
						const high = currentIsLow ? altHeight : map.maps.cliff[ y ][ x ];

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z + topLeft ),
								new Vector3( x + 1, - y, z + topRight ),
								new Vector3( x, - y, z + 1 + topLeft ),
								new Vector3( x + 1, - y, z + 1 + topRight )
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

				} else if ( map.maps.cliff[ y ][ x ].toLowerCase() === "r" ) {

					const nearRaw = [
						y > 0 && x > 0 ? map.maps.cliff[ y - 1 ][ x - 1 ] : undefined,
						y > 0 ? map.maps.cliff[ y - 1 ][ x ] : undefined,
						y > 0 && x < width ? map.maps.cliff[ y - 1 ][ x + 1 ] : undefined,
						x > 0 ? map.maps.cliff[ y ][ x - 1 ] : undefined,
						x < width ? map.maps.cliff[ y ][ x + 1 ] : undefined,
						y < height && x > 0 ? map.maps.cliff[ y + 1 ][ x - 1 ] : undefined,
						y < height ? map.maps.cliff[ y + 1 ][ x ] : undefined,
						y < height && x < width ? map.maps.cliff[ y + 1 ][ x + 1 ] : undefined
					];

					const near = nearRaw.map( tile => isNaN( tile ) ? - Infinity : tile );
					const [ topLeftCliff, top, topRightCliff, left, right, botLeftCliff, bot, botRightCliff ] = near;

					const topLeftHeight = Math.max( topLeftCliff, top, left );
					const topRightHeight = Math.max( topRightCliff, top, right );
					const botLeftHeight = Math.max( botLeftCliff, bot, left );
					const botRightHeight = Math.max( botRightCliff, bot, right );

					const index = geometry.vertices.length;
					geometry.vertices.push(
						new Vector3( x, - y, topLeftHeight + topLeft ),
						new Vector3( x + 1, - y, topRightHeight + topRight ),
						new Vector3( x, - y - 1, botLeftHeight + botLeft ),
						new Vector3( x + 1, - y - 1, botRightHeight + botRight )
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
								typeof map.maps.cliff[ y + walls[ i ].neighbor.y ][ x + walls[ i ].neighbor.x ] === "string" &&
								map.maps.cliff[ y + walls[ i ].neighbor.y ][ x + walls[ i ].neighbor.x ].toLowerCase() === "r" )

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

						const currentIsLow = minHeight < map.maps.cliff[ y ][ x - 1 ];
						const low = currentIsLow ? minHeight : map.maps.cliff[ y ][ x - 1 ];
						const high = currentIsLow ? map.maps.cliff[ y ][ x - 1 ] : minHeight;

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z + topLeft ),
								new Vector3( x, - y - 1, z + botLeft ),
								new Vector3( x, - y, z + 1 + topLeft ),
								new Vector3( x, - y - 1, z + 1 + botLeft )
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

						const currentIsLow = minHeight < map.maps.cliff[ y - 1 ][ x ];
						const low = currentIsLow ? minHeight : map.maps.cliff[ y - 1 ][ x ];
						const high = currentIsLow ? map.maps.cliff[ y - 1 ][ x ] : minHeight;

						for ( let z = low; z < high; z ++ ) {

							const index = geometry.vertices.length;
							geometry.vertices.push(
								new Vector3( x, - y, z + topLeft ),
								new Vector3( x + 1, - y, z + topRight ),
								new Vector3( x, - y, z + 1 + topLeft ),
								new Vector3( x + 1, - y, z + 1 + topRight )
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
		// waterGeometry.translate( offset.x, offset.y, 0 );

		// Randomly move vertices a bit (so we don't have completely flat surfaces)
		for ( let i = 0; i < geometry.vertices.length; i ++ ) {

			geometry.vertices[ i ].x += ( Math.random() - 0.5 ) * ( Math.random() - 0.5 ) * 0.75;
			geometry.vertices[ i ].y += ( Math.random() - 0.5 ) * ( Math.random() - 0.5 ) * 0.75;
			geometry.vertices[ i ].z += ( Math.random() - 0.5 ) * ( Math.random() - 0.5 ) * 0.25;

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		this.mesh = new Mesh( geometry, material );
		// this.waterMesh = new Mesh( waterGeometry, waterMaterial );

		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		delete this._map;

	}

	tile( x, y ) {

		if ( x < 0 || x >= this.width || y < 0 || y >= this.height ) return;
		return this._tiles.getOrSet( () => new Tile( { terrain: this, terrainDef: this._map, x, y } ), y, x );

	}

	_tileHeight( cliffmap, x, y ) {

		if ( ! isNaN( cliffmap[ y ][ x ] ) ) return cliffmap[ y ][ x ];

		if ( cliffmap[ y ][ x ].toLowerCase() !== "r" ) return;

		const { width, height } = this;

		const [ topLeft, top, topRight, left, right, botLeft, bot, botRight ] = [
			y > 0 && x > 0 ? cliffmap[ y - 1 ][ x - 1 ] : NaN,
			y > 0 ? cliffmap[ y - 1 ][ x ] : NaN,
			y > 0 && x < width ? cliffmap[ y - 1 ][ x + 1 ] : NaN,
			x > 0 ? cliffmap[ y ][ x - 1 ] : NaN,
			x < width ? cliffmap[ y ][ x + 1 ] : NaN,
			y < height && x > 0 ? cliffmap[ y + 1 ][ x - 1 ] : NaN,
			y < height ? cliffmap[ y + 1 ][ x ] : NaN,
			y < height && x < width ? cliffmap[ y + 1 ][ x + 1 ] : NaN
		].map( tile => isNaN( tile ) ? - Infinity : tile );

		const topLeftHeight = Math.max( topLeft, top, left );
		const topRightHeight = Math.max( topRight, top, right );
		const botLeftHeight = Math.max( botLeft, bot, left );
		const botRightHeight = Math.max( botRight, bot, right );

		return Math.min( topLeftHeight, topRightHeight, botLeftHeight, botRightHeight );

	}

	_waterHeight( x, y ) {

		const [ waterTopLeft, waterTopRight, waterBotRight, waterBotLeft ] = zHeightConsts
			.map( corner => corner.map( ( { x: xOffset, y: yOffset } ) => {

				const finalX = x + xOffset;
				const finalY = y + yOffset;
				if ( finalX < 0 || finalX >= this.width || finalY < 0 || finalY >= this.height )
					return;

				return this._watermap[ finalY ][ finalX ];

			} ) )
			.map( heights => heights.filter( height => ! isNaN( height ) ) )
			.map( heights => heights.reduce( ( sum, part ) => isNaN( part ) ? sum : sum + part, 0 ) / heights.length );

		const groundHeight = this._zHeight( x, y );

		// 5 / 8 is the water level
		return {
			topLeft: waterTopLeft - groundHeight.topLeft + 5 / 8,
			topRight: waterTopRight - groundHeight.topRight + 5 / 8,
			botRight: waterBotRight - groundHeight.botRight + 5 / 8,
			botLeft: waterBotLeft - groundHeight.botLeft + 5 / 8
		};

	}

}

const zHeightConsts = [
	[ { y: 0, x: 0 }, { y: - 1, x: 0 }, { y: 0, x: - 1 }, { y: - 1, x: - 1 } ],
	[ { y: 0, x: 0 }, { y: - 1, x: 0 }, { y: 0, x: 1 }, { y: - 1, x: 1 } ],
	[ { y: 0, x: 0 }, { y: 1, x: 0 }, { y: 0, x: 1 }, { y: 1, x: 1 } ],
	[ { y: 0, x: 0 }, { y: 1, x: 0 }, { y: 0, x: - 1 }, { y: 1, x: - 1 } ]
];
