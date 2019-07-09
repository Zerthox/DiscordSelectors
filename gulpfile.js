const pkg = require("./package.json");

const gulp = require("gulp"),
	path = require("path"),
	del = require("del"),
	through2 = require("through2"),
	Vinyl = require("vinyl"),
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

function generateMap() {
	return gulp.src(files.in)
		.pipe(sort())
		.pipe(yaml())
		.pipe(merge({
			fileName: files.out.map,
			edit: (content, file) => {
				const r = {};
				var o = r;
				for (const s of file.relative.split(/[\\/]/).slice(0, -1)) {
					o[s] = {};
					o = o[s];
				}
				o[file.stem] = content;
				return r;
			}
		}))
		.pipe(gulp.dest(files.out.folder));
}

function buildSelectors() {
	return gulp.src(files.in)
		.pipe(sort())
		.pipe(yaml())
		.pipe(merge({
			fileName: files.out.json
		}))
		.pipe(tap((file) => {
			const content = JSON.parse(file.contents);
			for (const key in content) {
				if (typeof content[key] === "string") {
					while (content[key].indexOf("%") > -1) {
						const match = content[key].match(/%[\w-]+/)[0];
						if (match.slice(1) === key) {
							throw new Error(`Self reference at selector "${key}"`);
						}
						const replace = content[match.slice(1)];
						if (typeof replace !== "string") {
							throw new Error(`Unknown selector reference "${match}" at selector "${key}"`);
						}
						content[key] = content[key].replace(match, replace);
					}
				}
			}
			file.contents = Buffer.from(JSON.stringify(content, null, "\t"));
		}))
		.pipe(gulp.dest(files.out.folder))
		.pipe(through2.obj(function(file, enc, callback) {
			const content = JSON.parse(file.contents);
			const base = path.join(file.path, "../");
			const map = [],
				placeholders = [];
			for (const key in content) {
				map.push(`	"${key}": "${content[key]}"`);
				placeholders.push(`${content[key]} {\n	@extend %${key} !optional;\n}`);
			}
			this.push(new Vinyl({
				base: base,
				path: path.join(base, files.out.scssMap),
				contents: Buffer.from(`${headers.scss}\n$selectors: (\n${map.join(",\n")}\n);`)
			}));
			this.push(new Vinyl({
				base: base,
				path: path.join(base, files.out.scssPlaceholders),
				contents: Buffer.from(`${headers.scss}\n${placeholders.join("\n")}`)
			}));
			callback();
		}))
		.pipe(gulp.dest(files.out.folder));
}

gulp.task("build", gulp.series("clean", gulp.parallel(generateMap, buildSelectors)));

gulp.task("watch", () => gulp.watch(files.in, gulp.series("build")));