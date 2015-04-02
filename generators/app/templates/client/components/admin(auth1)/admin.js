(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>.admin', [
			'ngNewRouter',
			'<%= scriptAppName %>.admin.main',
			'<%= scriptAppName %>.admin.user',
			'<%= scriptAppName %>.mainMenu'
		])
		.config(configAdmin)
		.run(runAdmin);

	var routeConfig = {
		path: '/admin',
		components: {content: 'admin'}
	};

	var menuItem = {
		name: 'Admin',
		link: routeConfig.path,
		order: 1
	};

	// inject configAdminRoute dependencies
	configAdmin.$inject = ['', '$stateProvider'];

	/**
	 * @ngdoc
	 * @params {Object} mainMenuProvider Add the menu item for this component.
	 * @description
	 * Adds the 'Admin' menu item to the main menu, linking to '/Admin' with order '1'.
	 */

		// inject configAdmin dependencies
	configAdmin.$inject = ['mainMenuProvider'];

	function configAdmin(mainMenuProvider) {
		mainMenuProvider.addMenuItem(menuItem);
	}

	/**
	 * @ngdoc
	 * @params {Object} $router The router service to attach the main route to.
	 * @description
	 * Defines the '/admin' route for the 'admin' component.
	 */

		// inject runAdmin dependencies
	runAdmin.$inject = ['$router'];

	function runAdmin($router) {
		$router.config(routeConfig);
	}
})();
