/**
 * @ngdoc service
 * @name <%= moduleName %>.service:<%= controllerName %>
 * @description
 * Factory for '<%= name %>'s.
 */

(function () {
	'use strict';

	// register the service as <%= controllerName %>
	angular
		.module('<%= moduleName %>')
		.factory('<%= _.classify(name) %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.service:<%= controllerName %> <%= controllerName %>}.
	 * AngularJS will instantiate a singleton which is an object that has the members of this factory.
	 */

	// add <%= controllerName %> dependencies to inject
	// <%= controllerName %>.$inject = [''];

	function <%= controllerName %>() {

		/**
		 * @ngdoc property
		 * @name name
		 * @api private
		 * @propertyOf <%= moduleName %>.service:<%= controllerName %>
		 * @description
		 * The name of this factory
		 *
		 * @returns {String}
		 */
		var name = '<%= name %>';

		// return public API
		return {
			doSomething: doSomething
		};

		/**
		 * @ngdoc function
		 * @name title
		 * @methodOf <%= moduleName %>.service:<%= controllerName %>
		 * @description
		 * Exported function that returns the name of this factory.
		 *
		 * @returns {String} The name of this factory
		 */
		function doSomething() {
			return name;
		}
	}

})();
