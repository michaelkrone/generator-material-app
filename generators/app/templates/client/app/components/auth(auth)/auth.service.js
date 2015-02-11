(function () {
	'use strict';

	// register the service as Auth
	angular
		.module('<%= scriptAppName %>.auth', [
			'<%= scriptAppName %>.auth.interceptor',
			'<%= scriptAppName %>.auth.user'
		])
		.factory('Auth', Auth);

	// inject Auth dependencies
	Auth.$inject = ['$http', 'User', '$cookieStore', '$q'];

	/**
	 * Auth services, including user administration
	 *
	 * @param $http
	 * @param User
	 * @param $cookieStore
	 * @param $q
	 * @returns {{login: Function, logout: Function, createUser: Function, changePassword: Function, getCurrentUser: Function, isLoggedIn: Function, isLoggedInAsync: Function, isAdmin: Function, getToken: Function}}
	 * @constructor
	 */
	function Auth($http, User, $cookieStore, $q) {
		var currentUser = {};

		if ($cookieStore.get('token')) {
			currentUser = User.get();
		}

		return {
			login: login,
			logout: logout,
			createUser: createUser,
			changePassword: changePassword,
			getCurrentUser: getCurrentUser,
			isLoggedIn: isLoggedIn,
			isLoggedInAsync: isLoggedInAsync,
			isAdmin: isAdmin,
			getToken: getToken
		};

		/**
		 * Authenticate user and save token
		 *
		 * @param  {Object}   user     - login info
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function login(user, callback) {
			var cb = callback || angular.noop;
			var deferred = $q.defer();

			$http.post('/auth/local', {
				email: user.email,
				password: user.password
			}).success(function (data) {
				$cookieStore.put('token', data.token);
				currentUser = User.get();
				deferred.resolve(data);
				return cb();
			}).error(function (err) {
				this.logout();
				deferred.reject(err);
				return cb(err);
			}.bind(this));

			return deferred.promise;
		}

		/**
		 * Delete access token and user info
		 *
		 * @param  {Function}
		 */
		function logout() {
			$cookieStore.remove('token');
			currentUser = {};
		}

		/**
		 * Create a new user
		 *
		 * @param  {Object}   user     - user info
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function createUser(user, callback) {
			var cb = callback || angular.noop;

			return User.save(user,
				function (data) {
					$cookieStore.put('token', data.token);
					currentUser = User.get();
					return cb(user);
				},
				function (err) {
					this.logout();
					return cb(err);
				}.bind(this)).$promise;
		}

		/**
		 * Change password
		 *
		 * @param  {String}   oldPassword
		 * @param  {String}   newPassword
		 * @param  {Function} callback    - optional
		 * @return {Promise}
		 */
		function changePassword(oldPassword, newPassword, callback) {
			var cb = callback || angular.noop;

			return User.changePassword({id: currentUser._id}, {
				oldPassword: oldPassword,
				newPassword: newPassword
			}, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		}

		/**
		 * Gets all available info on authenticated user
		 *
		 * @return {Object} user
		 */
		function getCurrentUser() {
			return currentUser;
		}

		/**
		 * Check if a user is logged in
		 *
		 * @return {Boolean}
		 */
		function isLoggedIn() {
			return currentUser.hasOwnProperty('role');
		}

		/**
		 * Waits for currentUser to resolve before checking if user is logged in
		 */
		function isLoggedInAsync(cb) {
			if (currentUser.hasOwnProperty('$promise')) {
				currentUser.$promise.then(function () {
					cb(true);
				}).catch(function () {
					cb(false);
				});
			} else if (currentUser.hasOwnProperty('role')) {
				cb(true);
			} else {
				cb(false);
			}
		}

		/**
		 * Check if a user is an admin
		 *
		 * @return {Boolean}
		 */
		function isAdmin() {
			return currentUser.role === 'admin';
		}

		/**
		 * Get auth token
		 */
		function getToken() {
			return $cookieStore.get('token');
		}
	}

})();
