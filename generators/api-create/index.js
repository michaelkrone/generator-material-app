'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../apiroute.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
	this.subPath = 'create';
	this.recipe = 'CreateController';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = askFor;

Generator.prototype.writing = {
	createMainModule: registerMainModule,
	createFiles: createFiles,
	createResource: createResource,
	createService: createService
};

Generator.prototype.install = {
	registerModule: registerModule,
	build: build
};

function askFor() {
	this.askFor();
	this.serviceName = this._.classify(this.name + 'Service');
}

function registerModule() {
	this.registerModule();
}

function registerMainModule() {
	this.createMainModule();
}

function createFiles() {
	ngUtil.copyTemplates(this, 'api-create');
}

function createResource() {
	this.composeWith('material-app:resource', {
		args: [this.name],
		options: {
			dir: this.serviceDir,
			apiUrl: this.apiUrl,
			useOriginalResource: false,
			composed: true,
			skipBuild: true
		}
	});
}

function createService() {
	this.composeWith('material-app:api-service', {
		args: [this.name],
		options: {
			dir: this.serviceDir,
			apiUrl: this.apiUrl,
			wrappedResource: this._.classify(this.name + 'Resource'),
			wrappedResourceModule: this.serviceModule,
			composed: true,
			skipBuild: true
		}
	});
}

function build() {
	this.build();
}
