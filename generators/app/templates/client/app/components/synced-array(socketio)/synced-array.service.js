/**
 * @ngdoc service
 * @name <%= componentModule %>.syncedarray:SyncedArray
 * @description
 * API array service
 */

(function () {
	'use strict';

	angular
		.module('<%= componentModule %>.syncedarray')
		.service('SyncedArray', SyncedArray);

	/**
	 * @ngdoc function
	 * @name <%= componentModule %>.provider:SyncedArray
	 * @description
	 * Provider of the {@link <%= componentModule %>.syncedarray:SyncedArray SyncedArray}.
	 *
	 * @returns {Object} The service definition for the SyncedArray service
	 */

	// add SyncedArray dependencies to inject
	// SyncedArray.$inject = [];

	function SyncedArray() {
		return SyncedArrayConstructor;
	}

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= componentModule %>.provider:SyncedArrayConstructor
	 * @description
	 * Provider of the {@link <%= componentModule %>.syncedarray:SyncedArrayConstructor SyncedArrayConstructor}.
	 *
	 * @returns {Object} The constructor function for the SyncedArray service
	 */
	function SyncedArrayConstructor(modelName) {

		/**
		 * @ngdoc function
		 * @name query
		 * @methodOf <%= componentModule %>.syncedarray:SyncedArray
		 * @description
		 * Query items.
		 *
		 * @params {Object} query The query to send
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the array query
		 */
		this.query = function query(query, callback) {
			return promisify(array.query, query, callback);
		};

		/**
		 * @ngdoc function
		 * @name create
		 * @methodOf <%= componentModule %>.syncedarray:SyncedArray
		 * @description
		 * Create a new item.
		 *
		 * @params {Object} item The item to create
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the array query
		 */
		this.create = function create(item, callback) {
			return promisify(array.create, item, callback);
		};

		/**
		 * @ngdoc function
		 * @name save
		 * @methodOf <%= componentModule %>.syncedarray:SyncedArray
		 * @description
		 * Creates a new item or updates an existing one.
		 *
		 * @params {Object} item The item to create or update
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the array query
		 */
		this.save = function save(item, callback) {
			return promisify(array.save, item, callback);
		};

		/**
		 * @ngdoc function
		 * @name update
		 * @methodOf <%= componentModule %>.syncedarray:SyncedArray
		 * @description
		 * Update an item.
		 *
		 * @params {Object} item The item to update
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the array query
		 */
		this.update = function update(item, callback) {
			return promisify(array.update, item, callback);
		};

		/**
		 * @ngdoc function
		 * @name remove
		 * @methodOf <%= componentModule %>.syncedarray:SyncedArray
		 * @description
		 * Remove an item.
		 *
		 * @params {Object} item The item to remove or an object containing an '_id' property will do.
		 * @params {Function} [callback] The optional callback function to use.
		 * The callback will be called with the error as its first argument (null if no error).
		 *
		 * @returns {Promise} The promise of the array query
		 */
		this.remove = function remove(item, callback) {
			return promisify(array.remove, {id: item._id}, callback);
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
