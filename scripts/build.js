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

if (args.count) {
	console.log(Object.values(modules).reduce((a, b) => a + Object.keys(b).length, 0));
}
else {
	fs.writeFileSync(path.resolve(__dirname, "../lib/_map.scss"), `$map: ${toSass(modules)};`);
}