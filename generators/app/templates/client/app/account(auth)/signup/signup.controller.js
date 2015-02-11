(function () {
	'use strict';

	// register the controller as SignupController
	angular
		.module('<%= scriptAppName %>.account')
		.controller('SignupController', SignupController);

	// add SignupController dependencies to inject
	SignupController.$inject = ['Auth', '$location'];

	/**
	 * SignupController constructor
	 */
	function SignupController(Auth, $location) {
		var vm = this;

		// view model bindings
		vm.user = {};
		vm.errors = {};
		vm.submitted = false;
		vm.register = register;

		function register(form) {
			if (form.$valid) {
				Auth
					.createUser(vm.user)
					.then(function () {
						// Account created, redirect to home
						$location.path('/');
					}).catch(handleError);
			}

			function handleError(err) {
				err = err.data;
				vm.errors = {};
				// Update validity of form fields that match the mongoose errors
				angular.forEach(err.errors, function (error, field) {
					form[field].$setValidity('mongoose', false);
					vm.errors[field] = error.message;
				});
			}
		}
	}

})();
