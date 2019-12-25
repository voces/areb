
import {
	BufferAttribute,
	Color,
} from "../../node_modules/webcraft/node_modules/three/build/three.module.js";

export default ( GeometryClass, color = new Color( 0x00ff00 ), ...geometryArgs ) => {

	const geometry = new GeometryClass( ...geometryArgs ).rotateX( Math.PI / 2 ).toNonIndexed();
	let flipFlop = 0;
	geometry.addAttribute(
		"color",
		new BufferAttribute(
			new Float32Array( new Array( geometry.attributes.position.count / 3 ).fill().map( () => {

				const r = flipFlop % 2 === 0 ? color.r : 0;
				const g = flipFlop % 2 === 0 ? color.g : 0;
				const b = flipFlop % 2 === 0 ? color.b : 0;
				flipFlop ++;
				return [ r, g, b, r, g, b, r, g, b ];

			} ).flat() ),
			3
		)
	);

	return geometry;

};
