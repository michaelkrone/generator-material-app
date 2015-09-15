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
	this.recipe = 'Decorator';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	var self = this;
	var done = this.async();
	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this decorator?',
			default: path.join(this.config.get('routeDirectory'), this.slugy())
		},
		{
			name: 'serviceToDecorate',
			message: 'What is the name of the service you would you like to decorate?'
		}
	];

	this.prompt(prompts, function (props) {
		this.serviceToDecorate = props.serviceToDecorate;
		this.processAnswers(props, this.config.get('routeDirectory'));
		done();
	}.bind(this));
};

Generator.prototype.writing = {
	createModule: createModule,
	createFiles:  createFiles
};

Generator.prototype.install = function build() {
	this.gulp(['inject']);
};

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

function createFiles() {
	ngUtil.copyTemplates(this, 'decorator');
}
