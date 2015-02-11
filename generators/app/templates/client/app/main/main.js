(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>.main', ['ui.router'])
		.config(configMainRoute);

	// inject configMainRoute dependencies
	configMainRoute.$inject = ['$stateProvider'];

	// route config function configuring the passed $stateProvider
	function configMainRoute($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainController',
				controllerAs: 'vm'
			});
	}

})();
