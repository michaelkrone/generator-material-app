/**
 * @ngdoc overview
 * @name auth
 * @description
 * The `<%= scriptAppName %>.auth` module
 *
 * @requires ngResource
 * @requires ngCookies
 * @requires auth.interceptor
 * @requires auth.user
 */

/**
 * @ngdoc service
 * @name auth.service:Auth
 * @description
 * Authentication service
 */

(function () {
	'use strict';

	// register the service as Auth
	angular
		.module('<%= scriptAppName %>.auth', [
			'ngResource',
			'ngCookies',
			'<%= scriptAppName %>.auth.interceptor',
			'<%= scriptAppName %>.auth.user'
		])
		.factory('Auth', Auth)
		.constant('userRoles', getUserRoles());


	/**
	 * @ngdoc function
	 * @name auth.provider:Auth
	 * @description
	 * Auth services, including user administration
	 *
	 * @param {Service} $http The http service to use
	 * @param {Service} $cookies The cookies service to use
	 * @param {Service} $location The location service to use
	 * @param {Service} _ The lodash service to use
	 * @param {Service} User The User service to use
	 * @param {Service} $cookieStore The cookieStore service to use
	 * @param {Service} $q The promise service to use
	 * @param {Service} $templateCache The templateCache service to use
	 * @param {Service} userRoles The userRoles
	 * @returns {Service} {@link auth.service:Auth Auth-service}
	 */

	Auth.$inject = ['$http', '$cookieStore', '$cookies', '$location', '$q', '$templateCache', '_', 'User', 'userRoles'];

	function Auth($http, $cookieStore, $cookies, $location, $q, $templateCache, _, User, userRoles) {
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
			isRoot: isRoot,
			getToken: getToken,
			hasRole: hasRole,
			getSettableRoles: getSettableRoles,
			getRole: getRole,
			getRoleForName: getRoleForName,
			getNameForRole: getNameForRole
		};


		/**
		 * @ngdoc function
		 * @name login
		 * @methodOf auth.service:Auth
		 * @description
		 * Authenticate user and save token
		 *
		 * @param {Object} user login info
		 * @param {Function} [callback] A callback
		 * @return {Promise} A promise
		 */
		function login(user, callback) {
			/* jshint validthis:true */
			var cb = callback || angular.noop;
			var deferred = $q.defer();
			$cookies.customerId = user.customerId;

			$http.post('/auth/local', {
				customerId: user.customerId,
				name: user.name,
				password: user.password
			}).success(function (data) {
				$cookieStore.put('token', data.token);
				$cookieStore.remove('customerID');
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
		 * @ngdoc function
		 * @name logout
		 * @methodOf auth.service:Auth
		 * @description
		 * Delete access token and user info.
		 * Redirect to login page by forcing a page reload.
		 *
		 */
		function logout() {
			$cookieStore.remove('token');
			currentUser = {};
			$templateCache.removeAll();
			$location.path('/login');
		}


		/**
		 * @ngdoc function
		 * @name createUser
		 * @methodOf auth.service:Auth
		 * @description
		 * Create a new user
		 *
		 * @param {Object} user user info to use
		 * @param {Function} [callback] A callback
		 * @return {Promise} The promise of the User service
		 */
		function createUser(user, callback) {
			/* jshint validthis:true */
			var cb = callback || angular.noop;

			return User.save(user,
				function (data) {
					return cb(user);
				},
				function (err) {
					return cb(err);
				}.bind(this)).$promise;
		}


		/**
		 * @ngdoc method
		 * @name changePassword
		 * @methodOf auth.service:Auth
		 * @description
		 * Change password
		 *
		 * @param {String} oldPassword The old used password
		 * @param {String} newPassword The new password to use
		 * @param {Function} [callback] A callback
		 * @return {Promise} The promise of the User service
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
		 * @ngdoc function
		 * @name getCurrentUser
		 * @methodOf auth.service:Auth
		 * @description
		 * Gets all available info on authenticated user
		 *
		 * @returns {Object} User
		 */
		function getCurrentUser() {
			return currentUser;
		}


		/**
		 * @ngdoc function
		 * @name isLoggedIn
		 * @methodOf auth.service:Auth
		 * @description
		 * Check if a user is logged in
		 *
		 * @returns {Boolean} True if user is logged in
		 */
		function isLoggedIn() {
			return currentUser.hasOwnProperty('role');
		}


		/**
		 * @ngdoc function
		 * @name isLoggedInAsync
		 * @methodOf auth.service:Auth
		 * @description
		 * Waits for currentUser to resolve before checking if user is logged in
		 *
		 * @param {Function} cb A Callback
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
		 * @ngdoc function
		 * @name isAdmin
		 * @methodOf auth.service:Auth
		 * @description
		 * Check if a user is an admin
		 *
		 * @param {Object} [user] - The user to check for the role. If no user is provided, the current user will be used
		 * to check for the role.
		 * @return {Boolean} True if user is admin
		 */
		function isAdmin(user) {
			user = user || getCurrentUser();
			return user.role === 'admin';
		}


		/**
		 * @ngdoc function
		 * @name isRoot
		 * @methodOf auth.service:Auth
		 * @description
		 * Check if a user is an admin. If no user is provided, the current user will be used
		 * to check for the role.
		 *
		 * @param {Object} [user] - The user to check for the role
		 * @return {Boolean} True if user is root
		 */
		function isRoot(user) {
			user = user || getCurrentUser();
			return user.role === 'root';
		}


		/**
		 * @ngdoc function
		 * @name getToken
		 * @methodOf auth.service:Auth
		 * @description
		 * Get auth token
		 *
		 * @returns {String} The token
		 */
		function getToken() {
			return $cookieStore.get('token');
		}

		/**
		 * @ngdoc function
		 * @name hasRole
		 * @methodOf auth.service:Auth
		 * @description
		 * Check if a user has at least the same role as the given one
		 *
		 * @param {String} role The role to check against
		 * @param {Object|User} [user] The user object to check, if no user is given the current user is used.
		 */
		function hasRole(role, user) {
			user = user || getCurrentUser();
			return _.findIndex(userRoles, {role: user.role}) >= _.findIndex(userRoles, {role: role});
		}

		/**
		 * @ngdoc function
		 * @name getSettableRoles
		 * @methodOf auth.service:Auth
		 * @description
		 * Returns all settable roles from the defined userRoles
		 *
		 * @returns {Array} Array of settable roles
		 */
		function getSettableRoles() {
			return _.filter(userRoles, {settable: true});
		}

		/**
		 * @ngdoc function
		 * @name getRole
		 * @methodOf auth.service:Auth
		 * @description
		 * Returns the role object for the users role name
		 *
		 * @returns {Object} The role object
		 */
		function getRole(user) {
			user = user || getCurrentUser();
			return _.find(userRoles, {role: user.role});
		}

		/**
		 * Resolve the human readable role name for a role specifier
		 * @returns {String|null} The name for the given role or null if
		 * no role could be found
		 */
		function getNameForRole(role) {
			return _.find(userRoles, {role: role}).name || null;
		}

		/**
		 * Resolve the role specifier for a human readable role string
		 * @returns {String|null} The role for the given name or null if
		 * no role could be found
		 */
		function getRoleForName(name) {
			return _.find(userRoles, {name: name}).role || null;
		}

	}

	/**
	 * @ngdoc function
	 * @name getUserRoles
	 * @methodOf auth.service:Auth
	 * @description
	 * Get the array of all user roles
	 *
	 * @returns {Array} Each role has this format `{name: String, role: String, settable: boolean}`
	 */
	function getUserRoles() {
		return [
			{name: 'User', role: 'user', settable: true},
			{name: 'Admin', role: 'admin', settable: true},
			{name: 'Root', role: 'root', settable: false}
		];
	}

})();
