/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * Introduce the <%= moduleName %> module.
 *
 * @requires ui.router
 * @requires <%= componentModule %>.listImage<% if (menuItem) { %>
 * @requires <%= componentModule %>.mainMenu<% } %>
 * @requires <%= moduleName %>.services
 */


(function () {
	'use strict';

	angular
		.module('<%= moduleName %>', [
			// Add modules below
			'ui.router',
			'<%= componentModule %>.listImage',
			'<%= componentModule %>.toast',<% if (menuItem) { %>
			'<%= componentModule %>.mainMenu',<% } %>
			'<%= serviceModule %>'
	]);
})();
