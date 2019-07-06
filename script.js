
import Game from "./node_modules/webcraft/src/Game.mjs";
import Graphic from "./node_modules/webcraft/src/systems/Graphics.mjs";

import arToEb from "./arToEb.js";

import Map from "./webcraft/Map.js";
import exampleMap from "./exampleMap.js";

document.querySelector( "input" ).addEventListener( "change", e => {

	const reader = new FileReader();
	reader.onload = evt => {

		const json = window.json = arToEb( evt.target.result );

		const map = window.map = new Map( json );
		loadMap( map );

	};
	reader.readAsArrayBuffer( e.target.files[ 0 ] );

} );

let game;
const loadMap = map => {

	if ( game ) game.dispose();

	game = window.game = new Game();
	game.addSystem( new Graphic() );
	game.add( map.terrain );
	map.doodads.forEach( doodad => game.add( doodad ) );

	game.start();

};

loadMap( exampleMap );

// const fog = new FogExp2( 0x000000, 0.005 );
// scene.fog = fog;

// const keyboard = {};
// function onKey( e ) {

// 	if ( e.type === "keyup" ) keyboard[ e.key ] = false;
// 	else keyboard[ e.key ] = true;

// }
// window.addEventListener( "keydown", onKey );
// window.addEventListener( "keyup", onKey );
// window.addEventListener( "wheel", e => {

// 	camera.position.z *= e.deltaY > 0 ? 1.05 : 0.95;
// 	updateLight();

// } );

// const keys = [ "ArrowLeft", "a", "ArrowRight", "d", "ArrowUp", "w", "ArrowDown", "s" ];

// function render() {

// 	requestAnimationFrame( render );
// 	if ( keys.some( key => keyboard[ key ] ) ) {

// 		if ( keyboard.ArrowLeft || keyboard.a ) camera.position.x -= camera.position.z / 100;
// 		if ( keyboard.ArrowRight || keyboard.d ) camera.position.x += camera.position.z / 100;
// 		if ( keyboard.ArrowUp || keyboard.w ) camera.position.y += camera.position.z / 100;
// 		if ( keyboard.ArrowDown || keyboard.s ) camera.position.y -= camera.position.z / 100;

// 		updateLight();

// 	}

// 	renderer.render( scene, camera );

// }

// render();
