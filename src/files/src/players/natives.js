
import Force from "./Force.js";

export default map => ( {
	CreateForce: () => new Force(),
	GetPlayerNeutralPassive: () => 24, // todo: is this correct?
	GetPlayerNeutralAggressive: () => 25, // todo: is this correct?
	GetBJPlayerNeutralVictim: () => 26, // todo: is this correct?
	GetBJPlayerNeutralExtra: () => 27, // todo: is this correct?
	GetBJMaxPlayerSlots: () => 24,
	GetBJMaxPlayers: () => 24,
	Player: i => map.players.find( player => player.id === i )
} );
