'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
  BaseGenerator.apply(this, arguments);

  var routeChain = this.name.split('.');
  this.slashedName = routeChain.join('/');
  this.isSubRoute = routeChain.length > 1;
  if (this.isSubRoute) {
    this.fileName = routeChain[routeChain.length - 1];
    this.ancestors = routeChain.slice(0, -1);
    var modules = this.config.get('angularModules');
    var fatherNgModuleName = this.scriptAppName + '.' + this.ancestors.join('.');
    this.fatherMissed = modules.indexOf(fatherNgModuleName) === -1;
  }

  this.autoRoute = this.options.autoRoute || false;
  this.children = this.options.children || [];
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.askFor = function askFor() {
  if (!this.options.totallyAuto) {
    this.log('Questions for route: ' + this.name);
  }

  var self = this;

  var defaults = {
    dir: self.config.get('routeDirectory') + this.slashedName,
    route: '/' + (this.fileName || this.name)
  };

  var done = this.async();
  var prompts = [
    {
      name: 'dir',
      message: 'Where would you like to create this route?',
      default: defaults.dir,
      when: !this.options.totallyAuto
    },
    {
      name: 'route',
      message: 'What will the url of your route be?',
      default: defaults.route,
      when: !this.options.totallyAuto
    }
  ];

  this.prompt(prompts, function (props) {
    this.route = props.route || defaults.route;
    this.dir = props.dir || defaults.dir;
    if (this.fatherMissed) {
      ngUtil.generateAncestorRoutes(this, done);
    } else {
      done();
    }
  }.bind(this));
};

Generator.prototype.registerRoute = function registerRoute() {
  var ngModuleName = this.scriptAppName + '.' + this.name;
  var modules = this.config.get('angularModules');
  if (modules.indexOf(ngModuleName) === -1) {
    modules.push(ngModuleName);
    this.config.set('angularModules', modules);
    this.config.save();
  }

  var routeConfig = {
    file: path.join('client', 'app', 'app.js'),
    needle: this.config.get('modulesNeedle'),
    splicable: ["'" + ngModuleName + "',"]
  };
  ngUtil.rewriteFile(routeConfig);
};

Generator.prototype.createFiles = function createFiles() {
  var basePath = this.config.get('basePath') || '';
  this.htmlUrl = ngUtil.relativeUrl(basePath, path.join(this.dir, (this.fileName || this.name) + '.html'));
  ngUtil.copyTemplates(this, 'route');
};

Generator.prototype.end = function end() {
  if (!this.options.totallyAuto) {
    this.log('End of route:' + this.name);
  }
};
