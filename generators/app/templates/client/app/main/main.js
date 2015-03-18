(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>.main', ['ui.router'])
		.config(configMainRoute);

	// inject configMainRoute dependencies
	configMainRoute.$inject = ['$stateProvider', 'mainMenuProvider'];

	// route config function configuring the passed $stateProvider
	function configMainRoute($stateProvider, mainMenuProvider) {
		var mainState = {
			name: 'main',
			url: '/',
			authenticate: true,
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'vm'
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Home',
			state: mainState.name,
			order: 1
		});
	}

})();
