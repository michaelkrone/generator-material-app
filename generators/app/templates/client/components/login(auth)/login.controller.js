/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.account.controller:LoginController
 * @description
 * Controller for the login page
 */

(function () {
	'use strict';

	// register the controller as LoginController
	angular
		.module('<%= scriptAppName %>.login')
		.controller('LoginController', LoginController);


	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.login.provider:LoginController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.login.controller:LoginController LoginController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $location The location service to use
	 * @returns {Service} {@link <%= scriptAppName %>.login.controller:LoginController LoginController}
	 */

	LoginController.$inject = ['Auth', '$location'];

	function LoginController(Auth, $location) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name auth
		 * @propertyOf <%= scriptAppName %>.login.controller:LoginController
		 * @description
		 * The auth service of this controller
		 *
		 */
		vm.auth = Auth;

		/**
		 * @ngdoc property
		 * @name location
		 * @propertyOf <%= scriptAppName %>.login.controller:LoginController
		 * @description
		 * The location service of this controller
		 *
		 */
		vm.location = $location;

		/**
		 * @ngdoc property
		 * @name user
		 * @propertyOf <%= scriptAppName %>.account.controller:LoginController
		 * @description
		 * The user data to use as login(auth)
		 *
		 * @returns {User} The user data
		 */
		vm.user = {};

		/**
		 * @ngdoc property
		 * @name error
		 * @propertyOf <%= scriptAppName %>.account.controller:LoginController
		 * @description
		 * Error flag
		 * @returns {Boolean} True if there is an error
		 */
		vm.error = false;
	}


	/**
	 * @ngdoc function
	 * @name login
	 * @methodOf <%= scriptAppName %>.account.controller:LoginController
	 * @description
	 * Function to use as submit for the login form
	 */
	LoginController.prototype.login = function login() {
		var vm = this;

		vm.auth
			.login({name: vm.user.name, password: vm.user.password})
			.then(loginSuccess)
			.catch(loginError);

		// Logged in, redirect to home
		function loginSuccess() {
			vm.location.path('/');
		}

		// Error, set controllers error object
		function loginError(err) {
			vm.error = err;
		}
	};

})();
