'use strict';

var async = require('async');
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var genUtils = require('./../util.js');

module.exports = yeoman.generators.Base.extend({

	initializing: {
		init: function () {
			this.argument('name', {type: String, required: false});
			this.appname = this.name || path.basename(process.cwd());
			this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
			this.humanName = this.appname.charAt(0).toUpperCase() + this.appname.slice(1);

			this.option('app-suffix', {
				desc: 'Allow a custom suffix to be added to the module name',
				type: String,
				required: 'false'
			});
			this.scriptAppName = this.appname + genUtils.appName(this);
			this.componentModule = this.scriptAppName + '.components';
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
					// read all properties needed for the app generator
					this.materialAccentTheme = this.config.get('materialAccentTheme');
					this.materialPrimaryTheme = this.config.get('materialPrimaryTheme');
					this.angularModules = this.config.get('angularModules');
					this.gitrepo = this.config.get('gitrepo');
					this.createFeaturesPage = this.config.get('createFeaturesPage');
					this.scriptAppName = this.config.get('appname');
					this.componentModule = this.scriptAppName + '.components';

					cb();
				}.bind(this));
			} else {
				cb();
			}
		}
	},


	prompting: function prompting() {
		if (this.skipConfig) return;
		var cb = this.async();

		this.log('\n# Configuration\n');

		this.prompt([
			{
				name: 'gitrepo',
				message: 'What might the Git repository URL may be? (Empty for no git)',
				default: undefined
			},
			{
				name: 'auth',
				type: 'confirm',
				message: 'Shall I scaffold out a JWT authentication with users and stuff?',
				default: true
			},
			{
				name: 'materialPrimaryTheme',
				type: 'list',
				message: 'Whats you favorite color, Milord?',
				default: 'indigo',
				choices: [
					'red',
					'pink',
					'purple',
					'deep-purple',
					'indigo',
					'blue',
					'light-blue',
					'cyan',
					'teal',
					'green',
					'light-green',
					'lime',
					'yellow',
					'amber',
					'orange',
					'deep-orange',
					'brown',
					'grey',
					'blue-grey'
				]
			},
			{
				name: 'materialAccentTheme',
				type: 'list',
				message: 'How do you like your accents painted?',
				default: 'pink',
				choices: [
					'red',
					'pink',
					'purple',
					'deep-purple',
					'indigo',
					'blue',
					'light-blue',
					'cyan',
					'teal',
					'green',
					'light-green',
					'lime',
					'yellow',
					'amber',
					'orange',
					'deep-orange',
					'brown',
					'grey',
					'blue-grey'
				]
			},
			{
				name: 'db',
				type: 'confirm',
				message: 'Do you like to use mongo db?',
				default: true,
				when: function (answers) {
					return !answers.auth;
				}
			},//,{
			//	type: 'confirm',
			//	name: 'socketio',
			//	message: 'Would you like to use socket.io?',
			//	default: true
			//},
			{
				name: 'createFeaturesPage',
				type: 'confirm',
				message: 'Shall I generate route which provides information about all used technologies?',
				default: true
			}
		], function (answers) {
			this.materialAccentTheme = answers.materialAccentTheme;
			this.materialPrimaryTheme = answers.materialPrimaryTheme;
			this.createFeaturesPage = answers.createFeaturesPage;
			this.originalAppname = answers.appname;
			this.gitrepo = answers.gitrepo;

			if (answers.auth) {
				this.features.auth = true;
			}

			if (answers.db || answers.auth) {
				this.features.db = true;
			}

			this.features.socketio = this.features.auth || this.features.db;

			cb();
		}.bind(this));
	},

	configuring: function () {
		var appName = this.scriptAppName;
		var componentModuleName = this.componentModule;

		function appModule(moduleName) {
			return ["'", appName, '.', moduleName, "'"].join('');
		}

		function componentModule(moduleName) {
			return ["'", componentModuleName, '.', moduleName, "'"].join('');
		}


		// global modules

		var ngModules = [
			// "'ngCookies'",
			// "'ngResource'",
			"'ngSanitize'",
			// "'ngMessages'",
			"'ngMaterial'",
			"'ui.router'"
		];

		// if (this.features.db) {
		// 	ngModules.push(componentModule('apiservice'));
		// }
		// app modules

		// ngModules.push(componentModule('lodash'));
		ngModules.push(componentModule('mainMenu'));
		// ngModules.push(componentModule('mongooseError'));
		// ngModules.push(componentModule('listImage'));
		// ngModules.push(componentModule('resource'));
		// ngModules.push(componentModule('toggleComponent'));
		// ngModules.push(componentModule('toast'));
		// ngModules.push(componentModule('remoteUnique'));

		// if (this.features.socketio) {
		// 	ngModules.push("'btford.socket-io'");
		// 	ngModules.push(componentModule('io'));
		// 	ngModules.push(componentModule('socket'));
		// }

		if (this.features.auth) {
			ngModules.push(componentModule('auth'));
			ngModules.push(componentModule('admin'));
			ngModules.push(componentModule('account'));
		}

		// add home module to get started
		ngModules.push(appModule('home'));

		this.angularModules = ngModules.join(",\n\t\t\t");

		if (this.skipConfig) {
			return;
		}

		// common config
		this.config.set('appname', this.appname);
		
		this.config.set('originalAppname', this.originalAppname);

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

		this.config.set('materialAccentTheme', this.materialAccentTheme);
		this.config.set('materialPrimaryTheme', this.materialPrimaryTheme);
		this.config.set('createFeaturesPage', this.createFeaturesPage);

		this.config.set('gitrepo', this.gitrepo);

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

	writing: {
		copyTemplates: function () {
			this.sourceRoot(path.join(__dirname, './templates'));
			genUtils.processDirectory(this, '.', '.');
		}
	},

	end: {
		createController: function () {
			this.composeWith('material-app:route', {
				args: ['home'],
				options: {
					dir: path.join(this.config.get('routeDirectory'), 'home'),
					route: '/home',
					menuItem: 'Home',
					icon: 'action:ic_home_24px',
					order: 1,
					composed: true,
					skipBuild: true
				}
			});
		},

		createFeatures: function () {
			if (!this.createFeaturesPage) {
				return;
			}

			this.composeWith('material-app:features', {
				args: ['features'],
				options: {skipBuild: true}
			});
		},

		commit: function () {
			if (!this.gitrepo) {
				return;
			}

			var done = this.async();
			var self = this;
			var features = Object.keys(this.features).join(',');

			function createSpawn(cmd, args) {
				return function spawn(cb) {
					self.spawnCommand(cmd, args).on('close', cb);
				};
			}

			var tasks = [
				createSpawn('git', ['init']),
				createSpawn('git', ['checkout', '-b', 'master']),
				createSpawn('git', ['add', '.']),
				createSpawn('git', ['commit', '-m', '"chore(init): initial commit of generated code'
				+ (features ? ', features:' + features : '') + '"']),
				createSpawn('git', ['remote', 'add', 'origin', this.gitrepo])
			];

			async.series(tasks, function (err, results) {
				if (err) {
					console.log(err);
				}
				done();
			});
		},

		installDeps: function () {
			this.installDependencies({
				skipInstall: this.options['skip-install'],
				callback: function () {
					console.log('Running the gulp himself...');
					this.spawnCommand('gulp').on('close', function () {
						console.log('All done, run "npm start" and go to http://localhost:9001');
					});
				}.bind(this)
			});
		}
	}

})
;
