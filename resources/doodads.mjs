
import Fence from "./meshes/Fence.mjs";
import PineTree from "./meshes/PineTree.mjs";
import Trough from "./meshes/Trough.mjs";
import RockChunks from "./meshes/RockChunks.mjs";

export default {
	VOfl: { name: "Fence Long", mesh: Fence },
	VOfs: { name: "Fence Short", mesh: Fence, length: 1 },
	LTlt: { name: "Summer Tree Wall", mesh: PineTree },
	LOtr: { name: "Trough", mesh: Trough },
	_LOsm: { name: "Smoke Smudge" }, // https://i.imgur.com/p4NdFy9.png
	_NOfp: { name: "Fire Pit" }, // https://i.imgur.com/JIu534i.png
	_LSsb: { name: "Barn Scorched" }, // https://i.imgur.com/t8PCJXJ.jpg
	_LOwr: { name: "Wheelbarrow Broken" }, // https://i.imgur.com/8kKkSQb.png
	LTrc: { name: "Rock Chunks", mesh: RockChunks }, // https://i.imgur.com/k7QVcch.png
	_LOcb: { name: "Hay Cart Broken" }, // https://i.imgur.com/a81UHEe.png
	_AObd: { name: "Birds" }, // https://i.imgur.com/Q92xnKP.jpg
	_NObt: { name: "Bats" }, // https://i.imgur.com/8xpkZ3r.png
	_DOjp: { name: "Pile of Junk" } // https://i.imgur.com/J7Sytkh.jpg
};
