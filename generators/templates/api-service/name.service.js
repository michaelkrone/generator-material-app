/**
 * @ngdoc service
 * @name <%= moduleName %>:<%= controllerName %>
 * @description
 * Factory for wrapping a '<%= wrappedResource %>' resource and provide promisified methods
 * and an easy to extend base class for adding custom resource related functionality.
 * @returns {Object}
 */

(function () {
	'use strict';

	// register the service as <%= controllerName %>
	angular
		.module('<%= moduleName %>')
		.service('<%= controllerName %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.service:<%= controllerName %> <%= controllerName %>} resource.
	 *
	 * @extends <%= componentModule %>.service:apiService
	 */

	// add <%= controllerName %> dependencies to inject
	<%= controllerName %>.$inject  = ['apiService', '<%= wrappedResource %>'];

	function <%= controllerName %>(apiService, <%= wrappedResource %>) {
		// extend from ApiService, you might want to extend this with
		// methods which are useful for <%= wrappedResource %> related work
		angular.extend(this, apiService.create(<%= wrappedResource %>));
	}

})();
