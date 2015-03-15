/**
 * @ngdoc overview
 * @name auth.interceptor
 * @description
 * The `<%= scriptAppName %>.auth.interceptor` module which provides:
 *
 * - {@link auth.interceptor.service:AuthInterceptor AuthInterceptor-service}
 */

/**
 * @ngdoc service
 * @name auth.interceptor.service:AuthInterceptor
 * @description
 * Interceptor for handling authentication
 */

(function () {
	'use strict';

	// register the AuthInterceptor on the application module
	angular
		.module('<%= scriptAppName %>.auth.interceptor', [])
		.factory('AuthInterceptor', AuthInterceptor);


	/**
	 * @ngdoc function
	 * @name auth.interceptor.provider:AuthInterceptor
	 * @description
	 * Provider of the {@link auth.interceptor.service:AuthInterceptor AuthInterceptor-service}
	 *
	 * @param {Service} $q The promise service to use
	 * @param {Service} $cookieStore The cookie service to use
	 * @param {Service} $location The location service to use
	 * @returns {Service} {@link auth.interceptor.service:AuthInterceptor AuthInterceptor-service}
	 */

	AuthInterceptor.$inject = ['$q', '$cookieStore', '$location', '$timeout'];

	function AuthInterceptor($q, $cookieStore, $location, $timeout) {
		// public API
		return {

			/**
			 * @ngdoc function
			 * @name request
			 * @methodOf auth.interceptor.service:AuthInterceptor
			 * @description
			 * Add authorization token to headers
			 * @param {Object} config The configuration
			 * @returns {Object} config
			 */
			request: request,

			/**
			 * @ngdoc function
			 * @name responseError
			 * @methodOf auth.interceptor.service:AuthInterceptor
			 * @description
			 * Intercept 401s and redirect you to login
			 * @param {Object} response The response
			 * @returns {Promise} Rejected promise
			 */
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
				// remove any stale tokens
				$cookieStore.remove('token');

				// use timeout to perform location change
				// in the next digest cycle
				$timeout(function () {
					$location.path('/login');
				}, 0);

				return $q.reject(response);
			}
			return $q.reject(response);
		}
	}

})();
