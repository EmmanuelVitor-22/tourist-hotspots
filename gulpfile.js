const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const connect = require("gulp-connect");

const path = {
    html: {
        all: "src/page/**/*.html",
    },
    assets: {
        all: "src/assets/**",
    },
    styles: {
        all: "src/styles/**/*.scss",
        main: "src/styles/main.scss",
    },
    scripts: {
        all: "src/scripts/**/*.js",
        main: "src/scripts/app.js",
    },
    output: "dist",
};

function server() {
    connect.server({
        root: "dist",
        livereload: true,
        port: 3000,
    });
}

function sentinel() {
    watch(path.html.all, { ignoreInitial: false }, html);
    watch(path.styles.all, { ignoreInitial: false }, styles);
    watch(path.scripts.all, { ignoreInitial: false }, scripts);
    watch(path.assets.all, { ignoreInitial: false }, assets);
}

function html() {
    return src(path.html.all).pipe(dest(path.output));
}
function assets() {
    return src(path.assets.all).pipe(dest(path.output));
}
function styles() {
    return src(path.styles.main)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(dest(path.output))
        .pipe(connect.reload());
}
function scripts() {
    return browserify(path.scripts.main)
        .transform(
            babelify.configure({
                presets: ["@babel/preset-env"],
            })
        )
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest(path.output))
        .pipe(connect.reload());
}

exports.default = parallel(server, sentinel);
