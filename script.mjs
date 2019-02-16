
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from "./node_modules/three/build/three.module.js";

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

	};
	reader.readAsArrayBuffer( e.target.files[ 0 ] );

} );

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function render() {

	requestAnimationFrame( render );
	renderer.render( scene, camera );

}

render();
