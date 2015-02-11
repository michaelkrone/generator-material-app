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
	var self = this;
	var done = this.async();
	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this decorator?',
			default: self.config.get('serviceDirectory')
		},
		{
			name: 'serviceToDecorate',
			message: 'What is the name of the service you would you like to decorate?'
		}
	];

	this.prompt(prompts, function (props) {
		this.dir = path.join(props.dir, this.name);
		this.serviceToDecorate = props.serviceToDecorate;
		done();
	}.bind(this));
};

Generator.prototype.createFiles = function createFiles() {
	ngUtil.copyTemplates(this, 'decorator');
};
