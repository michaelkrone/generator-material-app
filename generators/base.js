'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');

var Generator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);

	try {
		this.appname = require(path.join(process.cwd(), 'bower.json')).name;
	} catch (e) {
		this.appname = path.basename(process.cwd());
	}
	this.appname = this._.slugify(this._.humanize(this.appname));
	this.scriptAppName = this._.camelize(this.appname) + angularUtils.appName(this);

	this.cameledName = this._.camelize(this.name);
	this.classedName = this._.classify(this.name);
	this.modelName = this._.classify(this.name);

	this.features = this.config.get('features');
	this.angularModules = this.config.get('angularModules');
	this.sourceRoot(path.join(__dirname, '/templates'));

	this.hasFilter = function (filter) {
		return this.config.get('features')[filter];
	}.bind(this);

	if (typeof this.env.options.appPath === 'undefined') {
		try {
			this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
		} catch (e) {
		}
		this.env.options.appPath = this.env.options.appPath || 'app';
	}

	this.sourceRoot(path.join(__dirname, '/templates'));
};

util.inherits(Generator, yeoman.generators.NamedBase);
