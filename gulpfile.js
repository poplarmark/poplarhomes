const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require ('gulp-sourcemaps');
const {src, series, parallel, dest, watch} = require('gulp');

const jsPath = 'src/assets/js/**/*.js';

function copyHTML() {
    return src('src/*.html').pipe(gulp.dest('dist'));
}

function jsBundler() {
    return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('webflow-mna.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

exports.default = copyHTML;
exports.default = jsBundler;