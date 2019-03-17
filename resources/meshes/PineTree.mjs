
import {
	Mesh,
	Geometry,
	CylinderGeometry,
	ConeGeometry,
	MeshPhongMaterial,
	Color,
	FaceColors
} from "../../node_modules/three/build/three.module.js";

import { linear as random } from "../../util/random.mjs";

const TRUNK_COLOR = new Color( 0x483d19 );
const LEAVES_COLOR = new Color( 0x026e2d );

const createTrunk = ( { radius, height, color } ) => {

	const trunk = new CylinderGeometry( radius / 16, radius / 10, height / 3 );

	for ( let i = 0; i < trunk.faces.length; i ++ )
		trunk.faces[ i ].color = color.clone().offsetHSL( random( 1 / 72 ), 0, 0 );

	trunk.rotateX( Math.PI / 2 );
	trunk.rotateZ( Math.PI * Math.random() );
	trunk.translate( 0, 0, height / 8 );

	return trunk;

};

const createShelfs = ( { height, radius, shelfs, color } ) => {

	let shelfRadius = height * radius / shelfs * ( Math.random() + 4 ) / 300;
	const shelfRadiusGrowth = height / shelfs / 10;

	const geometry = new Geometry();

	let Class = ConeGeometry;

	const xTilt = random( height / 40 );
	const yTilt = random( height / 40 );

	for ( let i = 0; i < shelfs; i ++ ) {

		// Adjust shelf
		color.offsetHSL( random( 1 / 32 ), random( 1 / 4 ), random( 1 / 24 ) );

		const args = [
			shelfRadius += Math.random() * shelfRadiusGrowth + radius / shelfs / 5,
			shelfRadius * ( Class === CylinderGeometry ? 1.5 * .9 : 2 * .9 )
		];
		if ( Class === CylinderGeometry ) args.unshift( args[ 0 ] / 6 );

		const shelf = new Class( ...args );

		if ( Class === ConeGeometry ) Class = CylinderGeometry;

		for ( let i = 0; i < shelf.faces.length; i ++ )
			shelf.faces[ i ].color = color.clone().offsetHSL( random( 1 / 48 ), 0, 0 );

		shelf.radius = shelfRadius;
		shelf.height = shelfRadius * 2;

		height -= shelfRadius ** 0.65 / shelfs * ( Math.random() / 3 + 2.5 );

		shelf.rotateX( Math.PI / 2 );
		shelf.rotateZ( Math.PI * Math.random() );
		shelf.rotateY( random( 1 / 12 ) );
		shelf.translate(
			( shelfs - i ) ** 0.75 * xTilt,
			( shelfs - i ) ** 0.75 * yTilt,
			height
		);
		geometry.merge( shelf );

	}

	return geometry;

};

export default class PineTree extends Mesh {

	constructor( {
		scale = 1,
		height = Math.random() + 3,
		radius = Math.random() / 4 + 3,
		shelfs,
		trunk = TRUNK_COLOR.clone().offsetHSL( random( 1 / 48 ), 0, 0 ),
		leaves = LEAVES_COLOR.clone().offsetHSL( random( 1 / 48 ), 0, 0 )
	} = {} ) {

		height = height * scale;
		radius = radius * scale;

		// If height is >3.33, 50% chance of 4 vs 3 shelves; <3.33 is always 3
		if ( shelfs === undefined ) shelfs = height > 10 / 3 ? 3 + ( Math.random() > 0.5 ) : 3;

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		geometry.merge( createTrunk( { radius, height, color: trunk } ) );
		geometry.merge( createShelfs( { height, radius, shelfs, color: leaves } ) );

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
