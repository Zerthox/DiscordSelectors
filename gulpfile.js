const pkg = require("./package.json");

const gulp = require("gulp"),
	del = require("del"),
	rename = require("gulp-rename"),
	sort = require("gulp-sort"),
	tap = require("gulp-tap"),
	merge = require("gulp-merge-json"),
	yaml = require("gulp-yaml");

const files = {
	in: [
		"src/[^_]**/[^_]*.yaml",
		"src/[^_]**/[^_]*.yml"
	],
	out: {
		folder: "dist",
		map: "_selectors.map.json",
		json: "selectors.json",
		scssMap: "selectorMap.scss",
		scssPlaceholders: "selectorPlaceholders.scss"
	}
};

const headers = {
	scss: `/*! Powered by DiscordSelectors v${pkg.version} */`
};

gulp.task("clean", () => del(`${files.out.folder}/**`, {force: true}));

function buildMap() {
	return gulp.src(files.in)
		.pipe(sort())
		.pipe(yaml())
		.pipe(merge({
			fileName: files.out.map,
			edit: (content, file) => {
				const r = {};
				var o = r;
				for (var s of file.relative.split(/[\\/]/).slice(0, -1)) {
					o[s] = {};
					o = o[s];
				}
				o[file.stem] = content;
				return r;
			}
		}))
		.pipe(gulp.dest(files.out.folder));
}

function buildJSON() {
	return gulp.src(files.in)
		.pipe(sort())
		.pipe(yaml())
		.pipe(merge({
			fileName: files.out.json
		}))
		.pipe(tap((file) => {
			const content = JSON.parse(file.contents);
			for (const key in content) {
				if (typeof content[key] == "string") {
					while (content[key].indexOf("%") > -1) {
						const match = content[key].match(/%[\w-]+/)[0];
						if (match.slice(1) === key) {
							throw new Error(`Self reference at selector "${key}"`);
						}
						const replace = content[match.slice(1)];
						if (typeof replace != "string") {
							throw new Error(`Unknown selector reference "${match}" at selector "${key}"`);
						}
						content[key] = content[key].replace(match, replace);
					}
				}
			}
			file.contents = Buffer.from(JSON.stringify(content, null, "\t"));
		}))
		.pipe(gulp.dest(files.out.folder));
}

function buildSCSSMap() {
	return gulp.src(`${files.out.folder}/${files.out.json}`)
		.pipe(tap((file) => {
			const content = JSON.parse(file.contents);
			const out = [];
			for (const key in content) {
				out.push(`	"${key}": "${content[key]}"`);
			}
			file.contents = Buffer.from(`${headers.scss}\n$selectors: (\n${out.join(",\n")}\n);`);
		}))
		.pipe(rename({basename: "", extname: files.out.scssMap}))
		.pipe(gulp.dest(files.out.folder));
}

function buildSCSSPlaceholders() {
	return gulp.src(`${files.out.folder}/${files.out.json}`)
		.pipe(tap((file) => {
			const content = JSON.parse(file.contents);
			const out = [];
			for (const key in content) {
				out.push(`${content[key]} {\n	@extend %${key} !optional;\n}`);
			}
			file.contents = Buffer.from(`${headers.scss}\n${out.join("\n")}`);
		}))
		.pipe(rename({basename: "", extname: files.out.scssPlaceholders}))
		.pipe(gulp.dest(files.out.folder));
}

// function transpile(obj, path) {
// 	const r = [];
// 	for (const k of Object.keys(obj)) {
// 		const p = path.slice(0);
// 		p.push(k);
// 		if (obj[k] instanceof Object) {
// 			r.push(transpile(obj[k], p));
// 		}
// 		else {
// 			r.push(`${obj[k]} {\n	@extend %${p.join("-")} !optional;\n}`);
// 		}
// 	}
// 	return r.join("\n");
// }

gulp.task("build", gulp.series("clean", gulp.parallel(buildMap, gulp.series(buildJSON, gulp.parallel( buildSCSSMap, buildSCSSPlaceholders)))));

gulp.task("watch", () => gulp.watch(files.in, gulp.series("build")));