'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var fs = require('fs');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
	this.option('dir');
	this.option('composed');
	this.recipe = 'Module';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	var done = this.async();

	if (this.options.dir) {
		return processAnswers.call(this, this.options);
	}

	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this module?',
			default: path.join(this.config.get('routeDirectory'), this.slugy())
		}
	];

	this.prompt(prompts, processAnswers.bind(this));

	function processAnswers(props) {
		this.dir = props.dir;

		if (this.name.indexOf(this.scriptAppName) < 0) {
			this.moduleName = this.scriptAppName + '.' + this.name;
		} else {
			this.moduleName = this.name;
			this.name = this.name.substr(this.scriptAppName.length + 1);
		}

		this.registerAngularModule(this.moduleName, this.dir);
		done();
	}
};

Generator.prototype.writing = function createFiles() {
	if (path.basename(this.dir) === 'app') {
		return;
	}

	this.name = this._.slugify(this.name.replace('.', '-'));
	var done = this.async();
	fs.stat(path.join(this.dir, this.name + '.module.js'), copyTemplates.bind(this));

	function copyTemplates(err, stat) {
		if (err && err.code === 'ENOENT' || stat && !stat.isFile()) {
			ngUtil.copyTemplates(this, 'module');
		}
		done();
	}
};

Generator.prototype.install = function build() {
	this.gulp(['inject']);
};
