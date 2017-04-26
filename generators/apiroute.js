'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var BaseGenerator = require('./base.js');

var ApiGenerator = module.exports = function ApiGenerator() {
	BaseGenerator.apply(this, arguments);

	this.option('dir');
	this.option('moduleName');
	this.option('createModuleFile');
	this.option('composed');
	this.option('noRegister');
	this.option('route');
	this.option('apiUrl');
	this.option('secure');
	this.option('role');
	this.option('menuItem');
	this.option('icon');

	// only works with db support
	if (!this.config.get('features').db) {
		this.log('You said you do not like databases, sorry cannot create an API route.');
		this.log('To use a database, the app generator has to install database support.');
		process.exit(1);
	}

	var self = this;
	this.dependentModules = [];
	this.recipe = null;
	this.subPath = 'main';

	process.env.NODE_ENV = process.env.NODE_ENV || 'development';
	var srvConfig = require(path.join(this.options.env.cwd, 'server', 'config'));

	this.dir = path.join(this.config.get('routeDirectory'), this.slugy());
	// this.name = this.pluralize(this.name);

	this.prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this route?',
			default: path.join(this.config.get('routeDirectory')) // , this.slugy())
		},
		{
			name: 'route',
			message: 'What will the url of your route be?',
			default: '/' + this.slug
		},
		{
			name: 'apiUrl',
			message: 'What is the main API the route shall communicate with?',
			default: '/api/' + this.pluralize(this.slug)
		},
		{
			name: 'secure',
			type: 'confirm',
			message: 'May only authenticated users be able to access this route?',
			default: true,
			when: function () {
				return self.config.get('features').auth;
			}
		},
		{
			name: 'role',
			type: 'list',
			message: 'What role may access thus route, Milord?',
			default: 1,
			choices: srvConfig.userRoles,
			when: function (answers) {
				return answers.secure;
			}
		},
		{
			name: 'useMenu',
			message: 'Should this route be accessible by the menu?',
			default: true
		},
		{
			name: 'menuItem',
			message: 'How should the menu item be labelled?',
			default: this._.capitalize(this.name),
			when: function (answers) {
				return answers.useMenu;
			}
		},
		{
			name: 'icon',
			message: 'Do you like to provide a menu icon?',
			default: this._.sample([
				'social:ic_mood_24px',
				'action:ic_face_24px',
				'action:ic_favorite_24px',
				'action:ic_explore_24px',
				'action:ic_thumb_up_24px'
			]),
			when: function (answers) {
				return answers.useMenu;
			}
		},
	];

	this.askFor = function askFor() {
		var done = this.async();

		if (this.options.composed) {
			this.processAnswers(this.options);
			return done();
		}

		var prompts = this.prompts;

		this.prompt(prompts, function (props) {
			props = props || {};

			// append the slug to the directory by default
			var slug = this.slugy();
			if (props.dir.indexOf(slug, props.dir.length - slug.length) === -1) {
				props.dir = path.join(props.dir, slug);
			}

			this.mainDir = path.join(props.dir || this.options.dir);
			this.mainModuleName = this.getModuleNameForPath(this.mainDir, this.config.get('routeDirectory'));
			this.dir = path.join(this.mainDir, this.subPath);
			props.dir = this.dir;

			this.processAnswers(props, this.config.get('routeDirectory'));

			this.route = props.route || this.options.route;
			this.menuItem = props.menuItem || this.options.menuItem;
			this.icon = props.icon || this.options.icon;
			this.secure = props.secure || this.options.secure;
			this.role = props.role || this.options.role;
			this.apiUrl = props.apiUrl || this.options.apiUrl;
			this.order = props.order || this.options.order || 100;
			this.controllerName = this._.classify(this.name + this.recipe);
			this.controllerAsName = this.lowerCameledName + (this.subPath.charAt(0).toUpperCase() + this.subPath.slice(1));
			this.htmlUrl = path.relative('client', path.join(this.dir, this.slugy() + '-' + this.subPath + '.html'));

			this.serviceModule = this.mainModuleName + '.services';
			this.serviceModuleFile = this.mainModuleName + '-services';
			this.serviceDir = path.join(this.mainDir, 'services');

			if (!this.options.moduleName) {
				this.options.moduleName = this.getModuleNameForPath(this.dir, this.config.get('routeDirectory'));
			}

			this.moduleName = this.options.moduleName;

			done();
		}.bind(this));
	};

	this.createModule = function createModule() {
		if (this.options.noRegister) {
			return;
		}

		if (this.options.createModuleFile || !this.options.composed) {
			this.composeWith('material-app:module', {
				args: [this.moduleName],
				options: {
					dir: this.dir,
					skipBuild: true
				}
			});
		}
	};

	this.createMainModule = function createModule() {
		if (this.options.noRegister) {
			return;
		}

		this.composeWith('material-app:module', {
			args: [this.mainModuleName],
			options: {
				dir: this.mainDir,
				skipBuild: true
			}
		});
	};

	this.registerDependentModules = function registerDependentModules() {
		// register the dependent modules
		this.dependentModules.forEach(function (module) {
			this.registerAngularModule(module, this.dir);
		}.bind(this));
	};

	this.build = function build() {
		this.gulp();
	};

	this.registerModule = function registerModule() {
		this.registerAngularModule(this.moduleName, this.mainDir);
	};

	this.stateName = function getStateName() {
		return this.slugy() + '-' + this.subPath;
	};
}

util.inherits(ApiGenerator, BaseGenerator);
