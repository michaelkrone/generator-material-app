/**
 * @ngdoc
 * @module <%= scriptAppName %>.home
 * @description
 * The home module of the <%= name %> application.
 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.home', [
			'ngNewRouter',<% if(features.auth) { %>,
			'<%= scriptAppName %>.auth',<% }%>
			'<%= scriptAppName %>.mainMenu'
		]);
})();
