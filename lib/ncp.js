
import ncp from "ncp";

export default new Proxy( ncp, {
	apply: ( target, thisArg, args ) =>
		new Promise( ( resolve, reject ) =>
			ncp( ...args, err =>
				err ? reject( err ) : resolve() ) ) } );
