
import cameraNatives from "./cameras/natives.js";
import enums from "./enums.js";
import playerNatives from "./players/natives.js";
import timerNatives from "./timers/natives.js";
import unitNatives from "./units/natives.js";
import unimplemented from "./unimplemented.js";
import settings from "./settings.js";

export default map => ( {
	...cameraNatives( map ),
	...enums,
	...playerNatives( map ),
	...timerNatives( map ),
	...unitNatives( map ),
	...unimplemented( map ), // We put this last to make sure we remove items as we implement
	...settings( map ),
} );
