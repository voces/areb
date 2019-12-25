
import War3Map from "w3x-parser/dist/bundle.js";

import doodads from "./doodads.js";
import Formatter from "../../util/Formatter.js";
import jsStringify from "../util/jsStringify.js";
import natives from "../files/src/natives.js";
import parseInfo from "./info.js";
import settings from "./settings.js";
import terrain from "./terrain.js";
import thread from "../util/threading/index.js";

export default async buffer => {

	const war3Map = new War3Map( buffer );
	const info = parseInfo( war3Map );

	return {
		meta: {
			name: {
				plain: war3Map.name,
				class: new Formatter( war3Map.name ).alphaNumeric.alphaPrefix.pascal || "UnnamedMap",
				package: new Formatter( war3Map.name ).clean( /[^A-Za-z ]/g ).hyphen || "unnamed-map",
			},
			author: info.author,
			version: info.version,
		},
		slots: info.slots,
		forces: info.forces,
		constants: {
			camera: info.camera,
		},
		terrain: jsStringify( terrain( war3Map ) ),
		...doodads( war3Map ),
		source: await thread( "./source.js", war3Map.getScript() ),
		natives: `{\n${Object.keys( natives() ).sort().map( native => `\t${native}` ).join( ",\n" )}\n}`,
		...await import( "./data.js" ).then( i => i.default( war3Map.readModifications() ) ),
		settings: settings( war3Map ),
	};

};
