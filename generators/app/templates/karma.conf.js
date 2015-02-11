// Karma configuration

var conf = require('./gulp/config');

module.exports = function(config) {
	config.set({

		basePath: conf.options.karma.basePath,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],

		// spec and mock files, test runner and index.html
		files: conf.options.karma.files,

		// // list of files to exclude
		// exclude: [
		//	 'app/**/*.spec.js'
		// ],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],


		// configure the reporter
		coverageReporter: {
			type : 'html',
			dir : 'build/coverage/client'
		},

		// web server port
		port: 9654,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS']

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		// ,singleRun: false
	});
};
