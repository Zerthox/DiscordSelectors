const pkg = require("./package.json");

const gulp = require("gulp"),
	fs = require("fs"),
	del = require("del"),
	concat = require("gulp-concat"),
	file = require("gulp-file"),
	header = require("gulp-header"),
	merge = require("gulp-merge-json"),
	yaml = require("gulp-yaml");

const files = {
	in: [
		"src/**/*.yaml",
		"src/**/*.yml"
	],
	out: {
		folder: "dist",
		map: "selectors.map.json",
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
		.pipe(yaml())
		.pipe(merge({
			fileName: files.out.json
		}))
		.pipe(gulp.dest(files.out.folder));
}

function buildSCSSMap() {
	const content = JSON.parse(fs.readFileSync(`${files.out.folder}/${files.out.json}`));
	const out = [];
	for (const key of Object.keys(content)) {
		out.push(`	"${key}": "${content[key]}"`);
	}
	return file(files.out.scssMap, `$selectors: (\n${out.join(",\n")}\n);`, {src: true})
		.pipe(header(`${headers.scss}\n`))
		.pipe(gulp.dest(files.out.folder));
}

function buildSCSSPlaceholders() {
	const content = JSON.parse(fs.readFileSync(`${files.out.folder}/${files.out.json}`));
	const out = [];
	for (const key of Object.keys(content)) {
		out.push(`${content[key]} {\n	@extend %${key} !optional;\n}`);
	}
	return file(files.out.scssPlaceholders, out.join("\n"), {src: true})
		.pipe(header(`${headers.scss}\n`))
		.pipe(gulp.dest(files.out.folder));
}

// function transpile(obj) {
// 	const r = [];
// 	for (const key of Object.keys(obj)) {
// 		if (obj[key] instanceof Object) {
// 			r.push(transpile(obj[key]));
// 		}
// 		else {
// 			r.push(`${obj[key]} {\n	@extend %${key} !optional;\n}`);
// 		}
// 	}
// 	return r.join("\n");
// }

gulp.task("build", gulp.series("clean", gulp.parallel(buildMap, buildJSON), gulp.parallel(buildSCSSMap, buildSCSSPlaceholders)));

gulp.task("watch", () => gulp.watch(files.in, gulp.series("build")));