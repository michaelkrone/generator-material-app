/**
 * Usage
 * gulp [task]  --env development
 */
'use strict';

var gulp = require('gulp');
var del = require('del');
var minimist = require('minimist');
var requireDir = require('require-dir');
var conf = require('./gulp/config');

// all known options that can be passed by --option
// and their defaults
var knownOptions = {
	string: ['env'],
	default: {
		env: process.env.NODE_ENV || 'test'
	}
};

// parse optional arguments and set environment variables
var options = minimist(process.argv.slice(2), knownOptions);
process.env.NODE_ENV = options.env;

// include tasks
requireDir('./gulp/tasks');

/**
 * Default task definitions
 */

/**
 * Clean task
 * Removes the dist and build directories
 */
gulp.task('clean', function () {
	return del([conf.dirs.dist, conf.dirs.build]);
});

/**
 * Grouped task definitions
 */
gulp.task('default', ['build']);
