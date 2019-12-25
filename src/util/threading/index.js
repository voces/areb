
import { Worker } from "worker_threads";

function getCaller() {

	const origPrepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = ( _, stack ) => stack;
	const err = new Error();
	const stack = err.stack;
	Error.prepareStackTrace = origPrepareStackTrace;

	// 0 is getCaller, 1 is promise body, 2 is the promise, 3 is default, 4 is the original caller
	return stack[ 4 ];

}

export default ( file, ...args ) => new Promise( ( resolve, reject ) => {

	const callerFile = getCaller().getFileName();
	const dir = callerFile.split( "/" ).slice( 0, - 1 ).join( "/" );

	const worker = new Worker( "./src/util/threading/worker.js", { workerData: {
		file: dir + "/" + file,
		args
	} } );

	worker.on( "error", reject );
	worker.on( "message", resolve );

} );
