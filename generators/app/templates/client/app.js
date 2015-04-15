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

	/**
	 * Application config function, configuring the material theme and the navigation,
	 * add the auth interceptor to the http service.
	 *
	 * @param $locationProvider
	 */

	appConfig.$inject = ['$locationProvider', '$mdThemingProvider', '$mdIconProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

	function appConfig($locationProvider, $mdThemingProvider, $mdIconProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
		$locationProvider.html5Mode(true);<% if(features.auth) { %>
		$httpProvider.interceptors.push('AuthInterceptor');<% } %>

		// set the default palette name
		var defaultPalette = 'light-blue';
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

	/**
	 * Application run function, defines the default route: '/home'.
	 *
	 * @param $router
	 */

	appRun.$inject = ['$router'];

	function appRun($router) {
		$router.config([{path: '/', redirectTo: '/home'}]);
	}

})();
