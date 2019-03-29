
import BrokenHayCart from "../node_modules/notextures/src/meshes/BrokenHayCart.mjs";
import BrokenWheelbarrow from "../node_modules/notextures/src/meshes/BrokenWheelbarrow.mjs";
import Fence from "../node_modules/notextures/src/meshes/Fence.mjs";
import PileOfJunk from "../node_modules/notextures/src/meshes/PileOfJunk.mjs";
import PineTree from "../node_modules/notextures/src/meshes/PineTree.mjs";
import RockChunks from "../node_modules/notextures/src/meshes/RockChunks.mjs";
import ScorchedBarn from "../node_modules/notextures/src/meshes/ScorchedBarn.mjs";
import Trough from "../node_modules/notextures/src/meshes/Trough.mjs";

// TODO: names should be baked into the model
export default {
	VOfl: { name: "Fence Long", mesh: Fence },
	VOfs: { name: "Fence Short", mesh: Fence, length: 1 },
	LTlt: { name: "Summer Tree Wall", mesh: PineTree },
	LOtr: { name: "Trough", mesh: Trough },
	_LOsm: { name: "Smoke Smudge" }, // https://i.imgur.com/p4NdFy9.png
	_NOfp: { name: "Fire Pit" }, // https://i.imgur.com/JIu534i.png
	LSsb: { name: "Scorched Barn", mesh: ScorchedBarn },
	LOwr: { name: "Broken Wheelbarrow", mesh: BrokenWheelbarrow },
	LTrc: { name: "Rock Chunks", mesh: RockChunks },
	LOcb: { name: "Broken Hay Cart", mesh: BrokenHayCart },
	_AObd: { name: "Birds" }, // https://i.imgur.com/Q92xnKP.jpg
	_NObt: { name: "Bats" }, // https://i.imgur.com/8xpkZ3r.png
	DOjp: { name: "Pile of Junk", mesh: PileOfJunk } // https://i.imgur.com/J7Sytkh.jpg
};
