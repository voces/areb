
import Terrain from "./Terrain.mjs";

export default class Map {

	constructor( json ) {

		this.terrain = new Terrain( json.terrain );

		this.placeDoodads( json.doodads );

	}

	placeDoodads( doodads ) {

		this.doodads = doodads.map( doodad => {

			const mesh = new doodad.mesh();
			mesh.position.copy( doodad.position );
			return mesh;

		} );

	}

}
