/**
 * @ngdoc overview
 * @name resource
 * @requires lodash
 * @description
 * The <%= scriptAppName %>.resource module
 */

/**
 * @ngdoc service
 * @name resource.service:Resource
 * @description
 *
 */

(function () {
	'use strict';

	// register the service as Resource
	angular
		.module('<%= scriptAppName %>.resource', [
			'ngResource',
			'<%= scriptAppName %>.lodash'
		])
		.factory('Resource', Resource);


	/**
	 * @ngdoc function
	 * @name resource.provider:Resource
	 * @description
	 * Provider for the {@link resource.service:Resource Resource-service}
	 *
	 * @param {Service} $resource The resource service to use
	 * @param {Service} _ The _ service to use
	 * @returns {Function} Resource-factory
	 */

	Resource.$inject = ['$resource', '_'];

	function Resource($resource, _) {
		// default $resource parameter configuration for MongoDB like id's
		var defaultParams = {
			id: '@_id'
		};

		// default $resource option configuration for RESTy PUT requests
		var defaultMethods = {
			update: {method: 'PUT', isArray: false},
			create: {method: 'POST'}
		};

		// public API
		return createResource;

		/**
		 * Create a resource with overwritten $save method
		 *
		 * @param url
		 * @param params
		 * @param methods
		 * @returns {$resource}
		 */
		function createResource(url, params, methods) {
			var resource;

			params = _.defaults({}, params, defaultParams);
			methods = _.defaults({}, methods, defaultMethods);
			resource = $resource(url, params, methods);

			// overwrite $save to automatically call $create or $update
			resource.prototype.$save = function save() {
				if (!this._id) {
					return this.$create();
				}

				return this.$update();
			};

			return resource;
		}
	}

})();
