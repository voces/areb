
import {
	Scene,
	Mesh,
	PerspectiveCamera,
	WebGLRenderer,
	DirectionalLight,
	HemisphereLight,
	PCFSoftShadowMap,
	Vector3,
	FogExp2
} from "./node_modules/three/build/three.module.js";

// import PineTree from "./resources/meshes/PineTree.mjs";
import arToEb from "./arToEb.mjs";

import Map from "./webcraft/Map.mjs";

import exampleMap from "./exampleMap.mjs";

document.querySelector( "input" ).addEventListener( "change", e => {

	const reader = new FileReader();
	reader.onload = evt => {

		const json = window.json = arToEb( evt.target.result );

		const map = window.map = new Map( json );
		loadMap( map );

	};
	reader.readAsArrayBuffer( e.target.files[ 0 ] );

} );

const loadMap = map => {

	// Remove meshes
	scene.children.forEach( child => child instanceof Mesh ? scene.remove( child ) : null );
	scene.add( map.terrain.mesh );
	scene.add( map.terrain.waterMesh );
	map.doodads.forEach( doodad => scene.add( doodad ) );

};

const scene = window.scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 10;
camera.position.y = - 12.5;
camera.rotation.x = 0.6;

loadMap( exampleMap );

// const spread = 1;
// for ( let y = - 13; y <= 5; y ++ )
// 	for ( let x = - 7; x <= 7; x ++ ) {

// 		const tree = new PineTree();
// 		tree.position.set( x * spread, y * spread, 0 );
// 		scene.add( tree );

// 	}

const renderer = new WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild( renderer.domElement );

const light = new DirectionalLight( 0xffffff, 1 );
window.light = light;
light.target = camera;
const lightTilt = new Vector3( - 10, - 15, 25 );
const updateLight = () => {

	const height = camera.position.z;
	light.position.copy( camera.position ).add( lightTilt );
	light.shadow.camera.near = 0;
	light.shadow.camera.far = height * 5 + 100;
	light.shadow.camera.left = - height * 10;
	light.shadow.camera.right = height * 6;
	light.shadow.camera.top = height * 10;
	light.shadow.camera.bottom = - height * 4;
	light.shadow.mapSize.width = 4096;
	light.shadow.mapSize.height = 4096;

};
updateLight();
light.castShadow = true;
scene.add( light );

const light2 = new HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light2 );

const fog = new FogExp2( 0x000000, 0.005 );
scene.fog = fog;

const keyboard = {};
function onKey( e ) {

	if ( e.type === "keyup" ) keyboard[ e.key ] = false;
	else keyboard[ e.key ] = true;

}
window.addEventListener( "keydown", onKey );
window.addEventListener( "keyup", onKey );
window.addEventListener( "wheel", e => {

	camera.position.z *= e.deltaY > 0 ? 1.05 : 0.95;
	updateLight();

} );

const keys = [ "ArrowLeft", "a", "ArrowRight", "d", "ArrowUp", "w", "ArrowDown", "s" ];

function render() {

	requestAnimationFrame( render );
	if ( keys.some( key => keyboard[ key ] ) ) {

		if ( keyboard.ArrowLeft || keyboard.a ) camera.position.x -= camera.position.z / 100;
		if ( keyboard.ArrowRight || keyboard.d ) camera.position.x += camera.position.z / 100;
		if ( keyboard.ArrowUp || keyboard.w ) camera.position.y += camera.position.z / 100;
		if ( keyboard.ArrowDown || keyboard.s ) camera.position.y -= camera.position.z / 100;

		updateLight();

	}

	renderer.render( scene, camera );

}

render();
