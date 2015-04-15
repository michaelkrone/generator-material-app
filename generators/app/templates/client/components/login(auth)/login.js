/**
 * @ngdoc overview
 * @name <%= scriptAppName %>.login
 * @description
 * The `<%= scriptAppName %>.login` module
 *
 * @requires ngNewRouter
 * @requires <%= scriptAppName %>.auth
 */

(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>.login', [
			'ngNewRouter',
			'<%= scriptAppName %>.auth'
		])
		.run(runAccount);

		var routeConfig = {
			path: '/login',
			components: {content: 'login'}
		};

	/**
	 * @ngdoc
	 * @params {Object} $router The router service to attach the main route to.
	 * @description
	 * Defines the '/login route for the 'login' component.
	 */

	// inject runAdmin dependencies here
	runAccount.$inject = ['$router'];

	function runAccount($router) {
		$router.config(routeConfig);
	}

})();
