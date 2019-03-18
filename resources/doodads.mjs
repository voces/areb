
import Fence from "./meshes/Fence.mjs";
import PineTree from "./meshes/PineTree.mjs";
import Trough from "./meshes/Trough.mjs";

export default {
	VOfl: { name: "Fence Long", mesh: Fence },
	VOfs: { name: "Fence Short", mesh: Fence, length: 1 },
	LTlt: { name: "Summer Tree Wall", mesh: PineTree },
	LOtr: { name: "Trough", mesh: Trough }
};
