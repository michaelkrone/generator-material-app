/**
 * @ngdoc service
 * @name <%= moduleName %>.service:<%= controllerName %>
 * @description
 * Makes stuff with this '<%= name %>' thingy.
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
	 * Provider of the {@link <%= moduleName %>.service:<%= controllerName %> <%= controllerName %>}.
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @returns {Object} The service definition for the <%= controllerName %> service
	 */

	// add <%= controllerName %> dependencies to inject
	// <%= controllerName %>.$inject = [''];

	function <%= controllerName %>() {

		// return public API
		return {
			doSomething: doSomething
		};

		/**
		 * @ngdoc function
		 * @name title
		 * @methodOf <%= moduleName %>.service:<%= controllerName %>
		 * @description
		 * Exported instance method that returns the name of this service.
		 *
		 * @returns {String} The name of this service
		 */
		function doSomething () {
			return '<%= name %>';
		}
	}

})();
