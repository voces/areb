
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	DirectionalLight,
	HemisphereLight,
	PCFSoftShadowMap,
	Vector3,
	FogExp2
} from "./node_modules/three/build/three.module.js";

import DataReader from "./DataReader.mjs";
import w3eToEb from "./w3eToEb.mjs";
import Terrain from "./Terrain.mjs";

// import exampleTerrain from "./exampleTerrain.mjs";

document.querySelector( "input" ).addEventListener( "change", e => {

	const reader = new FileReader();
	reader.onload = evt => {

		const view = new DataView( evt.target.result );
		const reader = new DataReader( view );
		const terrainDef = w3eToEb( reader );
		// console.log( terrainDef );
		const terrain = new Terrain( {
			cliffmap: terrainDef.cliffmap,
			tilemap: terrainDef.tilemap,
			tileTypes: terrainDef.tileTypes,
			flagmap: terrainDef.flagmap,
			heightmap: terrainDef.heightmap
		} );
		scene.add( terrain.mesh );
		scene.add( terrain.waterMesh );

		camera.position.z = terrainDef.width * 0.4;
		camera.position.y = terrainDef.height * - 0.6;
		updateLight();

	};
	reader.readAsArrayBuffer( e.target.files[ 0 ] );

} );

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 10;
camera.position.y = - 12.5;
camera.rotation.x = 0.6;

// scene.add( exampleTerrain.mesh );

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

function render() {

	requestAnimationFrame( render );
	if ( keyboard.ArrowLeft || keyboard.ArrowRight || keyboard.ArrowUp || keyboard.ArrowDown ) {

		if ( keyboard.ArrowLeft ) camera.position.x -= camera.position.z / 100;
		if ( keyboard.ArrowRight ) camera.position.x += camera.position.z / 100;
		if ( keyboard.ArrowUp ) camera.position.y += camera.position.z / 100;
		if ( keyboard.ArrowDown ) camera.position.y -= camera.position.z / 100;

		updateLight();

	}

	renderer.render( scene, camera );

}

render();
