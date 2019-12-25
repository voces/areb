
import { replaceStrings } from "./strings.js";
import merge from "../util/merge.js";

const iniToObject = map => {

	if ( ! map ) return;

	const obj = {};

	for ( const [ key, value ] of map.sections )
		obj[ key.toLowerCase() ] = Object.fromEntries( value.entries() );

	for ( const [ key, value ] of map.properties )
		obj[ key.toLowerCase() ] = value;

	return obj;

};

export default war3Map => replaceStrings( war3Map, merge(
	// MiscMetaData.slk SkinMetaData.slk
	iniToObject( war3Map.readGameplayConstants() ),
	iniToObject( war3Map.readGameInterface() ),
	iniToObject( war3Map.readMapProperties() ),
) );
