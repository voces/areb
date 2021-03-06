
import Game from "../../node_modules/webcraft/src/Game.js";
import Force from "../../node_modules/webcraft/src/Force.js";
import collector from "../../node_modules/webcraft/src/systems/collector.js";
import Graphics from "../../node_modules/webcraft/src/systems/Graphics.js";
import Players from "../../node_modules/webcraft/src/systems/Players.js";
import CameraControls from "../../node_modules/webcraft/src/mechanisms/CameraControls.js";
import SinglePlayer from "../../node_modules/webcraft/src/mechanisms/SinglePlayer.js";
import Terrain from "../../node_modules/notextures/src/meshes/Terrain.mjs";
import forces from "../../data/forces.js";
import slots from "../../data/slots.js";
import colors from "./colors.js";
import Player from "./Player.js";
import natives from "./natives.js";
import source from "./source.js";

export default class /* {{meta.name.class}} */ extends Game {

	name = ts( "meta.name.plain" );
	main;
	constants = tj( "constants", 1 );

	constructor() {

		super();

		this.addSystem( new Graphics() );
		this.addSystem( new Players() );
		this.addSystem( collector( "units", "isUnit" ) );
		this.addMechanism( new CameraControls( { camera: this.camera } ) );

		this.forces = forces.map( spec =>

			new Force( {
				name: spec.name,
				players: spec.slots.map( slot => {

					const player = new Player( {
						...slots[ slot ],
						id: slot,
						color: colors[ slot ],
					} );
					this.add( player );
					return player;

				} ),
			} )

		);

		this.setupSinglePlayer();

		this.loadTerrain();
		// this.loadDoodads();

		this.loadUI();

		this.main = source( natives( this ) );
		this.main();

	}

	// This is just a placeholder before I actually wire up the proper logic
	setupSinglePlayer() {

		this.addMechanism( new SinglePlayer( this ) );
		this.localPlayer = this.players.find( player => player.id === 0 );
		this.localPlayer.name = "Local Player";
		this.localPlayer.here = true;

	}

	async loadUI() {

		// Only relevant for browsers
		if ( ! document ) return;

		const Lobby = await import( "../resources/ui/lobby/index.js" ).then( i => i.default );

		this.ui = document.getElementById( "ui" );
		this.ui.innerHTML = "";

		const { name, players } = this;
		this.ui.appendChild( new Lobby( {
			name,
			forces: this.forces,
			players: Object.values( players ),
			slots,
			localPlayer: this.localPlayer,
			handleLocalPlayerChange: player => this.localPlayer = player,
			onStart: () => this.onStartGame(),
		} ) );

	}

	async loadTerrain() {

		const terrain = await import( "../../data/terrain.js" ).then( i => i.default );

		this.terrain = new Terrain( terrain );
		this.terrain.receiveShadow = true;
		this.terrain.castShadow = true;
		this.add( this.terrain );

	}

	async loadDoodads() {

		const doodads = await import( "../../data/doodads.js" ).then( i => i.default );

		doodads
			.slice( 0, 1 )
			.forEach( async doodad => {

				const mesh = new doodad.mesh( doodad );
				if ( doodad.position ) mesh.position.copy( doodad.position );
				this.add( mesh );

			} );

	}

	onStartGame() {

		this.ui.innerHTML = "";
		this.main();

	}

}
