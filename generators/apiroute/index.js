'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);

	// only works with db support
	if (!this.config.get('features').db) {
		this.log('You said you do not like databases, sorry cannot create an API route.');
		this.log('To use a database, the app generator has to install database support.');
		process.exit(1);
	}

	this.option('dir');
	this.option('moduleName');
	this.option('createModuleFile');
	this.option('composed');
	this.recipe = 'Route';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.askFor = function askFor() {

	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	var self = this;
	var name = this.name + (self.config.get('pluralizeRoutes') ? 's' : '');
	var srvConfig = require(path.join(this.options.env.cwd, 'server', 'config'));
	this.moduleName = this.scriptAppName + '.' + this._.slugify(this.name);

	var done = this.async();
	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this resource?',
			default: path.join(self.config.get('routeDirectory'), this.slugy())
		},
		{
			name: 'route',
			message: 'What will the url of your route be?',
			default: '/' + name
		},
		{
			name: 'apiUrl',
			message: 'What is the main API the route shall communicate with?',
			default: '/api/' + name
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
	];

	this.prompt(prompts, function (props) {
		this.dir = props.dir;
		this.route = props.route;
		this.apiURL = props.apiUrl;
		this.secure = props.secure || false;
		this.role = props.role || false;
		this.menuItem = props.menuItem;
		this.icon = props.icon;
		done();
	}.bind(this));
};

Generator.prototype.registerModule = function registerModule() {
	this.registerAngularModule(this.moduleName, this.modulePath);
};

Generator.prototype.createFiles = function createFiles() {
	this.htmlUrl = path.relative('client', path.join(this.dir, this.name + '.html'));
	this.mainHtmlUrl = path.relative('client', path.join(this.dir, 'main', 'main.html'));
	this.createHtmlUrl = path.relative('client', path.join(this.dir, 'create', 'create.html'));
	this.listHtmlUrl = path.relative('client', path.join(this.dir, 'list', 'list.html'));
	this.listDetailHtmlUrl = path.relative('client', path.join(this.dir, 'list', 'detail', 'detail.html'));
	this.listEditHtmlUrl = path.relative('client', path.join(this.dir, 'list', 'edit', 'edit.html'));
	this.listItemsHtmlUrl = path.relative('client', path.join(this.dir, 'list', 'items', 'items.html'));
	ngUtil.processDirectory(this, 'apiroute', this.dir);
};

Generator.prototype.build = function build() {
	this.gulp();
};
