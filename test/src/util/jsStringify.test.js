
import chai from "chai";
import { describe, it } from "verit-test";
import stringify from "../../../src/util/jsStringify.js";

const { expect } = chai;

const longText = " long text".repeat( 10 ).slice( 1 );
const truncMiddle = ( str, length = 20 ) =>
	str.length <= length ?
		str :
		str.slice( 0, Math.ceil( length / 2 ) ) +
		"…" +
		str.slice( str.length - Math.floor( length / 2 ) );

const test = ( input, output, ...options ) =>
	it( truncMiddle( output.replace( /\n/g, "\\n" ) ), () => expect( stringify( input, ...options ) ).to.equal( output ) );

const fromJS = str => Function( "\"use strict\";return (" + str + ")" )();

const roundTripTest = ( output, ...options ) =>
	test( fromJS( output ), output, ...options );

describe( "works", () => {

	roundTripTest( "true" );
	roundTripTest( "false" );
	roundTripTest( "null" );
	roundTripTest( "undefined" );
	roundTripTest( "0" );
	roundTripTest( "123.456" );
	roundTripTest( "\"test\"" );
	roundTripTest( "{}" );
	roundTripTest( "[]" );
	roundTripTest( "{ a: \"b\" }" );
	roundTripTest( "[ 0 ]" );
	roundTripTest( "[ 0, 1, 3, null, undefined ]" );
	roundTripTest( "{ a: 0, b: 123, c: null, d: [] }" );
	roundTripTest( "[ {}, {} ]" );
	roundTripTest( "[ { a: [ 0, 1, 3, null, undefined ], b: \"c\", d: { e: [] } } ]" );
	roundTripTest( `[\n\t"${longText}",\n\t"${longText}"\n]` );
	roundTripTest( `{\n\ta: "${longText}",\n\tb: "${longText}"\n}` );
	roundTripTest( `[ "a", "${"b".repeat( 69 )}" ]` );
	roundTripTest( `[\n\t"a",\n\t"${"b".repeat( 70 )}"\n]` );
	roundTripTest( `{ a: "a", b: "${"b".repeat( 63 )}" }` );
	roundTripTest( `{\n\ta: "a",\n\tb: "${"b".repeat( 64 )}"\n}` );
	roundTripTest( "{\n\tabc: \"fish\",\n\tapple: [ 1, 2, 3, 4, 5, 6, 7 ],\n\tbanana: { foo: \"bar\", list: [ 1, 2, 3, 4, 5 ] }\n}" );
	roundTripTest( "{\n\ta: 0,\n\tb: {\n\t\tc: 1,\n\t\td: {\n\t\t\te: 2,\n\t\t\tf: {\n\t\t\t\tg: 3,\n\t\t\t\th: {\n\t\t\t\t\ti: 4,\n\t\t\t\t\tj: {\n\t\t\t\t\t\tk: 5,\n\t\t\t\t\t\tl: {\n\t\t\t\t\t\t\tfoo: \"bar\",\n\t\t\t\t\t\t\tm: { n: 6, o: { p: 7, q: 8, r: 9 }, s: 10 },\n\t\t\t\t\t\t\tt: 11\n\t\t\t\t\t\t},\n\t\t\t\t\t\tu: 12\n\t\t\t\t\t},\n\t\t\t\t\tv: 13\n\t\t\t\t},\n\t\t\t\tw: 14\n\t\t\t},\n\t\t\tx: 15\n\t\t},\n\t\ty: 16\n\t},\n\tz: 17\n}" );

} );

describe( "space", () => {

	it( "defaults to tab", () =>
		expect( stringify( [ longText ] ) ).to.contain( "\t" ) );

	it( "if string, uses it", () =>
		expect( stringify( [ longText ], "abc" ) ).to.contain( "abc" ) );

	it( "converts number to spaces", () =>
		expect( stringify( [ longText ], 17 ) ).to.contain( " ".repeat( 17 ) ) );

} );
