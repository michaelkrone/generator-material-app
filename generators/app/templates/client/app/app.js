(function () {
	'use strict';

	/**
	 * Module definition for the <%= scriptAppName %> module.
	 */
	angular
		.module('<%= scriptAppName %>', [
			// Add modules below
			<%= angularModules %>
		])
		.config(appConfig)<% if(features.auth) { %>
		.run(appRun)<% } %>;

	/* App configuration */

	// add appConfig dependencies to inject
	appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

	/**
	 * Application config function
	 *
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @param $locationProvider
	 */
	function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
		$urlRouterProvider.otherwise('/');
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);

		$mdThemingProvider.setDefaultTheme('default');
		$mdThemingProvider.theme('default').accentColor('cyan');

	<% if(features.auth) { %>
		$httpProvider.interceptors.push('AuthInterceptor');<% } %>
	}<% if(features.auth) { %>

	/* App run bootstrap */

	// add appConfig dependencies to inject
	appRun.$inject = ['$rootScope', '$location', 'Auth'];

	/**
	 * Application run function
	 *
	 * @param $rootScope
	 * @param $location
	 * @param Auth
	 */
	function appRun($rootScope, $location, Auth) {
		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$stateChangeStart', function (event, next) {
			Auth.isLoggedInAsync(function (loggedIn) {
				if (next.authenticate && !loggedIn) {
					$location.path('/login');
				}
			});
		});
	}<% } %>;

})();
