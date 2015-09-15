/**
 * @ngdoc overview
 * @name mainMenu
 * @requires <%= componentModule %>.lodash<% if (features.auth) { %>
 * @requires <%= componentModule %>.auth<% } %>
 * @description
 * The `<%= componentModule %>.mainMenu` module which provides:
 *
 * - {@link mainMenu.controller:MainMenuController MainMenuController}
 * - {@link mainMenu.service:mainMenu mainMenu-service}
 */

(function () {
	'use strict';

	angular.module('<%= componentModule %>.mainMenu', [
		'ui.router',
		'ngMaterial',
		'<%= componentModule %>.lodash'<% if (features.auth) { %>,
		'<%= componentModule %>.auth'<% } %>
	])

})();
