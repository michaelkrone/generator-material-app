/**
 * @ngdoc overview
 * @name auth.user
 * @description
 * The `<%= scriptAppName %>.auth.user` module which provides:
 *
 * - {@link auth.user.service:User User-service}
 * - {@link auth.user.service:UserService UserService-service}
 *
 * @requires resource
 */

/**
 * @ngdoc service
 * @name auth.user.service:User
 * @description
 * Angular resource for handling communication with the api/user route
 */

/**
 * @ngdoc service
 * @name auth.user.service:UserService
 * @description
 * Service with function for dealing with userdata
 */

(function () {
	'use strict';

	// register the service as User
	angular
		.module('<%= scriptAppName %>.auth.user', ['<%= scriptAppName %>.resource'])
		.factory('User', User)
		.service('UserService', UserService);


	/**
	 * @ngdoc function
	 * @name auth.user.provider:User
	 * @description
	 * User resource constructor
	 *
	 * @param {Service} $resource The resource service to use
	 * @returns {Service} {@link auth.user.service:User User-service}
	 */

	User.$inject = ['Resource'];

	function User($resource) {
		// factory members
		var apiURL = '/api/users';
		var methods = {
			changePassword: {
				method: 'PUT',
				params: {controller: 'password'}
			},
			setPassword: {
				method: 'PUT',
				params: {controller: 'admin'}
			},
			get: {
				method: 'GET',
				params: {id: 'me'}
			}
		};

		return $resource(apiURL + '/:id/:controller', {}, methods);
	}


	/**
	 * @ngdoc function
	 * @name auth.user.provider:UserService
	 * @description
	 * UserService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {Service} User The resource provided by testApp.user.resource
	 * @returns {Service} {@link auth.user.service:UserService UserService-service}
	 */

	UserService.$inject = ['User'];

	function UserService(User) {

		return {
			create: create,
			update: update,
			remove: remove,
			setPassword: setPassword
		};

		/**
		 * @ngdoc function
		 * @name create
		 * @methodOf auth.user.service:UserService
		 * @description
		 * Save a new user
		 *
		 * @param {Object} user The userData to save
		 * @param {Function} [callback] A callback
		 * @returns {Promise} A promise
		 */
		function create(user, callback) {
			var cb = callback || angular.noop;

			return User.create(user,
				function (user) {
					return cb(user);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * @ngdoc function
		 * @name remove
		 * @methodOf auth.user.service:UserService
		 * @description
		 * Remove a user
		 *
		 * @param {Object} user The userData to remove
		 * @param {Function} [callback] A callback
		 * @return {Promise} A promise
		 */
		function remove(user, callback) {
			var cb = callback || angular.noop;

			return User.remove({id: user._id},
				function (user) {
					return cb(user);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * @ngdoc function
		 * @name update
		 * @methodOf auth.user.service:UserService
		 * @description
		 * Update a user
		 *
		 * @param {Object} user The userData to update
		 * @param {Function} [callback] A callback
		 * @return {Promise} A promise
		 */
		function update(user, callback) {
			var cb = callback || angular.noop;

			return User.update(user,
				function (user) {
					return cb(user);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * @ngdoc function
		 * @name setPassword
		 * @methodOf auth.user.service:UserService
		 * @description
		 * Force setting the password for admin users
		 *
		 * @param {Object} data The password to set
		 * @param {Function} [callback] A callback
		 * @return {Promise} A promise
		 */
		function setPassword(data, callback) {
			var cb = callback || angular.noop;

			return User.setPassword(data,
				function (user) {
					return cb(user);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	}

})();
