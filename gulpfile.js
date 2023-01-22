const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sourcemaps = require ('gulp-sourcemaps');
const {src, series, parallel, dest, watch} = require('gulp');
// Edit working path here
const jsPath = 'src/assets/js/**/*.js';
const cssPath = 'src/assets/css/components/tabs/tabs.css';

function jsBundler() {
    return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

function cssBundler() {
    return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

exports.jsBundler = jsBundler;
exports.cssBundler = cssBundler;