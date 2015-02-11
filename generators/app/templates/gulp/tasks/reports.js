/*
 * Tasks related to report generation:
 * generate reports and documentation ...
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var istanbul = require('gulp-istanbul');
var karma = require('karma').server;
var plato = require('gulp-plato');
var utils = require('gulp-util');
var jsdoc = require('gulp-jsdoc');
var conf = require('../config');
var tests = require('./tests.js'); // require tests for reuse of test functions

/**
 * test report task for server files
 * Run unit tests with junit reporter
 */
gulp.task('junit:server', function () {
	return tests.testFn(conf.src.server.unitTests, 'mocha-jenkins-reporter');
});

/**
 * test report task for client files
 * Run unit tests
 */
gulp.task('junit:client', function () {
	return tests.testFn(conf.src.client.unitTests, 'mocha-jenkins-reporter');
});

/**
 * coverage:server task
 * Run code coverage on server files
 */
gulp.task('coverage:server', function (cb) {
	var outDir = path.join(conf.dirs.build, conf.dirs.coverage, 'server');
	return gulp.src(conf.src.server.js)
		.pipe(istanbul())
		.on('finish', function () {
			tests.testFn(conf.src.server.unitTests, false)
				.pipe(istanbul.writeReports({
					dir: outDir,
					reporters: ['html', 'cobertura']
				}))
				.on('error', utils.log);
				// .on('end', cb);
		})
		.on('error', utils.log);
});

/**
 * coverage:client task
 * Run code coverage on client files
 */
gulp.task('coverage:client', function (cb) {
	karma.start(conf.options.karma);
});

/**
 * analyze:server task
 * Generates the code metrics report for server files
 */
gulp.task('analyze:server', function () {
	var outDir = path.join(conf.dirs.build, conf.dirs.plato, 'client');
	var jshintOpt = JSON.parse(fs.readFileSync(conf.options.jshint.server.src));
	return gulp.src(conf.src.server.js)
		.pipe(plato(outDir, {
			title: require('./../../package.json').name,
			jshint: {
				options: jshintOpt
			}
		})
	).on('error', utils.log);
});

/**
 * analyze:client task
 * Generates the code metrics report for client files
 */
gulp.task('analyze:client', function () {
	var outDir = path.join(conf.dirs.build, conf.dirs.plato, 'server');
	return gulp.src(conf.src.client.js)
		.pipe(plato(outDir, conf.options.plato)
	).on('error', utils.log);
});

/**
 * jsdoc task
 * Generate the JavaScript documentation
 */
gulp.task('jsdoc', function () {
	var docPath = path.join(conf.dirs.build, conf.dirs.doc);
	return gulp.src(conf.src.js)
		.pipe(jsdoc(docPath))
		.on('error', utils.log);
});

gulp.task('coverage', ['coverage:server', 'coverage:client']);

gulp.task('analyze', ['analyze:server', 'analyze:client']);

gulp.task('junit', ['junit:server', 'junit:client']);

gulp.task('reports', ['junit', 'coverage', 'analyze', 'jsdoc']);
