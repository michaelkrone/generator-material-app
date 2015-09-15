/**
 * @ngdoc filter
 * @name <%= moduleName %>.filter:<%= controllerName %>
 * @description
 * Filters this '<%= name %>' thingy.
 */

(function () {
	'use strict';

	// register the filter as <%= controllerName %>
	angular
		.module('<%= moduleName %>')
		.filter('<%= controllerName %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.filter:<%= controllerName %> <%= controllerName %>}
	 *
	 * @returns {Function} The '<%= name %>' filter function
	 */

	// add <%= controllerName %> dependencies to inject
	// <%= controllerName %>.$inject = [''];

	function <%= controllerName %>() {

		return filter;

		/**
		 * @ngdoc function
		 * @methodOf <%= moduleName %>.provider:<%= controllerName %>
		 * @description
		 * Filter function for filtering '<%= name %>'s.
		 *
		 * @param {*} input The input to filter
		 * @returns {String} The filtered result
		 */
		function filter(input) {
			return '<%= controllerName %> filter: ' + input;
		}
	}

})();
