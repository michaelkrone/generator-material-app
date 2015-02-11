/*
 * Tasks related to development:
 * watch, ...
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var utils = require('gulp-util');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var conf = require('../config');

/**
 * browser-sync task task
 * Start the browser-sync server
 */
// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
	browserSync(conf.options.browserSync);
});

/**
 * watch task`
 * Watch on javascript files, tests and sass files
 */
gulp.task('watch', ['build', 'browser-sync'], function () {
	require(path.join(conf.dirs.root, 'bin/server.js'));
	gulp.watch(conf.src.js, ['test', reload]);
	gulp.watch(conf.src.styles, ['sass', reload]);
	gulp.watch(conf.src.html, reload);
	gulp.watch(conf.src.css, reload);
});
