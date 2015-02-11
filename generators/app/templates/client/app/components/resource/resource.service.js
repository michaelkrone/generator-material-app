(function () {
	'use strict';

	// register the service as Resource
	angular
		.module('<%= scriptAppName %>.resource', ['<%= scriptAppName %>.lodash'])
		.factory('Resource', Resource);

	// add Resource dependencies to inject
	Resource.$inject = ['$resource', '_'];

	/**
	 * Resource constructor
	 *
	 * @param $resource
	 * @returns {createResource}
	 * @constructor
	 */
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
		 *
		 * Create a resource with overwriten $save method
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
