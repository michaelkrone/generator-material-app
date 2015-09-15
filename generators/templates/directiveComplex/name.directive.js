/**
 * @ngdoc directive
 * @name <%= moduleName %>.directive:<%= _.camelize(name) %>
 * @restrict EA
 *
 * @description
 * A description of the complex <%= _.camelize(name) %> directive.
 * The template '<%= htmlUrl %>' will be used.
 */

(function () {
	'use strict';

	// register the directive as <%= _.camelize(name) %>
	angular
		.module('<%= moduleName %>')
		.directive('<%= _.camelize(name) %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.service:<%= controllerName %> <%= controllerName %>} directive
	 * definition object.
	 *
	 * @returns {Object} The directive definition object
	 */

	// add <%= controllerName %> dependencies to inject
	// <%= controllerName %>.$inject = [''];

	function <%= controllerName %>() {
		// directive definition members
		return {
			link: link,
			templateUrl: '<%= htmlUrl %>',
			restrict: 'EA'
		};

		/**
		 * @ngdoc function
		 * @api private
		 * @methodOf <%= moduleName %>.provider:<%= controllerName %>
		 * @description
		 * The directives link function called by Angular.js to link the directive with the element.
		 * Sets a text on the element.
		 *
		 * @param {Object} scope The directives scope
		 * @param {Object} element The element the directive is defined on
		 * @param {Object} attrs The directive element attributes
		 */
		function link(scope, element, attrs) {
			element.text('this is the <%= _.camelize(name) %> directive');
		}
	}

})();
