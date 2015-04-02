/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * Module definition for the <%= scriptAppName %> module.
 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>', [
			// Add modules below
			<%= angularModules %>
		])
		.config(appConfig)
		.run(appRun);

	/* App configuration */

	// add appConfig dependencies to inject
	appConfig.$inject = ['$locationProvider', '$mdThemingProvider', '$mdIconProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

	/**
	 * Application config function
	 *
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @param $locationProvider
	 */
	function appConfig($locationProvider, $mdThemingProvider, $mdIconProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
		$locationProvider.html5Mode(true);<% if(features.auth) { %>

		$httpProvider.interceptors.push('AuthInterceptor');<% } %>

		// set the default palette name
		var defaultPalette = 'light-blue';
		$mdThemingProvider.setDefaultTheme(defaultPalette);

		// define a palette to darken the background of components
		var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});
		$mdThemingProvider.definePalette('grey-background', greyBackgroundMap);

		// customize the theme
		$mdThemingProvider
			.theme(defaultPalette)
			.primaryPalette(defaultPalette)
			.accentPalette('green')
			.backgroundPalette('grey-background');

		var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
		$mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
		$mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
		$mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
		$mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
		$mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
	}

	/* App run bootstrap */

	// add appConfig dependencies to inject
	appRun.$inject = ['$router'<% if(features.auth) { %>, '$rootScope', '$location', 'Auth'<% } %>];

	/**
	 * Application run function
	 *
	 * @param $rootScope
	 * @param $location
	 * @param Auth
	 */
	function appRun($router<% if(features.auth) { %>, $rootScope, $location, Auth<% } %>) {
		// define the default route
		$router.config([{ path: '/', redirectTo: '/home' }]);<% if(features.auth) { %>
		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$locationChangeStart', function (event, next) {
			if (!next.authenticate) {
				event.preventDefault();
				return;
			}

			Auth.isLoggedInAsync(function (loggedIn) {
				if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
					$location.path('/login');
				}
			});
		});<% } %>
	}

})();
