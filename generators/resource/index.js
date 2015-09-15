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
	this.option('apiUrl');
	this.option('useOriginalResource');
	this.recipe = 'Resource'
	this.dependentModules = [];
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	var self = this;
	var name = this.name;
	var done = this.async();

	if (this.options.composed) {
		return ask.call(this, this.options);
	}

	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this resource?',
			default: path.join(self.config.get('routeDirectory'), this.slugy()),
			when: function () {
				return !this.options.dir;
			}.bind(this)
		},
		{
			name: 'apiUrl',
			message: 'What shall the API url of your resource be?',
			default: '/api/' + seld.pluralize(name),
			when: function () {
				return !this.options.apiUrl;
			}.bind(this)
		},
		{
			type: 'confirm',
			name: 'useOriginalResource',
			message: 'Shall I use the encapsulated AngularJS resource?',
			default: false,
			when: function () {
				return !this.options.composed;
			}.bind(this)
		}
	];

	this.prompt(prompts, ask.bind(this));

	function ask(props) {
		this.dir = props.dir;
		this.apiUrl =  props.apiUrl;
		this.useOriginalResource = props.useOriginalResource;

		if (!this.useOriginalResource) {
			this.dependentModules.push(this.componentModule + '.resource');
		}

		this.processAnswers(props, this.config.get('routeDirectory'));
		done();
	}
};

Generator.prototype.writing = {
	createFiles: createFiles,
	createModule: createModule
};

Generator.prototype.install = {
	registerDependentModules: registerDependentModules
};

Generator.prototype.end = {
	build: build
};

function build() {
	this.gulp(['inject']);
}

function createModule() {
	if (this.options.createModuleFile || !this.options.composed) {
		this.composeWith('material-app:module', {
			args: [this.moduleName],
			options: {
				dir: this.dir,
				skipBuild: true
			}
		});
	} else {
		this.registerAngularModule(this.moduleName, this.dir);
	}
}

function registerDependentModules() {
	// register the dependent modules
	this.dependentModules.forEach(function (module) {
		this.registerAngularModule(module, this.dir);
	}.bind(this));
}

function createFiles() {
	ngUtil.copyTemplates(this, 'resource');
}
