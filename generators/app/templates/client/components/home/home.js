(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>.home', [
			'ngNewRouter',
			'<%= scriptAppName %>.mainMenu'
		])
		.config(configHome)
		.run(runHome);

	var routeConfig = {
		path: '/home',
		components: {
			content: 'home'
		}
	};

	var menuItem = {
		name: 'Home',
		icon: 'action:ic_home_24px',
		link: routeConfig.path,
		order: 1
	};

	/**
	 * @ngdoc
	 * @params {Object} mainMenuProvider Add the menu item for this component.
	 * @description
	 * Adds the 'Home' menu item to the main menu, linking to '/home' with order '1'.
	 */

	// inject configHome dependencies here
	configHome.$inject = ['mainMenuProvider'];

	function configHome(mainMenuProvider) {
		mainMenuProvider.addMenuItem(menuItem);
	}

	/**
	 * @ngdoc
	 * @params {Object} $router The router service to attach the main route to.
	 * @description
	 * Defines the '/home' route for the 'home' component.
	 */

	// inject runHome dependencies here
	runHome.$inject = ['$router'];

	function runHome($router) {
		$router.config(routeConfig);
	}

})();
