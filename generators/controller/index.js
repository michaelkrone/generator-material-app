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
	this.option('dontRegister');
	this.soloModule = false;
	this.recipe = 'Controller';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	var done = this.async();

	if (this.options.composed) {
		this.processAnswers({dir: this.options.dir});
		return done();
	}

	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this controller?',
			default: path.join(this.config.get('routeDirectory'), this.slugy())
		}
	];

	this.prompt(prompts, function (props) {
		this.processAnswers(props, this.config.get('routeDirectory'));
		done();
	}.bind(this));
};

Generator.prototype.writing = {
	createModule: createModule,
	createFiles: createFiles
};

Generator.prototype.install = function build() {
	this.gulp(['inject']);
};

function createModule() {
	if (this.options.dontRegister) {
		return;
	}

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
	ngUtil.copyTemplates(this, 'controller');
}