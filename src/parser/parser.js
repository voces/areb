
import War3Map from "../../node_modules/w3x-parser/dist/bundle.mjs";

import Formatter from "../../util/Formatter.js";
import jsStringify from "../util/jsStringify.js";
import terrain from "./terrain.js";
import doodads from "./doodads.js";
import parseInfo from "./info.js";
import parseSource from "./source.js";

export default buffer => {

	const war3Map = new War3Map( buffer );
	const info = parseInfo( war3Map );

	return {
		meta: {
			name: {
				plain: war3Map.name,
				class: new Formatter( war3Map.name ).alphaNumeric.alphaPrefix.pascal || "UnnamedMap",
				package: new Formatter( war3Map.name ).clean( /[^A-Za-z ]/g ).hyphen || "unnamed-map"
			},
			author: info.author,
			version: info.version
		},
		slots: info.slots,
		forces: info.forces,
		terrain: jsStringify( terrain( war3Map ) ),
		...doodads( war3Map ),
		source: parseSource( war3Map )
	};

};
