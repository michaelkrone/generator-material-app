(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires <%= scriptAppName %>.mainMenu
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.main', [
			'ui.router',
			'<%= scriptAppName %>.mainMenu'
		])
		.config(config<%= classedName %>MainRoutes);

	// inject config<%= classedName %>MainRoutes dependencies
	config<%= classedName %>MainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the <%= name %>.main state with the list template for the
	 * 'main' view paired with the <%= classedName %>MainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function config<%= classedName %>MainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: '<%= name %>.main',
			parent: '<%= name %>',
			url: '/',<% if (secure) {%>
			authenticate: true,
			role: '<%= role %>',<%}%>
			views: {
				'@<%= name %>': {
					templateUrl: '<%= mainHtmlUrl %>',
					controller: '<%= classedName %>MainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: '<%= menuItem %>',
			state: mainState.name<% if (secure) {%>,
			role: '<%= role %>'<%}%>
		});
	}

})();
