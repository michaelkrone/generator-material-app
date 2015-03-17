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
	var done = this.async();
	var name = this.name;
	var srvConfig = require(path.join(this.options.env.cwd, 'server', 'config'));

	var base = this.config.get('routesBase') || '/api/';
	if (base.charAt(base.length - 1) !== '/') {
		base = base + '/';
	}

	// pluralization defaults to true for backwards compat
	if (this.config.get('pluralizeRoutes') !== false) {
		name = name + 's';
	}

	var prompts = [
		{
			name: 'route',
			message: 'What shall the URI of your resource be?',
			default: base + name
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
		}
	];

	this.prompt(prompts, function (props) {
		if (props.route.charAt(0) !== '/') {
			props.route = '/' + props.route;
		}

		this.route = props.route;
		this.secure = props.secure || false;
		this.role = props.role || false;

		done();
	}.bind(this));
};

Generator.prototype.registerEndpoint = function registerEndpoint() {
	if (this.config.get('insertRoutes')) {
		var routeConfig = {
			file: this.config.get('registerRoutesFile'),
			needle: this.config.get('routesNeedle'),
			splicable: [
				"app.use(\'" + this.route + "\', require(\'./api/" + this.name + "\'));"
			]
		};
		ngUtil.rewriteFile(routeConfig);
	}

	if (this.features.socketio) {
		if (this.config.get('insertSockets')) {
			var socketConfig = {
				file: this.config.get('registerSocketsFile'),
				needle: this.config.get('socketsNeedle'),
				splicable: [
					"require(\'../api/" + this.name + '/' + this.name + ".socket\').register(socket);"
				]
			};
			ngUtil.rewriteFile(socketConfig);
		}
	}
};

Generator.prototype.createFiles = function createFiles() {
	var dest = this.config.get('endpointDirectory') || 'server/api/' + this.name;
	this.sourceRoot(path.join(__dirname, './templates'));
	ngUtil.processDirectory(this, '.', dest);
};
