
import chai from "chai";
import { it } from "verit-test";
import merge from "../../../src/util/merge.js";

const { expect } = chai;

it( "empty", () =>{

	expect( merge(
		{},
		{}
	) ).to.deep.equal(
		{}
	);

} );

it( "basic", () => {

	expect( merge(
		{ a: "b" },
		{ c: "d" }
	) ).to.deep.equal(
		{ a: "b", c: "d" }
	);

} );

it( "deep objects", () => {

	expect( merge(
		{ a: { b: { c: 0 } } },
		{ a: { b: { d: 1 } } }
	) ).to.deep.equal(
		{ a: { b: { c: 0, d: 1 } } }
	);

} );

it( "deep arrays", () => {

	expect( merge(
		[[[ { a: 0 } ]]],
		[[[ { b: 1 }, { c: 2 } ]]]
	) ).to.deep.equal(
		[[[ { a: 0, b: 1 }, { c: 2 } ]]]
	);

} );

it( "multiple sources", () => {

	expect( merge(
		{ a: 0 },
		{ b: 1 },
		{ c: 2 }
	) ).to.deep.equal(
		{ a: 0, b: 1, c: 2 }
	);

} );
