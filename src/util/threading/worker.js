
import { parentPort, workerData } from "worker_threads";

const { file, args } = workerData;

( async () => {

	const work = await import( file ).then( i => i.default );
	parentPort.postMessage( await work( ...args ) );

} )();
