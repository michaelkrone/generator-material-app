'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.askFor = function askFor() {
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	var self = this;
	var name = this.name + (self.config.get('pluralizeRoutes') ? 's' : '');
	var srvConfig = require(path.join(this.options.env.cwd, 'server', 'config'));

	var done = this.async();
	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this resource?',
			default: self.config.get('routeDirectory') + name
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
			name: 'menuItem',
			message: 'How should the menu item be labelled?',
			default: this._.capitalize(name)
		}
	];

	this.prompt(prompts, function (props) {
		this.dir = props.dir;
		this.route = props.route;
		this.apiURL = props.apiUrl;
		this.secure = props.secure || false;
		this.role = props.role || false;
		this.menuItem = props.menuItem;
		done();
	}.bind(this));
};

Generator.prototype.registerRoute = function registerRoute() {
	var routeConfig = {
		file: path.join('client', 'app', 'app.js'),
		needle: this.config.get('modulesNeedle'),
		splicable: [
			"\'" + this.scriptAppName + '.' + this.name + "\',"
		]
	};
	ngUtil.rewriteFile(routeConfig);
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
