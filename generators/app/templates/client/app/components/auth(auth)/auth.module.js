/**
 * @ngdoc overview
 * @name auth
 * @description
 * The `<%= componentModule %>.auth` module
 *
 * @requires auth.service
 * @requires auth.interceptor
 * @requires auth.user
 */

(function () {
	'use strict';

	// register the service as Auth
	angular
		.module('<%= componentModule %>.auth', [
			'<%= componentModule %>.auth.service',
			'<%= componentModule %>.auth.interceptor',
			'<%= componentModule %>.auth.user'
		]);
