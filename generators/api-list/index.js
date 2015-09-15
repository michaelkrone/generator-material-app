'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../apiroute.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
	this.subPath = 'list';
	this.recipe = 'ListController';
	this.arrayName = this.pluralize(this.lowerCameledName, true);
	this.resolveName = 'resolve' + this._.capitalize(this.arrayName);
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = askFor;

Generator.prototype.writing = {
	createMainModule: registerMainModule,
	createFiles: createFiles,
	createResource: createResource
};

Generator.prototype.install = {
	registerModule: registerModule,
	build: build
};

function askFor() {
	this.askFor();
}

function registerModule() {
	this.registerModule();
}

function registerMainModule() {
	this.createMainModule();
}

function createFiles() {
	ngUtil.copyTemplates(this, 'api-list');
}

function createResource() {
	this.composeWith('material-app:resource', {
		args: [this.name],
		options: {
			dir: this.serviceDir,
			apiUrl: this.apiUrl,
			moduleName: this.serviceModule,
			useOriginalResource: false,
			composed: true,
			skipBuild: true
		}
	});

	this.composeWith('material-app:api-service', {
		args: [this.name],
		options: {
			dir: this.serviceDir,
			moduleName: this.serviceModule,
			wrappedResource: this.classedName + 'Resource',
			wrappedResourceModule: this.serviceModule,
			composed: true,
			skipBuild: true
		}
	});
}

function build() {
	this.build();
}
