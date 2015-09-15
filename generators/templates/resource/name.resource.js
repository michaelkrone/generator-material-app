/**
 * @ngdoc service
 * @name <%= moduleName %>.service:<%= controllerName %>
 * @description
 * Factory for '<%= name %>' resources.
 * @returns {Object} <% if (features.useOriginalResource) { %>A wrapped Angular.js $resource <% } else { %>
 * an Angular.js $resource <% } %> mapped to the '<%= apiUrl %>' URI with '/:id/:controller' registered as
 * dynamic parameters.
 */

(function () {
	'use strict';

	// register the service as <%= controllerName %>
	angular
		.module('<%= moduleName %>')
		.factory('<%= controllerName %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.service:<%= controllerName %> <%= controllerName %>} resource.
	 */

	// add <%= controllerName %> dependencies to inject
	<%= controllerName %>.$inject  = [<% if (features.useOriginalResource) { %>'$resource'<% } else { %>'Resource'<% } %>];

	function <%= controllerName %>($resource) {

		/**
		 * @api private
		 * @propertyOf <%= moduleName %>.provider:<%= controllerName %>
		 * @description
		 * The API URL
		 * @returns {String}
		 */
		var apiURL = '<%= apiUrl%>';
		
		/**
		 * @description
		 * Create a new resource object with the factories api url.
		 * @returns {Object} The instantiated resource object
		 */
		return $resource(apiURL + '/:id/:controller'<% if (features.useOriginalResource) { %>, {id: '@_id'}<% } %>);
	}

})();
