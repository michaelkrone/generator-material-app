'use strict';
var path = require('path');
var fs = require('fs');

module.exports = {
	rewrite: rewrite,
	rewriteFile: rewriteFile,
	appName: appName,
	processDirectory: processDirectory,
	copyTemplates: copyTemplates,
	relativeUrl: relativeUrl
};

function rewriteFile(args) {
	args.path = args.path || process.cwd();
	var fullPath = path.join(args.path, args.file);

	args.haystack = fs.readFileSync(fullPath, 'utf8');
	var body = rewrite(args);

	fs.writeFileSync(fullPath, body);
}

function rewrite(args) {
	// check if splicable is already in the body text
	var re = new RegExp(args.splicable.map(function (line) {
		return '\s*' + escapeRegExp(line);
	}).join('\n'));

	if (re.test(args.haystack)) {
		return args.haystack;
	}

	var lines = args.haystack.split('\n');

	var otherwiseLineIndex = -1;
	lines.forEach(function (line, i) {
		if (line.indexOf(args.needle) !== -1) {
			otherwiseLineIndex = i;
		}
	});
	if (otherwiseLineIndex === -1) return lines.join('\n');

	var spaces = 0;
	while (lines[otherwiseLineIndex].charAt(spaces) === '\t') {
		spaces += 1;
	}

	var spaceStr = '';
	while ((spaces -= 1) >= 0) {
		spaceStr += '\t';
	}

	lines.splice(otherwiseLineIndex + 1, 0, args.splicable.map(function (line) {
		return spaceStr + line;
	}).join('\n'));

	return lines.join('\n');
}

function appName(self) {
	var counter = 0, suffix = self.options['app-suffix'];
	// Have to check this because of generator bug #386
	process.argv.forEach(function (val) {
		if (val.indexOf('--app-suffix') > -1) {
			counter++;
		}
	});
	if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
		suffix = 'App';
	}
	return suffix ? self._.classify(suffix) : '';
}

function filterFile(template) {
	// Find matches for parans
	var filterMatches = template.match(/\(([^)]+)\)/g);
	var features = [];
	if (filterMatches) {
		filterMatches.forEach(function (filter) {
			features.push(filter.replace('(', '').replace(')', ''));
			template = template.replace(filter, '');
		});
	}

	return {name: template, features: features};
}

function templateIsUsable(self, filteredFile) {
	if (!filteredFile.features) {
		return true;
	}

	var features = self.config.get('features');
	var enabledfeatures = [];
	for (var key in features) {
		if (features[key]) {
			enabledfeatures.push(key);
		}
	}
	var matchedfeatures = self._.intersection(filteredFile.features, enabledfeatures);
	// check that all features on file are matched
	return !(filteredFile.features.length && matchedfeatures.length !== filteredFile.features.length);

}

function processDirectory(self, source, destination) {
	var root = self.isPathAbsolute(source) ? source : path.join(self.sourceRoot(), source);
	var files = self.expandFiles('**', {dot: true, cwd: root});
	var dest, src;

	files.forEach(function (f) {
		try {
			var filteredFile = filterFile(f);
			if (self.name) {
				filteredFile.name = filteredFile.name.replace('name', self.name);
			}
			var name = filteredFile.name;
			var copy = false, stripped;

			src = path.join(root, f);
			dest = path.join(destination, name);

			if (path.basename(dest).indexOf('_') === 0) {
				stripped = path.basename(dest).replace(/^_/, '');
				dest = path.join(path.dirname(dest), stripped);
			}

			if (path.basename(dest).indexOf('!') === 0) {
				stripped = path.basename(dest).replace(/^!/, '');
				dest = path.join(path.dirname(dest), stripped);
				copy = true;
			}

			if (templateIsUsable(self, filteredFile)) {
				if (copy) {
					self.copy(src, dest);
				} else {
					self.template(src, dest);
				}
			}
		} catch (e) {
			console.error("File: %s, Error: %s", f, e);
			throw e;
		}
	});
}

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function copyTemplates(self, type, templateDir, configName) {
	templateDir = templateDir || path.join(self.sourceRoot(), type);
	configName = configName || type + 'Templates';

	if (self.config.get(configName)) {
		templateDir = path.join(process.cwd(), self.config.get(configName));
	}

	fs.readdirSync(templateDir)
		.forEach(function (template) {
			try {
				var processedName = createFileName(template, self.name);

				var fileName = processedName.name;
				var templateFile = path.join(templateDir, template);

				if (templateIsUsable(self, processedName)) {
					self.template(templateFile, path.join(self.dir, fileName));
				}
			} catch (e) {
				console.error("File: %s, Error: %s", template, e);
				throw e;
			}
		});
}

function relativeUrl(basePath, targetPath) {
	var relativePath = path.relative(basePath, targetPath);
	return relativePath.split(path.sep).join('/');
}

function createFileName(template, name) {
	// Find matches for parans
	var filterMatches = template.match(/\(([^)]+)\)/g);
	var filter = '';
	if (filterMatches) {
		filter = filterMatches[0].replace('(', '').replace(')', '');
		template = template.replace(filterMatches[0], '');
	}

	return {name: template.replace('name', name), filter: filter};
}
