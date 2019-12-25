
import { inspect } from "util";
import { promises as fs } from "fs";
import parse from "jass-to-ast";
import {
	ArrayRef,
	BinaryOp,
	Call,
	Comment,
	Else,
	ElseIf,
	EmptyLine,
	ExitWhen,
	FourCC,
	FuncRef,
	Globals,
	IfThenElse,
	JASSFunction,
	JASSSet,
	Loop,
	Name,
	Native,
	Param,
	Parens,
	Program,
	Return,
	Statements,
	Type,
	UnaryOp,
	Variable
} from "jass-to-ast/src/grammar/types.js";

const _astToJS = ast => {

	if ( ast === undefined || ast === null )
		return "null";

	switch ( ast.constructor ) {

		case ArrayRef:
			return `${ast.name}[ ${_astToJS( ast.prop )} ]`;

		case BinaryOp:
			return `${_astToJS( ast.left )} ${ast.operator.replace( "or", "||" ).replace( "and", "&&" )} ${_astToJS( ast.right )}`;

		case Boolean:
		case Number:
			return ast;

		case Call:
			return `${ast.name}(${ast.args ? ` ${[ ...ast.args ].map( _astToJS ).join( ", " )} ` : ""})`;

		case Comment:
			return "//" + ast;

		case Else:
			return `else {\n\n${_astToJS( ast.statements )}\n\n}`;

		case ElseIf:
			return `else if ( ${_astToJS( ast.condition )} ) {\n\n${_astToJS( ast.statements )}\n\n}`;

		case EmptyLine:
			return "";

		case ExitWhen:
			return `if ( ${_astToJS( ast.data[ 0 ] )} ) break;`;

		case FourCC:
		case String:
			return `"${ast}"`;

		case FuncRef:
			return ast.data;

		case Globals:
			return [ ast.comment, _astToJS( ast.globals ).split( "\n" ).map( v => v.slice( 1 ) ).join( "\n" ), ast.endComment ].filter( Boolean ).join( "\n" );

		case IfThenElse:
			return `\nif ( ${_astToJS( ast.condition )} ) {\n\n${_astToJS( ast.then )}\n\n}${ast.elses ? " " + ast.elses.map( _astToJS ).join( " " ) : ""}\n`;

		case JASSFunction:
			return `const ${ast.name} = (${ast.params ? ` ${[ ...ast.params ].map( _astToJS ).join( ", " )} ` : ""}) => {\n\n${_astToJS( ast.statements )}\n\n};\n`;

		case JASSSet:
			return `${ast.name.replace( "this", "_this" )} = ${_astToJS( ast.value )};`;

		case Loop:
			return `\nwhile ( true ) {\n\n${[ ...ast.statements ].map( _astToJS ).join( "\n" ).split( "\n" ).map( v => v ? "\t" + v : v ).join( "\n" )}\n\n}\n\n`;

		case Name:
			return ast.replace( "this", "_this" );

		case Native:
		case Type:
			return "";

		case Param:
			return ast.name.replace( "this", "_this" );

		case Parens:
			return `( ${_astToJS( ast.data[ 0 ] )} )`;

		case Program:
			return [ ...ast ].map( _astToJS ).join( "\n" );

		case Return:
			return `return ${_astToJS( ast.data[ 0 ] )}`;

		case Statements:
			return [ ...ast ].map( _astToJS ).join( "\n" ).split( "\n" ).map( v => v ? "\t" + v : v ).join( "\n" );

		case UnaryOp:
			return `${ast.operator.replace( "not", "!" )} ${_astToJS( ast.expr )}`;

		case Variable:
			return ( ast.constant ? "const " : "let " ) + ast.name.replace( "this", "_this" ) + ( "value" in ast ? " = " + _astToJS( ast.value ) : "" ) + ";";

	}

	console.log( inspect( ast, false, Infinity, true ) );
	throw new Error( "Unknown AST node " + ast.constructor.name );

};

export const astToJS = ast => _astToJS( ast )
	.replace( /\n{3,}/g, "\n\n" ); // Clean up multiple blank lines

export default async script => {

	console.log( "Transpiling JASS to JavaScript..." );

	script = script.replace( /\r/g, "" );
	const ast = parse( script );
	const js = astToJS( ast );

	console.log( "Transpiled JASS to JavaScript" );

	const [ common, blizzard ] = await Promise.all( [
		fs.readFile( "lib/common.js", "utf-8" ).then( contents => contents.slice( 1 ) ),
		fs.readFile( "lib/blizzard.js", "utf-8" )
	] );

	return common +
		blizzard +
		js.split( "\n" ).map( v => v ? "\t" + v : v ).join( "\n" );

};
