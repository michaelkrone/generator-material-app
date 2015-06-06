/**
 * @ngdoc overview
 * @name auth
 * @description
 * The `<%= scriptAppName %>.auth` module
 *
 * @requires ngResource
 * @requires ngCookies
 * @requires auth.interceptor
 * @requires auth.user
 */

/**
 * @ngdoc service
 * @name auth.service:Auth
 * @description
 * Authentication service
 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.auth', [
			'<%= scriptAppName %>.auth.interceptor',
			'<%= scriptAppName %>.auth.service',
			'<%= scriptAppName %>.auth.user'
		]);

})();
