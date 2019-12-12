const path = require("path"),
	fs = require("fs"),
	minimist = require("minimist");

const args = minimist(process.argv);

const components = require("../src/cssModules.json");

function preprocess(components) {
	for (const [id, component] of Object.entries(components)) {
		const keys = Object.keys(component),
			values = Object.values(component);
		for (const module of values) {
			for (const key of Object.keys(module)) {
				if (module[key].match(/^[a-zA-z]/)) {
					module[key] = `.${module[key].replace(/\s/g, ".")}`;
				}
			}
		}
		if (keys.length === 1) {
			components[id] = values[0];
		}
		else {
			let merge = true;
			for (const module of values) {
				for (const other of values) {
					if (other !== module) {
						merge = Object.keys(module).every((key) => !(key in other) || other[key] === module[key]);
					}
				}
			}
			if (merge) {
				components[id] = values.reduce((prev, el) => Object.assign(prev, el), {});
			}
			else {
				components[id] = values.reduce((prev, el) => Object.keys(prev).length > Object.keys(el).length ? prev : el);
				for (let i = 0; i < values.length; i++) {
					if (values[i] !== components[id]) {
						components[id][`${keys[i]}`] = values[i];
					}
				}
			}
		}
	}
}

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

function countUniqueIds(components) {
	const counted = {};
	let count = 0;
	for (const module of Object.values(components)) {
		for (const [id, classes] of Object.entries(module)) {
			if (!counted[id]) {
				count += Object.keys(classes).length;
				counted[id] = true;
			}
		}
	}
	return count;
}

if (args.count) {
	console.log(countUniqueIds(components));
}
else {
	preprocess(components);
	fs.writeFileSync(path.resolve(__dirname, "../lib/_map.scss"), `$map: ${toSass(components)};`);
}