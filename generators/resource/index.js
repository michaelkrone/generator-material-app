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
	var name = this.name;

	var done = this.async();
	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this resource?',
			default: self.config.get('componentsDirectory')
		},
		{
			name: 'apiUrl',
			message: 'What shall the API url of your resource be?',
			default: '/api/' + name + (self.config.get('pluralizeRoutes') ? 's' : '')
		},
		{
			type: 'confirm',
			name: 'useOriginalResource',
			message: 'Shall I use the original AngularJS resource?',
			default: false
		},
	];

	this.prompt(prompts, function (props) {
		this.dir = props.dir;
		this.apiURL = props.apiUrl;
		this.features.useOriginalResource = props.useOriginalResource;
		done();
	}.bind(this));
};

Generator.prototype.createFiles = function createFiles() {
	ngUtil.copyTemplates(this, 'resource');
};
