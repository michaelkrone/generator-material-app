/**
 * @ngdoc
 * @module <%= scriptAppName %>
 * @description
 * Module definition for the <%= scriptAppName %> module.
 * This is the app module of the <%= name %> application.
 */

(function () {
	'use strict';

	angular.
		module('<%= scriptAppName %>', [
			// Add modules below
			<%= angularModules %>
		])
		.config(appConfig);

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

		setTheming('default', 'light-blue', 'amber');
		registerIcons('navigation', 'action', 'content', 'toggle', 'alert');

		/**
		 * Configure the themingProvider with the given theme colors
		 * @param theme
		 * @param primary
		 * @param accent
		 */
		function setTheming(theme, primary, accent) {
			// define a palette to darken the background of components
			//var greyBackgroundMap = $mdThemingProvider.extendPalette(theme, {'A100': 'fafafa'});
			//$mdThemingProvider.definePalette('grey-background', greyBackgroundMap);

			// customize the theme
			$mdThemingProvider
				.theme(theme)
				.primaryPalette(primary)
				.accentPalette(accent);
			//.backgroundPalette('grey-background');
		}

		/**
		 * Load icons from the default material svg spreadsheets
		 * @param {...} Names of the iconsets to register
		 */
		function registerIcons() {
			Array.prototype.slice.call(arguments).forEach(function (name) {
				$mdIconProvider
					.iconSet(name, 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-' + name + '.svg');
			});
		}
	}

})();
