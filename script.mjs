
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, DirectionalLight } from "./node_modules/three/build/three.module.js";

import DataReader from "./DataReader.mjs";
import w3eToEb from "./w3eToEb.mjs";
import Terrain from "./Terrain.mjs";

document.querySelector( "input" ).addEventListener( "change", e => {

	const reader = new FileReader();
	reader.onload = evt => {

		const view = new DataView( evt.target.result );
		const reader = new DataReader( view );
		const terrainDef = w3eToEb( reader );
		console.log( terrainDef );
		const terrain = new Terrain( {
			cliffmap: terrainDef.cliffmap,
			tilemap: terrainDef.tilemap,
			tileTypes: terrainDef.tileTypes
		} );
		scene.add( terrain.mesh );

		// camera.position.z = terrainDef.width * 0.6;
		camera.position.z = terrainDef.width * 0.4;
		// camera.position.y = terrainDef.height * - 0.8;
		camera.position.y = terrainDef.height * - 0.6;

	};
	reader.readAsArrayBuffer( e.target.files[ 0 ] );

} );

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 10;
camera.position.y = - 12.5;
camera.rotation.x = 0.6;

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshBasicMaterial( { color: 0x005520 } );
const cube = new Mesh( geometry, material );
scene.add( cube );

const light = new DirectionalLight( 0xffffff, 0.75 );
light.position.set( - 10, - 15, 25 );
light.shadow.camera.near = 0;
light.shadow.camera.far = 100;
light.shadow.camera.left = - 2 * 18;
light.shadow.camera.right = 2 * 18;
light.shadow.camera.top = 2 * 9;
light.shadow.camera.bottom = - 2 * 9;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;

light.castShadow = true;
scene.add( light );

function render() {

	requestAnimationFrame( render );
	cube.rotation.x += .01;
	cube.rotation.y += .04;
	renderer.render( scene, camera );

}

render();
