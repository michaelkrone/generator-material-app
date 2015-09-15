'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
	this.option('dir');
	this.option('skipBuild');
	this.recipe = 'Route';
	this.dir = path.join(this.config.get('routeDirectory'), this.slugy());
	this.moduleName = this.getModuleNameForPath(this.dir, this.config.get('routeDirectory'));
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.writing = function createFiles() {
	this.name = this._.slugify(this.name);
	this.htmlUrl = path.relative('client', path.join(this.dir, this.name + '.html'));
	ngUtil.copyTemplates(this, 'features');
};

Generator.prototype.install = function registerModule() {
	this.registerAngularModule(this.moduleName, this.dir);
};

Generator.prototype.end = function build() {
	this.gulp();
};
