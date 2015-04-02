(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.admin.main module
	 * and configure it.
	 *
	 * @requires {ui.router}
	 */

	angular
		.module('<%= scriptAppName %>.admin.main', [
			'ui.router',
			'<%= scriptAppName %>.mainMenu'
		])
		.config(configAdminMain);

	// inject configAdminMain dependencies
	configAdminMain.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the user.main state with the list template for the
	 * 'main' view paired with the UserMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configAdminMain($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'admin.main',
			parent: 'admin',
			url: '/',
			authenticate: true,
			role: 'admin',
			views: {
				'@admin': {
					templateUrl: 'app/admin/main/main.html',
					controller: 'AdminMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Administration',
			state: mainState.name,
			role: 'admin'
		});
	}

})();
