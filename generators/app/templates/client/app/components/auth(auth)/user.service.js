(function () {
	'use strict';

	// register the service as User
	angular
		.module('<%= scriptAppName %>.auth.user', ['<%= scriptAppName %>.resource'])
		.factory('User', User)
		.service('UserService', UserService);

	// add User dependencies to inject
	User.$inject = ['Resource'];

	/**
	 * User resource constructor
	 * @param $resource
	 * @returns {$resource}
	 * @constructor
	 */
	function User($resource) {
		// factory members
		var apiURL = '/api/users';
		var methods = {
			changePassword: {
				method: 'PUT',
				params: {controller: 'password'}
			},
			get: {
				method: 'GET',
				params: {id: 'me'}
			}
		};

		return $resource(apiURL + '/:id/:controller', {}, methods);
	}

	// add UserService dependencies to inject
	UserService.$inject = ['User'];

	/**
	 * UserService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} User The resource provided by testApp.user.resource
	 * @returns {Object} The service definition for the UserService service
	 */
	function UserService(User) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new user
		 *
		 * @param  {Object}   user - userData
		 * @param  {Function} callback - optional
		 * @return {Promise}
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
		 * Remove a user
		 *
		 * @param  {Object}   user - userData
		 * @param  {Function} callback - optional
		 * @return {Promise}
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
		 * Create a new user
		 *
		 * @param  {Object}   user - userData
		 * @param  {Function} callback - optional
		 * @return {Promise}
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
	}

})();
