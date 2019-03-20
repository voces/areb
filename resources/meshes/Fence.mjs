
import {
	// Math as Math2,
	Mesh,
	Geometry,
	CylinderGeometry,
	MeshPhongMaterial,
	FaceColors
} from "../../node_modules/three/build/three.module.js";
import { linear as random } from "../../util/random.mjs";
import { WOOD } from "../colors.mjs";

const createPost = ( { height, width, color } ) => {

	const post = new CylinderGeometry(
		width + Math.random() / 24,
		width + Math.random() / 24,
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

	const postDisplacement = length / 2 - Math.random() / 16;

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
		length + width + Math.random() / 4 );

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

	constructor( {
		length = 2 - 1 / 4,
		width = 1 / 24,
		height = 1 / 2,
		angle = 0,
		color = WOOD.clone().offsetHSL( random( 1 / 64 ), 0, 0 )
	} = {} ) {

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
