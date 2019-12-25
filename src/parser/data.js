
import { promises as fs } from "fs";

import unitData from "../../lib/1.31.1.12164/units.js";
import castValue, { spec } from "./helpers/castValue.js";

const deepCopy = obj => {

	const copy = Array.isArray( obj ) ? [] : {};
	for ( const prop in obj )
		if ( typeof obj[ prop ] === "object" && obj[ prop ] !== null )
			copy[ prop ] = deepCopy( obj[ prop ] );
		else copy[ prop ] = obj[ prop ];

	return copy;

};

const unknownModifications = [];

const _mixModifications = ( obj, modifications ) => {

	for ( const modification of modifications ) {

		const specEntry = spec.UnitData[ modification.id ];
		if ( ! specEntry ) {

			unknownModifications.push( modification.id );
			continue;

		}

		if ( specEntry.category ) {

			if ( ! obj[ specEntry.category ] ) obj[ specEntry.category ] = {};
			obj[ specEntry.category ][ specEntry.field ] = castValue( modification.value, specEntry.field, defs );

		} else obj[ specEntry.field ] = castValue( modification.value, specEntry.field, defs );

	}

	return obj;

};

const mixModifications = ( data, modifications, spec ) => {

	for ( const obj of modifications.customTable.objects )
		data[ obj.newId ] = _mixModifications( deepCopy( data[ obj.oldId ] ), obj.modifications, spec );

	for ( const obj of modifications.originalTable.objects )
		_mixModifications( data[ obj.oldId ], obj.modifications, spec );

	return data;

};

const tsvToMap = tsv => tsv
	.slice( 1 )
	.reduce(
		( map, row ) => Object.assign(
			map,
			{ [ row[ 0 ] ]: row.reduce(
				( obj, value, index ) =>
					Object.assign(
						obj,
						{ [ tsv[ 0 ][ index ] ]:
								value.match( /^-?\d+(\.\d+)?$/ ) ? parseFloat( value ) : value }
					),
				{}
			) }
		),
		{}
	);

export default async modifications => {

	const data = {
		unitData: mixModifications(
			unitData,
			modifications.w3u,
		),
	};

	console.log( "Skipping unknown modifications", unknownModifications );

	return data;

};
