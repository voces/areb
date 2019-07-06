
import WebCraftPlayer from "../../node_modules/webcraft/src/Player.js";

export default class Player extends WebCraftPlayer {

	race; // WC3-analog races: Human, Orc, Undead, Night Elf
	type; // Static controller: Human, Computer
	here = false; // Where the player is here (or if it's just a placeholder)
	startLocation; // A location where the player starts

	constructor( { race, type, startLocation, here, ...props } ) {

		super( props );

		if ( race ) this.race = race;
		if ( type ) this.type = type;
		if ( here !== undefined ) this.here = here;
		if ( startLocation ) this.startLocation = startLocation;

	}

}
