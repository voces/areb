
import Terrain from "./Terrain.mjs";

export default class Map {

	constructor( json ) {

		window.json = json;
		window.map = this;

		this.terrain = new Terrain( json.terrain );

		this.placeDoodads( json.doodads );

	}

	placeDoodads( doodads ) {

		this.doodads = doodads.map( doodad => {

			const mesh = new doodad.mesh( { angle: doodad.angle || 0 } );
			mesh.position.copy( doodad.position );
			return mesh;

		} );

	}

}
