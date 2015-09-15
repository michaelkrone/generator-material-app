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
	this.recipe = 'Directive';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	var self = this;
	var done = this.async();

	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this directive?',
			default: path.join(self.config.get('directiveDirectory'), this.slugy())
		},
		{
			type: 'confirm',
			name: 'complex',
			message: 'Does this directive need an template file?',
			default: false
		}
	];

	this.prompt(prompts, function (props) {
		this.complex = props.complex;
		this.processAnswers(props, this.config.get('directiveDirectory'));
		done();
	}.bind(this));
};

Generator.prototype.writing = {
	createModule: createModule,
	createFiles:  createFiles
};

Generator.prototype.install = function build() {
	this.gulp();
};

function createModule() {
	if (this.options.createModuleFile || !this.options.composed) {
		this.composeWith('material-app:module', {
			args: [this.name],
			options: {
				dir: this.dir,
				skipBuild: true
			}
		});
	} else {
		this.registerAngularModule(this.moduleName, this.dir);
	}
}

function createFiles() {
	var configName = 'directiveSimpleTemplates';
	var templateDir = path.join(this.sourceRoot(), 'directiveSimple');
	if (this.complex) {
		configName = 'directiveComplexTemplates';
		templateDir = path.join(this.sourceRoot(), 'directiveComplex');
	}

	var basePath = this.config.get('basePath') || '';
	this.htmlUrl = ngUtil.relativeUrl(basePath, path.join(this.dir, this.name + '.html'));
	ngUtil.copyTemplates(this, 'directive', templateDir, configName);
}
