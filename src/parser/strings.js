// (4294963711).toString(2).slice(-12).split('').map(v => v === '1')

import { memoize } from "../../util.js";

export default memoize( war3Map => {

	const strings = war3Map.readStringTable().stringMap;

	return str => {

		const index = parseInt( str.split( "_" ).pop() );
		return strings.get( index );

	};

} );
