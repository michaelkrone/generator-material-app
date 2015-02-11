/*
 * Tasks performing tests on code, style and functionality
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');
var jscs = require('gulp-jscs');
var utils = require('gulp-util');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var protractor = require('gulp-protractor').protractor;
var conf = require('../config');

module.exports = {
	jshintFn: jshintFn,
	testFn: testFn,
	jscsFn: jscsFn
};

/**
 * Pipe jshint
 * @param src     glob of source files to lint
 * @param config  the jshint config object to use
 */
function jshintFn(src, config) {
	return gulp.src(src)
		.pipe(jshint(config))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
		.on('error', utils.log);
};

/**
 * Pipe mocha tests
 * @param src     glob of test files to run
 * @param reporter the mocha reporter to use
 */
function testFn(src, reporter) {
	reporter = reporter && { reporter: reporter } || {};
	return gulp.src(src, {read: false})
		.pipe(mocha( _.defaults(reporter, conf.options.mocha) ))
		.on('error', utils.log);
};

/**
 * Pipe jscs
 * @param src     glob of source files to check
 * @param config  the jscs config object to use
 */
function jscsFn(src, config) {
	return gulp.src(src)
		.pipe(jscs(config))
		.on('error', utils.log);
};

/**
 * jshint:client tasks
 * Lint client JavaScript source files
 */
gulp.task('jshint:client', function () {
	return jshintFn(conf.src.client.js, conf.options.jshint.client.src);
});

/**
 * jshint:client tasks
 * Lint server JavaScript source files
 */
gulp.task('jshint:server', function () {
	return jshintFn(
		conf.src.server.js,
		conf.options.jshint.server.src);
});

/**
 * jshint:test:client tasks
 * Lint client JavaScript unit and e2e test files
 */
gulp.task('jshint:test:client', function () {
	return jshintFn(
		conf.src.client.unitTests.concat(conf.src.e2eTests),
		conf.options.jshint.client.test);
});

/**
 * jshint:test:server tasks
 * Lint server JavaScript unit and e2e test files
 */
gulp.task('jshint:test:server', function () {
	return jshintFn(
		conf.src.server.unitTests.concat(conf.src.e2eTests),
		conf.options.jshint.server.test);
});

/**
 * test task
 * Run server unit tests
 */
gulp.task('unit:server', function () {
	return testFn(conf.src.server.unitTests, null);
});

/**
 * karma-test task
 * Run client unit tests with karma
 */
gulp.task('unit:client', function () {
	karma.start(conf.options.karma);
});

/**
 * e2e task
 * Run e2e-tests
 */
gulp.task('e2e', function () {
	require(path.join(conf.dirs.root, 'bin/server.js'));
	gulp.src(conf.src.e2eTests)
		.pipe(protractor(conf.options.protractor))
		.on('error', utils.log);
});

/**
 * codestyle task for server files
 * Run js code style tests
 */
gulp.task('codestyle:server', function () {
	return jscsFn(
		conf.src.server.js.concat(conf.src.server.unitTests),
		conf.options.jscs);
});

/**
 * codestyle task for client files
 * Run js code style tests
 */
gulp.task('codestyle:client', function () {
	return jscsFn(
		conf.src.client.js.concat(conf.src.client.unitTests),
		conf.options.jscs);
});

gulp.task('jshint:server', ['jshint:server', 'jshint:test:server']);

gulp.task('jshint:client', ['jshint:client', 'jshint:test:client']);

gulp.task('jshint', ['jshint:server', 'jshint:client']);

gulp.task('unit', ['unit:server', 'unit:client']);

gulp.task('codestyle', ['codestyle:server', 'codestyle:client']);

gulp.task('lint', ['jshint', 'codestyle']);

gulp.task('test', ['lint', 'unit', 'e2e']);

