
import parseStrings from "./strings.js";

const playerTypes = {
	1: "Human",
	2: "Computer",
	3: "Neutral",
	4: "Rescuable",
};

const playerRaces = {
	1: "Human",
	2: "Orc",
	3: "Undead",
	4: "Night Elf",
};

export default war3Map => {

	const info = war3Map.readMapInformation();
	const strings = parseStrings( war3Map );

	return {
		author: strings( info.author ),
		version: info.saves,
		forces: info.forces.map( force => ( {
			name: strings( force.name ),
			slots: force.playerMasks
				.toString( 2 )
				.slice( - war3Map.maxPlayers )
				.split( "" )
				.map( ( v, i ) => v === "1" ? war3Map.maxPlayers - 1 - i : - 1 )
				.filter( v => v >= 0 )
				.sort( ( a, b ) => a - b ),
		} ) ),
		slots: info.players.map( p => ( {
			type: playerTypes[ p.type ], // TODO: Should be a reference
			race: playerRaces[ p.race ], // TODO: Should be a reference
			name: strings( p.name ),
			startLocation: p.startLocation,
		} ) ),
		camera: {
			minX: Math.min( ...info.cameraBounds.filter( ( _, i ) => i % 2 === 0 ) ),
			maxX: Math.max( ...info.cameraBounds.filter( ( _, i ) => i % 2 === 0 ) ),
			minY: Math.min( ...info.cameraBounds.filter( ( _, i ) => i % 2 === 1 ) ),
			maxY: Math.max( ...info.cameraBounds.filter( ( _, i ) => i % 2 === 1 ) ),
		},
	};

};
