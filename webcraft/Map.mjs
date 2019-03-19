
import Terrain from "../resources/meshes/Terrain.mjs";

export default class Map {

	constructor( json ) {

		window.json = json;
		window.map = this;

		this.terrain = new Terrain( json.terrain );

		this.placeDoodads( json.doodads );

	}

	placeDoodads( doodads ) {

		this.doodads = doodads.map( doodad => {

			const mesh = new doodad.mesh( doodad );
			mesh.position.copy( doodad.position );
			return mesh;

		} );

	}

}
