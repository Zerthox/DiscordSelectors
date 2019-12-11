const path = require("path"),
	fs = require("fs"),
	minimist = require("minimist");

const args = minimist(process.argv);

const modules = require("../src/cssModules.json");

function toSass(obj, ind = 0) {
	switch (typeof obj) {
		case "number": {
			return `${obj}`;
		}
		case "boolean": {
			return `${obj}`;
		}
		case "string": {
			return `"${obj}"`;
		}
		case "object": {
			if (obj instanceof Array) {
				return `(\n${obj.map((el) => "\t".repeat(ind + 1) + toSass(el, ind + 1)).join(`,\n`)}\n${"\t".repeat(ind)})`;
			}
			else {
				return `(\n${Object.entries(obj).map(([key, val]) => `${"\t".repeat(ind + 1)}"${key}": ${toSass(val, ind + 1)}`).join(`,\n`)}\n${"\t".repeat(ind)})`;
			}
		}
		default: {
			throw `Unknown conversion for type ${typeof obj}: ${obj}`;
		}
	}
}

function countPrimitives(obj) {
	if (typeof obj === "object") {
		Object.keys(obj).map((k) => {
			if (parseInt(k)) {
				console.log(Object.keys(obj[k]).length);
			}
		});
		return Object.values(obj).reduce((a, b) => a + countPrimitives(b), 0);
	}
	else {
		return 1;
	}
}

if (args.count) {
	console.log(countPrimitives(modules));
}
else {
	fs.writeFileSync(path.resolve(__dirname, "../lib/_map.scss"), `$map: ${toSass(modules)};`);
}