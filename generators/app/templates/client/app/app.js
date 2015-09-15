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
		.config(appConfig)<% if(features.auth) { %>
		.run(appRun)<% } %>;

	/* App configuration */

	// add appConfig dependencies to inject
	appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

	/**
	 * Application config function
	 *
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @param $locationProvider
	 */
	function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider, $mdIconProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
		$urlRouterProvider.otherwise('/home');
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);<% if(features.auth) { %>

		$httpProvider.interceptors.push('AuthInterceptor');<% } %>

		// set the default palette name
		var defaultPalette = '<%= materialPrimaryTheme %>';
		$mdThemingProvider.setDefaultTheme(defaultPalette);

		// customize the theme
		$mdThemingProvider
			.theme(defaultPalette)
			.primaryPalette(defaultPalette)
			.accentPalette('<%= materialAccentTheme %>');

		loadSVGSprite('navigation');
		loadSVGSprite('action');
		loadSVGSprite('content');
		loadSVGSprite('toggle');
		loadSVGSprite('alert');
		loadSVGSprite('social');

		/**
		 * Load an SVG sprite from the bower components.
		 * @api private
		 * @param {String} name The name of the sprite
		 * @param {String} [spriteName] The name of the svg sprite, defaults to name
		 */
		function loadSVGSprite(name, spriteName) {
			spriteName = spriteName || 'svg-sprite-' + name + '.svg';
			spriteName = 'bower_components/material-design-icons/sprites/svg-sprite/' + spriteName;
			$mdIconProvider.iconSet(name, spriteName);
		}
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
			if (!next.authenticate) {
				return;
			}

			Auth.isLoggedInAsync(function (loggedIn) {
				if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
					$location.path('/login');
				}
			});
		});
	}<% } %>;

})();
