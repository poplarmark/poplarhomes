const gulp = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require("gulp-sourcemaps");
const { src, series, parallel, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
// Edit working path here
// const jsPath = 'src/assets/js/**/*.js';
// const cssPath = 'src/assets/css/**/*.css';

const jsPath =
  "src/assets/js/components/form_renters-estimate/renters-estimate.js";
const cssPath = "src/assets/models/geomarket.scss";

function jsBundler() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/js"));
}

function cssBundler() {
  return src(cssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/css"));
}

exports.jsBundler = jsBundler;
exports.cssBundler = cssBundler;
