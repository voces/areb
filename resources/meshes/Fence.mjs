
import {
	// Math as Math2,
	Mesh,
	Geometry,
	CylinderGeometry,
	MeshPhongMaterial,
	Color,
	FaceColors
} from "../../node_modules/three/build/three.module.js";

import { linear as random } from "../../util/random.mjs";

const COLOR = new Color( 0x3b2507 );

const createPost = ( { height, width, color } ) => {

	const post = new CylinderGeometry(
		width + Math.random() / 16,
		width + Math.random() / 16,
		height + Math.random() / 16 );

	for ( let i = 0; i < post.faces.length; i ++ )
		post.faces[ i ].color = color.clone().offsetHSL( random( 1 / 72 ), 0, 0 );

	post.rotateX( Math.PI / 2 + ( Math.random() - 0.5 ) / 6 );
	post.rotateZ( Math.PI * Math.random() );
	post.rotateY( ( Math.random() - 0.5 ) / 16 );
	post.translate( 0, 0, height / 2 );

	return post;

};

const createPosts = ( { length, width, height, angle, color } ) => {

	const geometry = new Geometry();

	const postDisplacement = length / 2 - width + Math.random() / 16;

	const leftPost = createPost( { height, width, color } );
	leftPost.translate( Math.cos( angle + Math.PI / 2 ) * - postDisplacement, Math.sin( angle + Math.PI / 2 ) * - postDisplacement, 0 );
	geometry.merge( leftPost );

	const rightPost = createPost( { height, width, color } );
	rightPost.translate( Math.cos( angle + Math.PI / 2 ) * postDisplacement, Math.sin( angle + Math.PI / 2 ) * postDisplacement, 0 );
	geometry.merge( rightPost );

	return geometry;

};

const createRail = ( { width, length, color } ) => {

	const rail = new CylinderGeometry(
		width + Math.random() / 24,
		width + Math.random() / 24,
		( length + 1 / 4 + width + Math.random() / 4 ) * length / 2 );

	for ( let i = 0; i < rail.faces.length; i ++ )
		rail.faces[ i ].color = color.clone().offsetHSL( random( 1 / 72 ), 0, 0 );

	rail.rotateY( Math.PI * Math.random() );
	rail.rotateX( ( Math.random() - 0.5 ) / 4 / length );

	return rail;

};

const createRails = ( { length, height, width, angle, color } ) => {

	const geometry = new Geometry();

	const topRail = createRail( { width, length, color } );
	topRail.translate( 0, 0, height / 3 );
	topRail.rotateZ( angle );
	geometry.merge( topRail );

	const bottomRail = createRail( { width, length, color } );
	bottomRail.translate( 0, 0, height / 3 * 2 );
	bottomRail.rotateZ( angle );
	geometry.merge( bottomRail );

	return geometry;

};

export default class Fence extends Mesh {

	// Think of length, width, height as the bounding box of the fence
	constructor( {
		length = 2 - 1 / 4,
		angle = 0,
		color = COLOR.clone().offsetHSL( random( 1 / 64 ), 0, 0 ),
		width,
		height
	} = {} ) {

		if ( width === undefined ) width = length / 48;
		if ( height === undefined ) height = length / 4;

		const geometry = new Geometry();
		const material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );

		geometry.merge( createPosts( { length, width, height, angle, color } ) );
		geometry.merge( createRails( { length, width, height, angle, color } ) );

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
