
import { inspect } from "util";
import types from "../../../lib/1.31.1.12164/types.js";

const indexBy = ( rows, ...fields ) => rows.reduce( ( data, obj ) => {

	let container = data;
	for ( let i = 0; i < fields.length - 1; i ++ ) {

		const key = typeof fields[ i ] === "string" ?
			obj[ fields[ i ] ] :
			fields[ i ].map( field => obj[ field ] ).join( "," );
		container = container[ key ] || ( container[ key ] = {} );

	}

	const key = typeof fields[ fields.length - 1 ] === "string" ?
		obj[ fields[ fields.length - 1 ] ] :
		fields[ fields.length - 1 ].map( field => obj[ field ] ).join( "," );
	if ( container[ key ] )
		throw new Error( `Duplicate key ${fields.map( f => typeof f === "string" ? obj[ f ] : f.map( sf => obj[ sf ] ).join( "," ) ).join( "." )}` );
	container[ key ] = obj;

	return data;

}, {} );

export const spec = indexBy( types, "slk", [ "category", "section" ], "field" );

const empty = [ "", "_", "-", " - ", "NaN", " ", "@" ];
const _castValue = ( value, fieldType ) => {

	if ( empty.includes( value ) ) return undefined;

	let v;

	switch ( fieldType ) {

		case "int":
		case "deathType":
		case "attackBits":
		case "versionFlags":
		case "teamColor":
			v = parseInt( value );
			if ( isNaN( v ) ) throw new Error( `bad int ${value}` );
			return v;
		case "real":
		case "unreal":
			v = parseFloat( value );
			if ( isNaN( v ) ) throw new Error( `bad float ${value}` );
			return v;
		case "ability":
		case "heroAbility":
		case "regenType":
		case "defenseType":
		case "attributeType":
		case "unitRace":
		case "moveType":
		case "target":
		case "attackType":
		case "weaponType":
		case "model":
		case "unitSound":
		case "armorType":
		case "shadowImage":
		case "combatSound":
		case "unitClass":
		case "upgrade":
		case "abilCode":
		case "pathingListPrevent":
		case "pathingTexture":
		case "aiBuffer":
		case "uberSplat":
		case "shadowTexture":
		case "pathingListRequire":
		case "tileset":
		case "string":
		case "icon":
		case "unit":
		case "char":
		case "item":
			return value;
		case "bool":
			return value === "1";

	}

	throw new Error( `Uncaught cast: value=${inspect( value )} field=${fieldType}` );

};

export default ( value, field, slk ) => {

	if ( empty.includes( value ) ) return undefined;

	const fieldDef = spec[ field ];
	if ( ! fieldDef ) {

		let v;

		switch ( field ) {

			case "dmod1":
			case "dmod2":
			case "maxdmg1":
			case "avgdmg1":
			case "mindmg1":
			case "maxdmg2":
			case "avgdmg2":
			case "mindmg2":
			case "version":
			case "realM":
			case "realHP":
				v = parseInt( value );
				if ( isNaN( v ) ) throw new Error( `bad int ${value}` );
				return v;
			case "legacyModelScale":
			case "mincool1":
			case "mincool2":
			case "legacyScale":
			case "DPS":
			case "abilTest":
			case "realdef":
				v = parseFloat( value );
				if ( isNaN( v ) ) throw new Error( `bad float ${value}` );
				return v;
			case "weap1":
			case "weap2":
			case "DmgUpg":
			case "unitClass":
			case "name":
			case "Name":
				return value;
			case "hiddenInEditor":
			case "valid":
			case "threat": // todo: maybe an int?
				return value === "1";
			case "comment(s)":
				return Array.isArray( value ) ? value.reduce( ( longest, value ) => value.length > longest.value ? longest : value, "" ) : value;
			case "InBeta":
			case "sortWeap":
			case "sort":
			case "sort2":
			case "sortBalance":
			case "sortAbil":
			case "sortUI":
			case "": // shows up in UnitBalance
			case "undefined": // shows up in UnitWeapons
				return;

		}

		throw new Error( `Uncaught cast: value=${inspect( value )} field=${field}` );

	}

	const type = spec[ field ].type;

	if ( type.endsWith( "List" ) ) {

		const arr = value.split( "," ).map( value =>
			_castValue( value, type.slice( 0, - 4 ) ) );

		if ( arr.filter( Boolean ).length === 0 ) return undefined;
		else return arr;

	}

	try {

		return _castValue( value, type );

	} catch ( err ) {

		console.error( err );
		throw new Error( `bad cast; value: '${value}', field: '${field}', typeof: ${typeof value}` );

	}

};
