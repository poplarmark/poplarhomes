const gulp = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const { src, series, parallel, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
// Edit working path here
// const jsPath = 'src/assets/js/**/*.js';
// const cssPath = 'src/assets/css/**/*.css';
// Create random ID
function makeid() {
  return (Math.random() + 1).toString(36).substring(7);
}

const jsPath ="src/assets/js/components/form_renters-estimate/renters-estimate.js";
const cssPath = "src/assets/scss/components/form_insights/form_insights.scss";

function jsBundler() {
  return src(jsPath)
    .pipe(rename({suffix: ".min",}))
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/js"));
}

function cssBundler() {
  return src(cssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename({suffix: "@"+makeid()+".min",}))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/css"));
}

exports.jsBundler = jsBundler;
exports.cssBundler = cssBundler;
