/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * Introduce the <%= moduleName %> module.
 *
 * @requires ui.router<% if (menuItem) { %>
 * @requires <%= componentModule %>.mainMenu<% } %>
 */

(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= moduleName %>', [
			// Add modules below
			'ui.router'<% if (menuItem) { %>,
			'<%= componentModule %>.mainMenu'<% } %>
		]);
})();
