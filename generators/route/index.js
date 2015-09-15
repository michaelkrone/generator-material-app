'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
	this.option('dir');
	this.option('moduleName');
	this.option('createModuleFile');
	this.option('composed');
	this.option('route');
	this.option('menuItem');
	this.option('icon');
	this.option('secure');
	this.option('role');
	this.option('order');
	this.recipe = 'Route';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	var self = this;
	var name = this.name;
	var done = this.async();

	if (this.options.composed) {
		return processAnswers.call(this, {});
	}

	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this route?',
			default: path.join(self.config.get('routeDirectory'), this.slugy())
		},
		{
			name: 'route',
			message: 'What will the url of your route be?',
			default: '/' + this._.slugify(name)
		},
		{
			name: 'useMenu',
			message: 'Should this route be accessible by the menu?',
			default: true
		},
		{
			name: 'menuItem',
			message: 'How should the menu item be labelled?',
			default: this._.capitalize(name),
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
		//{
		//	name: 'order',
		//	message: 'What priority has this menu item (a number for ordering)?',
		//	default: 10,
		//	when: function (answers) {
		//		return answers.useMenu;
		//	}
		//},
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
			choices: [],//require(path.join(this.options.env.cwd, 'server', 'config')).userRoles,
			when: function (answers) {
				return answers.secure;
			}
		}
	];

	this.prompt(prompts, processAnswers.bind(this));

	function processAnswers(props) {
		props = props || {};
		this.route = props.route || this.options.route;
		this.menuItem = props.menuItem || this.options.menuItem;
		this.icon = props.icon || this.options.icon;
		this.secure = props.secure || this.options.secure;
		this.role = props.role || this.options.role;
		this.order = props.order || this.options.order || 10;
		this.dir = props.dir || this.options.dir;
		this.modulePath = this.dir;
		this.controllerName = this.name;

		if (!this.options.moduleName) {
			this.options.moduleName = this.getModuleNameForPath(this.dir, this.config.get('routeDirectory'));
		}

		this.moduleName = this.options.moduleName;
		done();
	};
};

Generator.prototype.configuring = function registerModule() {
	this.registerAngularModule(this.moduleName, this.modulePath);
};

Generator.prototype.writing = {
	createFiles: createFiles,
	createController: createController
};

Generator.prototype.install = function build() {
	this.gulp();
};

function createFiles() {
	this.name = this._.slugify(this.name);
	this.htmlUrl = path.relative('client', path.join(this.dir, this.name + '.html'));
	ngUtil.copyTemplates(this, 'route');
}

function createController() {
	this.composeWith('material-app:controller', {
		args: [this.controllerName],
		options: {
			dontRegister: true,
			dir: this.dir,
			moduleName: this.options.moduleName,
			composed: true,
			skipBuild: true
		}
	});
}
