
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from "./node_modules/three/build/three.module.js";

import w3eToEb from "./w3eToEb.mjs";
import Terrain from "./Terrain.mjs";

document.querySelector( "input" ).addEventListener( "change", e => {

	const reader = new FileReader();
	reader.onload = evt => {

		const buffer = new Uint8Array( evt.target.result );

	};

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
