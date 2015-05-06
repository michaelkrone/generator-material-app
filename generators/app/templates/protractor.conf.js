// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

'use strict';

var conf = require('./gulp/config');

exports.config = {

	// The timeout for each script run on the browser. This should be longer
	// than the maximum time your application needs to stabilize between tasks.
	allScriptsTimeout: 110000,

	// A base URL for your application under test. Calls to protractor.get()
	// with relative paths will be prepended with this.
	baseUrl: 'http://localhost:' + (process.env.PORT || '9001'),

	// list of files / patterns to load in the browser
	specs: conf.src.client.bower
		.concat(conf.src.client.js)
		.concat('e2e/**/*.spec.js'),

	// Patterns to exclude.
	exclude: [],

	// ----- Capabilities to be passed to the webdriver instance ----
	//
	// For a full list of available capabilities, see
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities
	// and
	// https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
	capabilities: {
		'browserName': 'chrome'
	},

	// If true, use direct connect to get the wd
	// Tests for browsers other than chrome or firefox will not run.
	directConnect: true,

	// ----- The test framework -----
	//
	// Jasmine and Cucumber are fully supported as a test and assertion framework.
	// Mocha has limited beta support. You will need to include your own
	// assertion framework if working with mocha.
	framework: 'jasmine',

	// ----- Options to be passed to minijasminenode -----
	//
	// See the full list at https://github.com/juliemr/minijasminenode
	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000,
		isVerbose: true
	}
};
