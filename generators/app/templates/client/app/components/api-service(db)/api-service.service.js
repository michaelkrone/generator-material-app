/**
 * @ngdoc service
 * @name <%= componentModule %>.apiservice:ApiService
 * @description
 * API resource service
 */

(function () {
	'use strict';

	angular
		.module('<%= componentModule %>.apiservice')
		.service('ApiService', ApiService);

	/**
	 * @ngdoc function
	 * @name <%= componentModule %>.provider:ApiService
	 * @description
	 * Provider of the {@link <%= componentModule %>.apiservice:ApiService ApiService}.
	 *
	 * @returns {Object} The service definition for the ApiService service
	 */

	// add ApiService dependencies to inject
	// ApiService.$inject = [];

	function ApiService() {
		return ApiServiceConstructor;
	}

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= componentModule %>.provider:ApiServiceConstructor
	 * @description
	 * Provider of the {@link <%= componentModule %>.apiservice:ApiServiceConstructor ApiServiceConstructor}.
	 *
	 * @returns {Object} The constructor function for the ApiService service
	 */
	function ApiServiceConstructor(resource) {

		/**
		 * @ngdoc function
		 * @name query
		 * @methodOf <%= componentModule %>.apiservice:ApiService
		 * @description
		 * Query items.
		 *
		 * @params {Object} query The query to send
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the resource query
		 */
		this.query = function query(query, callback) {
			return promisify(resource.query, query, callback);
		};

		/**
		 * @ngdoc function
		 * @name create
		 * @methodOf <%= componentModule %>.apiservice:ApiService
		 * @description
		 * Create a new item.
		 *
		 * @params {Object} item The item to create
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the resource query
		 */
		this.create = function create(item, callback) {
			return promisify(resource.create, item, callback);
		};

		/**
		 * @ngdoc function
		 * @name save
		 * @methodOf <%= componentModule %>.apiservice:ApiService
		 * @description
		 * Creates a new item or updates an existing one.
		 *
		 * @params {Object} item The item to create or update
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the resource query
		 */
		this.save = function save(item, callback) {
			return promisify(resource.save, item, callback);
		};

		/**
		 * @ngdoc function
		 * @name update
		 * @methodOf <%= componentModule %>.apiservice:ApiService
		 * @description
		 * Update an item.
		 *
		 * @params {Object} item The item to update
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the resource query
		 */
		this.update = function update(item, callback) {
			return promisify(resource.update, item, callback);
		};

		/**
		 * @ngdoc function
		 * @name remove
		 * @methodOf <%= componentModule %>.apiservice:ApiService
		 * @description
		 * Remove an item.
		 *
		 * @params {Object} item The item to remove or an object containing an '_id' property will do.
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the resource query
		 */
		this.remove = function remove(item, callback) {
			return promisify(resource.remove, {id: item._id}, callback);
		};
		
	}

	/**
	 * @ngdoc function
	 * @name promisify
	 * @api private
	 * @description
	 * Call a passed function and pass the given arguments. Return the promise of the
	 * function call.
	 *
	 * @param {Function} func The function to call
	 * @param {*} itemData The argument to pass the method
	 * @param {Function} callback The callback used for success and error
	 *
	 * @return {Promise} The promise from the method call
	 */
	function promisify(func, itemData, callback) {
		var cb = callback || angular.noop;

		return func(itemData,
			function resolved(item) { return cb(null, item); },
			function rejected(err) { return cb(err); }
		).$promise;
	}

})();
