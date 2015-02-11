(function () {
	'use strict';

	// register the AuthInterceptor on the application module
	angular
		.module('<%= scriptAppName %>.auth.interceptor', [])
		.factory('AuthInterceptor', AuthInterceptor);

	// add AuthInterceptor dependencies to inject
	AuthInterceptor.$inject = ['$q', '$cookieStore', '$location'];

	/**
	 * AuthInterceptor factory constructor
	 *
	 * @param $q
	 * @param $cookieStore
	 * @param $location
	 * @returns {{request: (request|*), responseError: *}}
	 * @constructor
	 */
	function AuthInterceptor($q, $cookieStore, $location) {
		// public API
		return {
			request: request,
			responseError: responseError
		};

		// Add authorization token to headers
		function request(config) {
			config.headers = config.headers || {};
			if ($cookieStore.get('token')) {
				config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
			}
			return config;
		}

		// Intercept 401s and redirect you to login
		function responseError(response) {
			if (response.status === 401) {
				$location.path('/login');
				// remove any stale tokens
				$cookieStore.remove('token');
				return $q.reject(response);
			}
			return $q.reject(response);
		}
	}

})();
