(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>.account', ['ui.router'])
		.config(configAccountRoute);

	// inject configAccountRoute dependencies
	configAccountRoute.$inject = ['$stateProvider'];

	// route config function configuring the passed $stateProvider
	function configAccountRoute($stateProvider) {
			var loginState = {
				name: 'login',
				url: '/login',
				templateUrl: 'app/account/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			};

		var signupState = {
				name: 'signup',
				url: '/signup',
				templateUrl: 'app/account/signup/signup.html',
				controller: 'SignupController',
				controllerAs: 'vm'
			};

			var settingsState = {
				name: 'settings',
				url: '/settings',
				templateUrl: 'app/account/settings/settings.html',
				controller: 'SettingsController',
				controllerAs: 'vm',
				authenticate: true
			};

		$stateProvider
			.state(loginState)
			.state(signupState)
			.state(settingsState);
	}

})();
