'use strict';

var async = require('async');
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var genUtils = require('./../util.js');

module.exports = yeoman.generators.Base.extend({

	init: function () {
		this.argument('name', {type: String, required: false});
		this.appname = this.name || path.basename(process.cwd());
		this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

		this.option('app-suffix', {
			desc: 'Allow a custom suffix to be added to the module name',
			type: String,
			required: 'false'
		});
		this.scriptAppName = this.appname + genUtils.appName(this);
		this.appPath = this.env.options.appPath;
		this.pkg = require('../../package.json');

		this.features = {};
	},

	checkForConfig: function () {
		var cb = this.async();

		if (this.config.get('features')) {
			this.features = this.config.get('features');
			this.prompt([{
				type: 'confirm',
				name: 'skipConfig',
				message: 'Existing .yo-rc configuration found, would you like to use it?',
				default: true
			}], function (answers) {
				this.skipConfig = answers.skipConfig;
				cb();
			}.bind(this));
		} else {
			cb();
		}
	},

	prompts: function () {
		if (this.skipConfig) return;
		var cb = this.async();
		var self = this;

		this.log('\n# Configuration\n');

		this.prompt([
			//{
			//	name: 'git',
			//	message: 'What might the Git repository URL may be?',
			//	default: undefined
			//},
			{
				type: 'confirm',
				name: 'auth',
				message: 'Shall I scaffold out a JWT authentication (with users and stuff)?',
				default: true
			},
			//{
			//	type: 'confirm',
			//	name: 'socketio',
			//	message: 'Would you like to use socket.io?',
			//	default: true
			//}
		], function (answers) {

			if (answers.socketio) {
				this.features.socketio = true;
			}

			if (answers.auth) {
				this.features.auth = true;
			}

			this.features.socketio = true;
			//this.gitrepo = answers.git;

			cb();
		}.bind(this));
	},

	saveSettings: function () {
		var appName = this.scriptAppName;

		function appModule(moduleName) {
			return ["'", appName, '.', moduleName, "'"].join('');
		}

		// global modules

		var ngModules = [
			"'ngCookies'",
			"'ngResource'",
			"'ngSanitize'",
			"'ngMessages'",
			"'ngMaterial'",
			"'ui.router'"
		];

		if (this.features.socketio) {
			ngModules.push("'btford.socket-io'");
		}

		// app modules

		ngModules.push(appModule('lodash'));
		ngModules.push(appModule('mainMenu'));
		// ngModules.push(appModule('mongooseError'));
		// ngModules.push(appModule('listImage'));
		// ngModules.push(appModule('resource'));
		// ngModules.push(appModule('toggleComponent'));
		// ngModules.push(appModule('toast'));
		// ngModules.push(appModule('remoteUnique'));

		if (this.features.socketio) {
			ngModules.push(appModule('io'));
			ngModules.push(appModule('socket'));
		}

		if (this.features.auth) {
			ngModules.push(appModule('auth'));
			ngModules.push(appModule('admin'));
			ngModules.push(appModule('account'));
		}

		// add main module as last element
		ngModules.push(appModule('main'));

		this.angularModules = ngModules.join(",\n\t\t\t");

		if (this.skipConfig) {
			return;
		}

		// common config
		this.config.set('appname', this.appname);

		// server config
		this.config.set('registerRoutesFile', 'server/routes.js');
		this.config.set('routesNeedle', '// Insert routes below');
		this.config.set('insertRoutes', true);
		this.config.set('routesBase', '/api/');
		this.config.set('pluralizeRoutes', true);
		this.config.set('insertSockets', this.features.socketio);
		this.config.set('registerSocketsFile', 'server/config/socketio.js');
		this.config.set('socketsNeedle', '// Insert sockets below');
		this.config.set('modulesNeedle', '// Add modules below');
		this.config.set('features', this.features);

		// default client config
		this.config.set('angularModules', ngModules);
		this.config.set('componentsDirectory', this.options.routeDirectory || 'client/app/components/');
		this.config.set('routeDirectory', this.options.routeDirectory || 'client/app/');
		this.config.set('directiveDirectory', this.options.directiveDirectory || 'client/app/components');
		this.config.set('filterDirectory', this.options.filterDirectory || 'client/app/components');
		this.config.set('serviceDirectory', this.options.serviceDirectory || 'client/app/components');
		this.config.set('basePath', this.options.basePath || 'app');
		this.config.set('moduleName', this.options.moduleName || '');
		this.config.set('extensions', this.options.extensions || ['js', 'html', 'scss']);
		this.config.forceSave();
	},

	generate: function () {
		this.sourceRoot(path.join(__dirname, './templates'));
		genUtils.processDirectory(this, '.', '.');
	},

	//prepareWorkspace: function () {
	//	'use strict';
	//	var that = this;
	//	var features = Array.prototype.slice.call(this.features).join(',');
	//
	//	function createSpawn(cmd, args) {
	//		return function spawn(cb) {
	//			that.spawnCommand(cmd, args).on('close', cb);
	//		};
	//	}
	//
	//	var tasks = [
	//		createSpawn('git', ['init']),
	//		createSpawn('git', ['flow', 'init', '-d']),
	//		createSpawn('git', ['checkout', 'master']),
	//		createSpawn('git', ['add', '.']),
	//		createSpawn('git', ['commit', '-m', '"chore(init): initial commit, ' + features + '"']),
	//		createSpawn('git', ['checkout', 'develop']),
	//		createSpawn('git', ['merge', 'master'])
	//	];
	//
	//	if (this.gitrepo) {
	//		tasks.push(createSpawn('git', ['remote', 'add', 'origin', this.gitrepo]));
	//		tasks.push(createSpawn('git', ['push', '-u', 'origin', 'master', 'develop']));
	//	}
	//
	//	async.series(tasks, function (err, results) {
	//		if (err) {
	//			console.log(err);
	//		}
	//	});
	//},

	end: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
