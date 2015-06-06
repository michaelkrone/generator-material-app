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

	appConfig.$inject = ['$locationProvider', '$componentLoaderProvider', '$mdThemingProvider', '$mdIconProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

	function appConfig($locationProvider, $componentLoaderProvider, $mdThemingProvider, $mdIconProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
		$locationProvider.html5Mode(true);<% if(features.auth) { %>
		$httpProvider.interceptors.push('AuthInterceptor');<% } %>

		$componentLoaderProvider.setTemplateMapping(templateMapping);
		$componentLoaderProvider.setCtrlNameMapping(controllerMapping);

		setTheming('default', 'light-blue', 'pink');
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

		/**
		 * Map a component name to the template path. Overwrite the default router behaviour
		 * to support 'subcomponents' as 'home.toolbar'.
		 * @param name
		 * @returns {string}
		 */
		function templateMapping(name) {
			var index = name.indexOf('.');
			var dashed = dashCase(name);

			// if name has no separator at all or starts with a separator
			// we cannot handle this, return the default behaviour
			if (index <= 0) {
				return './components/' + dashed + '/' + dashed + '.html';
			}

			// split the name in child and parent
			var parent = dashed.substr(0, index);
			var child = dashed.substr(index + 1);
			return './components/' + parent + '/' + child + '/' + parent + '-' + child + '.html';
		}

		/**
		 * Map a component name to the controller name. Overwrite the default router behaviour
		 * to support 'subcomponents' as 'home.toolbar'.
		 * @param name
		 * @returns {string}
		 */
		function controllerMapping(name) {
			// jshint validthis:true
			var index = name.indexOf('.');

			// if name has a separator and does not start with a separator
			if (index > 0) {
				var parent = name.substr(0, index);
				var child = name.substr(index + 1);
				name = parent + child[0].toUpperCase() + child.substr(1);
			}

			return name[0].toUpperCase() + name.substr(1) + 'Controller';
		}

		/**
		 * Dasherize a camel case string
		 * @emxample
		 * var dashed = dashCase('HomeController')
		 * assert(dashed, 'home-controller');
		 *
		 * @param str
		 * @returns {string} The dasherized string
		 */
		function dashCase(str) {
			return str.replace(/([A-Z])/g, function ($1) {
				return '-' + $1.toLowerCase();
			});
		}
	}

})();
