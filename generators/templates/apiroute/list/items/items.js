(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.list.items module
	 * @requires ui.router
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list.items', ['ui.router']);

})();
