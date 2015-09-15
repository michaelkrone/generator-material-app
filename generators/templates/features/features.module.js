/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * Introduce the <%= moduleName %> module and configure it.
 *
 * @requires ui.router
 * @requires <%= moduleName %>.mainMenu
 */
(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= moduleName %>', [
			// Add modules below
			'ui.router',
			'<%= componentModule %>.mainMenu'
		])
		.config(configFeaturesRoute);

	/*
	 * @ngdoc function
	 * @api private
	 * @name configFeaturesRoute
	 * @methodOf <%= moduleName %>
	 * @description
	 * <%= moduleName %> config function. Register module routes and the menu item 'Features'.
	 * Configuring the passed $stateProvider.
	 *
	 * @param {Object} $stateProvider The ui router state provider to register the '<%= name %>' state on
	 * @param {Object} mainMenuProvider The main menu provider to register the 'Features' menu entry on
	 */

	// inject configFeaturesRoute dependencies
	configFeaturesRoute.$inject = ['$stateProvider', 'mainMenuProvider'];

	function configFeaturesRoute($stateProvider, mainMenuProvider) {
		var state = {
			name: 'features',
			url: '/features',
			templateUrl: 'app/features/features.html',
			controller: 'FeaturesController',
			controllerAs: 'features'
		};

		var menuConfig = {
			name: 'Features',
			state: state.name,
			order: 1000,
			icon: 'social:ic_whatshot_24px'
		};

		$stateProvider.state(state);
		mainMenuProvider.addMenuItem(menuConfig);
	}

})();
