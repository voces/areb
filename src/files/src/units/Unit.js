
import {
	BoxBufferGeometry,
	CylinderBufferGeometry,
	FaceColors,
	Mesh,
	MeshPhongMaterial,
} from "../../node_modules/webcraft/node_modules/three/build/three.module.js";
import unitData from "../../data/unitData.js";
import missingGeometry from "../util/missingGeometry.js";

let material;

// This shouldn't exist; objects should figure out the terrain height
const BASE_HEIGHT = 5;

export default class Unit extends Mesh {

	static geometry( spec ) {

		if ( spec && spec.stats && spec.stats.isbldg ) return missingGeometry( BoxBufferGeometry, undefined, 0.4, 0.4, 0.4 ).translate( 0, 0, 0.2 );

		return missingGeometry( CylinderBufferGeometry, undefined, 0.4, 0.4, 0.8 ).translate( 0, 0, 0.4 );

	}

	static get material() {

		return material || ( material = new MeshPhongMaterial( {
			vertexColors: FaceColors,
			flatShading: true,
		} ) );

	}

	constructor( player, type, x, y, facing ) {

		const spec = unitData[ type ];

		super( Unit.geometry( spec ), Unit.material );

		if ( spec )
			this.scale.set( spec.art.scale, spec.art.scale, spec.art.scale );

		this.position.z = BASE_HEIGHT + ( spec && spec.move && ! isNaN( spec.move.moveHeight ) ? spec.move.moveHeight / 128 : 0 );
		this.position.x = x / 128;
		this.position.y = y / 128;

		this.rotation.z = facing * Math.PI / 180;

		this.owner = player;

		this.castShadow = true;
		this.receiveShadow = true;

	}

}
