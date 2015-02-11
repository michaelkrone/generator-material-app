(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.main module
	 * and configure it.
	 *
	 * @requires {ui.router}
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.main', ['ui.router'])
		.config(config<%= classedName %>MainRoutes);

	// inject config<%= classedName %>MainRoutes dependencies
	config<%= classedName %>MainRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the <%= name %>.main state with the list template for the
	 * 'main' view paired with the <%= classedName %>MainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function config<%= classedName %>MainRoutes($stateProvider) {
		// The main state configuration
		var mainState = {
			name: '<%= name %>.main',
			url: '/',
			views: {
				'@<%= name %>': {
					templateUrl: '<%= mainHtmlUrl %>',
					controller: '<%= classedName %>MainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);
	}

})();
