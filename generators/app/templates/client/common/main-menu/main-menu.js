/**
 * @ngdoc overview
 * @name mainMenu
 * @requires <%= scriptAppName %>.lodash<% if (features.auth) { %>
 * @requires <%= scriptAppName %>.auth<% } %>
 * @description
 * The `<%= scriptAppName %>.mainMenu` module which provides:
 *
 * - {@link mainMenu.controller:MainMenuController MainMenuController}
 * - {@link mainMenu.service:mainMenu mainMenu-service}
 */

(function () {
	'use strict';

	angular.module('<%= scriptAppName %>.mainMenu', [
		'<%= scriptAppName %>.lodash'<% if (features.auth) { %>,
		'<%= scriptAppName %>.auth'<% } %>
	])

})();
