/*
 * Configurable paths and config parameters
 */
'use strict';

var path = require('path');
var fs = require('fs');
var rootPath = path.normalize(__dirname + '../../');
var bowerFiles = require('main-bower-files');

bowerFiles = bowerFiles({bowerrc: '.bowerrc', bowerJson: 'bower.json'});

var conf = {
	dirs: {
		root: rootPath,
		dist: 'dist',
		build: 'build',
		coverage: 'coverage',
		client: 'client',
		server: 'server',
		app: 'app',
		doc: 'docs', // will expand to $dirs.build/$dirs.doc/{client,server}
		plato: 'plato' // will expand to $dirs.build/$dirs.plato/{client,server}
	},
	targets: {
		html: {
			dir: 'client/',
			file: 'index.html'
		},
		css: {
			dir: 'client/styles/',
			file: 'app.css'
		},
		testReports: {
			path: path.join(rootPath, 'build', 'test-reports')
		}
	},
	src: {
		server: {
			js: ['!server/**/*.spec.js', 'server/**/*.js', 'bin/**/*.js'],
			unitTests: ['server/**/*.spec.js']
		},
		client: {
			js: [
				'!client/**/*.spec.js',
				'!client/**/*.mock.js',
				'client/app/**/*.js'
			],
			docs: {
				components: [
					'!client/app/components/**/*.spec.js',
					'!client/app/components/**/*.mock.js',
					'client/app/components/**/*.js'
				],
				app: [
					'!client/app/components/**/*.js',
					'client/app/**/*.js'
				]
			},
			unitTests: ['client/app/**/*.spec.js'],
			mocks: [
				'client/app/**/*.mock.js',
				'client/bower_components/angular-mocks/angular-mocks.js'
			],
			bower: bowerFiles
		},
		styles: ['client/styles/**/*.scss', 'client/app/**/*.scss'],
		html: ['client/**/*.html'],
		css: ['client/styles/app.css'],
		e2eTests: ['e2e/**/*.spec.js']
	},
	options: {
		jscs: {
			configPath: path.join(rootPath, '.jscsrc')
		},
		sass: {
			style: 'expanded',
			'sourcemap=none': true
		},
		autoprefixer: {
			browsers: ['> 10%', 'IE 9'],
			cascade: false
		},
		livereload: {
			port: 9090
		},
		expressPort: 9000,
		protractor: {
			args: [
				'--seleniumServerJar',
				'--verbose',
				'./node_modules/protractor/selenium/selenium-server-standalone-2.39.0.jar'
			],
			configFile: path.join(rootPath, 'protractor.conf.js')
		},
		karma: {
			configFile: path.join(rootPath, 'karma.conf.js'),
			singleRun: true,
			basePath: 'client/',
			frameworks: ['mocha', 'angular-filesort'],
			angularFilesort: {
				whitelist: [
					'app/**/*.js'
				]
			},
			appFiles: [
				'app/**/*.js',
				'bower_components/should/should.js',
				'bower_components/sinonjs/sinon.js'
			]
		},
		mocha: {
			ui: 'bdd',
			reporter: 'spec'
		},
		jshint: {
			server: {
				src: path.join(rootPath, './server/.jshintrc'),
				test: path.join(rootPath, './server/.jshintrc-spec')
			},
			client: {
				src: path.join(rootPath, './client/.jshintrc'),
				test: path.join(rootPath, './client/.jshintrc-spec')
			}
		},
		inject: {
			name: 'app',
			ignorePath: 'client',
			addRootSlash: false
		},
		browserSync: {
			proxy: 'localhost:9001',
			ghostMode: {
				clicks: true,
				forms: true,
				scroll: true
			},
			scrollThrottle: 200,
			reloadDelay: 500,
			notify: true
		},
		plato: {
			title: require('../package.json').name,
			jshint: {
				options: JSON.parse(fs.readFileSync('./client/.jshintrc'))
			}
		}
	}
};

// merge javascript source file configurations
conf.src.js = conf.src.server.js.concat(conf.src.client.js);
conf.src.unitTests = conf.src.server.unitTests.concat(conf.src.client.unitTests);

// app path to main index.html
conf.targets.html.path = path.join(conf.targets.html.dir, conf.targets.html.file);

// files needed for running client unit tests (karma tests)
// rewrite absolute paths for karma, options doesn't work?
conf.options.karma.files = (
	conf.src.client.bower.map(function (e) { // rewrite absolute file system paths
		return e.substr(e.indexOf('bower_components') - 1);
	})
		.concat(conf.src.client.mocks)
		.concat(conf.src.client.unitTests)
		.concat(conf.options.karma.appFiles)
).map(function (e) {
		if (e.indexOf(conf.options.karma.basePath) === 0) {
			e = e.substr(conf.options.karma.basePath.length);
		}

		if (e.indexOf('/') === 0) {
			return e.substr(1);
		}

		return e;
	});

module.exports = conf;
