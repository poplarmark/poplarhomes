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
function timeStamp () {
  let date = new Date();
  let timestamp = date.getTime();
  return timestamp;
}

const jsPath ="src/assets/js/utils/wf-custom-form-submit.js";
const cssPath = "src/assets/scss/components/form_insights/form_insights.scss";

function jsBundler() {
  return src(jsPath)
    // .pipe(rename({suffix: "_v."+timeStamp()+".min",})) // with versioning
    .pipe(rename({suffix: ".min",}))
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/js"));
}

function cssBundler() {
  return src(cssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename({suffix: "_v."+makeid()+".min",}))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/css"));
}

exports.jsBundler = jsBundler;
exports.cssBundler = cssBundler;
