
import Group from "./Group.js";
import Unit from "./Unit.js";

export default map => ( {
	CreateGroup: () => new Group(),
	CreateUnit: ( player, unitid, x, y, face ) => {

		const unit = new Unit( player, unitid, x, y, face );
		map.add( unit );
		return unit;

	},
} );
