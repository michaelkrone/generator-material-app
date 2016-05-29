/*
 * Tasks related to build something or without the app is not usable:
 * sass, dist, js annotate, minify, inject ...
 */
'use strict';

var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var inject = require('gulp-inject');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var utils = require('gulp-util');
var angularFilesort = require('gulp-angular-filesort');
var conf = require('../config');

/**
 * inject task
 * Auto-inject app and vendor scripts and styles to index html file
 */
gulp.task('inject', ['sass'], function () {
  var vendorConfig = _.defaults({name: 'vendor'}, conf.options.inject);
  return gulp.src(conf.targets.html.path)
    .pipe(inject(gulp.src(conf.src.css, {read: false}), conf.options.inject))
    .pipe(inject(gulp.src(conf.src.client.js).pipe(angularFilesort()), conf.options.inject))
    .pipe(inject(gulp.src(conf.src.client.bower, {read: false}), vendorConfig))
    .pipe(gulp.dest(conf.targets.html.dir));
});

/**
 * sass task
 * Compile scss files from the project into app/styles/app.css
 */
gulp.task('sass', function () {
  var css = sass(conf.src.styles, conf.options.sass)
    .pipe(gulpif(process.env.NODE_ENV === 'production', minifycss(conf.options.minifycss)))
    .on('error', utils.log);

  return css.pipe(concat(conf.targets.css.file))
    .pipe(gulp.dest(conf.targets.css.dir))
    .on('error', utils.log);
});

gulp.task('build', ['inject']);
