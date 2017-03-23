var gulp = require('gulp');
//var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var svgMin = require('gulp-svgmin');

var paths = {
  bootstrap: 'src/vendors/css/bootstrap.css',
  sass: 'src/resources/scss/*.scss',
  html: 'src/index.html',
  js: [ 'src/vendors/js/bootstrap.js' ],
  svg: 'src/resources/img/*.svg'
};

function style() {
  return gulp.src([ paths.sass, paths.bootstrap ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'));
}

function htmlMinify() {
  return gulp.src(paths.html)
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
}

function javaScriptUglify() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js'));
}

function watch() {
  gulp.watch([ paths.sass, paths.bootstrap ], style);
  gulp.watch(paths.js, javaScriptUglify);
  gulp.watch(paths.html, htmlMinify);
}

function svgMinify() {
  return gulp.src(paths.svg)
    .pipe(svgMin())
    .pipe(gulp.dest('dist/img/'));
}

var build = gulp.series(style, javaScriptUglify, svgMinify, htmlMinify, watch);

gulp.task('default', build);
