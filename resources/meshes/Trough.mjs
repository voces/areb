
import {
	Math as Math2,
	Mesh,
	Geometry,
	MeshPhongMaterial,
	FaceColors,
	PlaneGeometry
} from "../../node_modules/three/build/three.module.js";
import { WOOD } from "../colors.mjs";
import { box, randColor } from "./util/shared.mjs";

const wall = ( { thickness, length, height } ) => {

	const wall = box( {
		width: thickness,
		height: length,
		depth: height,
		color: randColor( WOOD )
	} );
	wall.translate( 0, 0, height / 2 );
	return wall;

};

const spoke = ( { thickness, height } ) => {

	const spoke = box( {
		width: thickness * 1.25,
		height: thickness * 2,
		depth: height * 1.25,
		color: randColor( WOOD )
	} );
	spoke.translate( 0, 0, height / 2 * 1.25 );
	return spoke;

};

export default class Trough extends Mesh {

	constructor( {
		thickness = 1 / 16,
		length = 1 / 2,
		width = 1 / 4,
		height = 1 / 4,
		angle = 0
	} = {} ) {

		const geometry = new Geometry();
		const woodMaterial = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true
		} );
		const waterMaterial = new MeshPhongMaterial( {
			color: 0x182190,
			flatShading: true,
			opacity: 0.75,
			transparent: true
		} );
		const materials = [ woodMaterial, waterMaterial ];

		const left = wall( { thickness, length: length + thickness, height } );
		left.rotateY( - Math2.randFloat( 1 / 5, 1 / 3 ) );
		left.translate( - width / 2 + thickness / 2, 0, 0 );
		geometry.merge( left );

		const right = wall( { thickness, length: length + thickness, height } );
		right.rotateY( Math2.randFloat( 1 / 5, 1 / 3 ) );
		right.translate( width / 2 - thickness / 2, 0, 0 );
		geometry.merge( right );

		const top = wall( { thickness, length: width, height } );
		top.rotateY( Math2.randFloat( 1 / 5, 1 / 3 ) );
		top.rotateZ( Math.PI / 2 );
		top.translate( 0, length / 2 - thickness / 2, 0 );
		geometry.merge( top );

		const bottom = wall( { thickness, length: width, height } );
		bottom.rotateY( - Math2.randFloat( 1 / 5, 1 / 3 ) );
		bottom.rotateZ( Math.PI / 2 );
		bottom.translate( 0, - length / 2 + thickness / 2, 0 );
		geometry.merge( bottom );

		const topLeft = spoke( { thickness, height } );
		topLeft.rotateY( Math2.randFloat( 1 / 5, 1 / 3 ) );
		topLeft.rotateX( - Math2.randFloat( 1 / 5, 1 / 3 ) );
		topLeft.rotateZ( Math.PI / 2 );
		topLeft.translate( - width / 2 + thickness / 2, length / 2 - thickness / 2, 0 );
		geometry.merge( topLeft );

		const topRight = spoke( { thickness, height } );
		topRight.rotateY( Math2.randFloat( 1 / 5, 1 / 3 ) );
		topRight.rotateX( Math2.randFloat( 1 / 5, 1 / 3 ) );
		topRight.rotateZ( Math.PI / 2 );
		topRight.translate( width / 2 - thickness / 2, length / 2 - thickness / 2, 0 );
		geometry.merge( topRight );

		const bottomLeft = spoke( { thickness, height } );
		bottomLeft.rotateY( - Math2.randFloat( 1 / 5, 1 / 3 ) );
		bottomLeft.rotateX( - Math2.randFloat( 1 / 5, 1 / 3 ) );
		bottomLeft.rotateZ( Math.PI / 2 );
		bottomLeft.translate( - width / 2 + thickness / 2, - length / 2 + thickness / 2, 0 );
		geometry.merge( bottomLeft );

		const bottomRight = spoke( { thickness, height } );
		bottomRight.rotateY( - Math2.randFloat( 1 / 5, 1 / 3 ) );
		bottomRight.rotateX( Math2.randFloat( 1 / 5, 1 / 3 ) );
		bottomRight.rotateZ( Math.PI / 2 );
		bottomRight.translate( width / 2 - thickness / 2, - length / 2 + thickness / 2, 0 );
		geometry.merge( bottomRight );

		for ( let i = 0; i < geometry.faces.length; i ++ )
			geometry.faces[ i ].materialIndex = 0;

		const water = new PlaneGeometry( width, length );
		water.translate( 0, 0, height * 3 / 4 );
		water.faces[ 0 ].color.set( 0x182190 );
		water.faces[ 1 ].color.set( 0x182190 );

		for ( let i = 0; i < water.faces.length; i ++ )
			water.faces[ i ].materialIndex = 1;

		geometry.merge( water );

		geometry.rotateZ( angle - Math.PI / 4 );

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		super( geometry, materials );

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
