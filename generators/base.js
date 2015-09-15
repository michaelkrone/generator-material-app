'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var ngUtils = require('./util.js');

var Generator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);

	this.log(chalk.green('calling generator:'), chalk.blue(this.options.namespace));

	this.option('skipBuild');
	this.option('noregister');
	this.option('moduleName');

	this.features = this.config.get('features');
	this.appname = this.config.get('appname');
	this.originalAppname = this.config.get('originalAppname');

	if (!this.appname) {
		try {
			this.appname = require(path.join(process.cwd(), 'bower.json')).name;
		} catch (e) {
			this.appname = path.basename(process.cwd());
		}
	}

	this.appname = this._.slugify(this._.humanize(this.appname));
	this.originalAppname = this.config.get('originalAppname') || this.name;
	this.scriptAppName = this._.camelize(this.appname) + ngUtils.appName(this);
	this.humanAppName = this._.humanize(this.appname);

	this.componentModule = this.scriptAppName + '.components';
	this.cameledName = this._.camelize(this.name);
	this.lowerCameledName = this.cameledName.charAt(0).toLowerCase() + this.cameledName.slice(1);
	this.humanName = this.originalAppname;
	this.classedName = this._.classify(this.name);
	this.modelName = this._.classify(this.name);
	this.slug = this._.slugify(this.name);

	this.sourceRoot(path.join(__dirname, '/templates'));

	this.pluralize = function pluralize(str, force) {
		if (str.charAt(this.name.length -1) !== 's') {
			str = str + (force || this.config.get('pluralizeRoutes') ? 's' : '');
		}

		return str;
	};

	this.hasFilter = function (filter) {
		return this.config.get('features')[filter];
	}.bind(this);

	if (typeof this.env.options.appPath === 'undefined') {
		try {
			this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
		} catch (e) {
		}
		this.env.options.appPath = this.env.options.appPath || 'app';
	}

	this.registerAngularModule = function registerModule(module, filePath) {
		if (this.options.noregister) {
			return;
		}

		var moduleConfig = {
			file: checkPaths(filePath),
			needle: this.config.get('modulesNeedle'),
			splicable: [
				"\'" + module + "\',"
			]
		};

		if (moduleConfig.file) {
			ngUtils.rewriteFile(moduleConfig);
			this.log(chalk.green('registered module:'), chalk.magenta(module), chalk.dim('in', moduleConfig.file));
		}

		// global module?
		if (this.config.get('angularModules').indexOf("'" + module + "'") !== -1 || module.split('.').length > 2) {
			return;
		}

		// register globally
		moduleConfig.file = path.join('client', 'app', 'app.js');
		ngUtils.rewriteFile(moduleConfig);
		this.log(chalk.green('registered global module:'), chalk.magenta(module), chalk.dim('in', moduleConfig.file));

		// update yeoman config for global modules
		var modules = this.config.get('angularModules');
		modules.push("'" + module + "'");
		this.config.forceSave();
	};

	this.getModuleNameForPath = function mapPathToModule(dirName, defaultDir) {
		defaultDir = defaultDir || this.config.get('routeDirectory');

		var moduleSuffix;
		var dir = this.dir;


		if (dirName !== defaultDir) {
			moduleSuffix = dir.slice(this.config.get('routeDirectory').length)
				.split(path.sep)
				.map(function (e) {
					return this._.slugify(e);
				}.bind(this)).join('.');
		}

		return this.scriptAppName + (moduleSuffix ? '.' + moduleSuffix : '');
	};

	this.sourceRoot(path.join(__dirname, '/templates'));

	this.gulp = function gulp(tasks) {
		if (this.options.skipBuild) {
			return;
		}

		var self = this;
		var done = this.async();
		this.log('Running the gulp himself...');

		this.spawnCommand('gulp', tasks)
			.on('close', function () {
				self.log('All done.');
				done();
			})
			.on('error', function (e) {
				console.error('gulp Error: %s', e);
				done();
			});
	};

	this.slugy = function() {
		var name = this.name;

		if (this.recipe && this.name.indexOf(this.recipe) > 0) {
			name = this.name.slice(0, -this.recipe.length);
		}

		return this._.slugify(name)
	};

	this.processAnswers = function processAnswers(props, defaultDir) {
		defaultDir = defaultDir || this.config.get('routeDirectory');
		var ctrlStr = this.recipe || 'Controller';

		var dirName = this.name;
		this.dir = path.join(props.dir);

		if (dirName.indexOf(ctrlStr) > 0) {
			dirName = dirName.slice(0, -ctrlStr.length);
		}

		this.name = dirName.toLowerCase();
		//this.soloModule = this.config.get('angularModules').indexOf("'" + this.moduleName + "'") < 0;

		if (!this.options.moduleName) {
			this.options.moduleName = this.getModuleNameForPath(this.dir, defaultDir);
		}

		this.moduleName = this.options.moduleName;
		this.options.createModuleFile = this.dir !== defaultDir;

		this.controllerName = this.name;
		if (this.controllerName.indexOf(ctrlStr) < 0) {
			this.controllerName += ctrlStr;
		}

		this.controllerName = this._.classify(this.controllerName);
	};

	function checkPaths(filePath) {
		var pathArray = filePath.split(path.sep);

		while (pathArray.length) {

			// options is optional
			var moduleFiles = glob.sync('*.module.js', {
				cwd: path.join.apply(null, pathArray)
			});

			if (moduleFiles.length) {
				pathArray.push(moduleFiles[0]);
				return path.join.apply(null, pathArray);
			}

			pathArray.pop();
		}

		// global module
		return false;
	}
}

util.inherits(Generator, yeoman.generators.NamedBase);
