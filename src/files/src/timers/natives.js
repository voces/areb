
import Timer from "./Timer.js";
import TimerDialog from "./TimerDialog.js";

export default ( /* map */ ) => ( {
	CreateTimer: () => new Timer(),
	CreateTimerDialog: timer => new TimerDialog( timer )
} );
