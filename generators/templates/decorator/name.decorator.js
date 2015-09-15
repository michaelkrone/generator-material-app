/**
 * @ngdoc service
 * @name <%= moduleName %>.decorator:<%= controllerName %>
 * @description
 * Decorates the <%= serviceToDecorate %> service.
 */

(function () {
	'use strict';

	// register the decorator config
	angular
		.module('<%= moduleName %>')
		.config(<%= controllerName %>Config);

	// add <%= controllerName %>Config dependencies to inject
	<%= controllerName %>Config.$inject = ['$provide'];

	/*
	 * @ngdoc function
	 * @api private
	 * @methodOf <%= moduleName %>
	 * @description
	 * The config function to decorate the <%= serviceToDecorate %> service. Decorates
	 * <%= serviceToDecorate %>' with the <%= controllerName %>.
	 *
	 * @param {Object} $provide the Angular.js provide service
	 */
	function <%= controllerName %>Config($provide) {
		$provide.decorator('<%= serviceToDecorate %>', <%= controllerName %>);
	}

	// add <%= controllerName %> dependencies to inject
	<%= controllerName %>.$inject = ['$delegate'];

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.provider:<%= controllerName %> <%= controllerName %>}
	 */
	function <%= controllerName %>($delegate) {

		/**
		 * @ngdoc property
		 * @name name
		 * @api private
		 * @propertyOf <%= moduleName %>.decorator:<%= controllerName %>
		 * @description
		 * A name
		 *
		 * @returns {String}
		 */
		var name = '<%= name %>';

		/**
		 * @ngdoc function
		 * @name <%= controllerName %>Function
		 * @methodOf <%= moduleName %>.decorator:<%= controllerName %>
		 * @description
		 * Decorate the service with a 'getDelegatedName' that returns the name of this decorator.
		 *
		 * @returns {Function} The decorated <%= serviceToDecorate %> service
		 */
		return function <%= controllerName %>Function() {
			// apply decorations to $delegate
			$delegate.getName = getDelegatedName;

			return $delegate;

			/**
			 * @ngdoc function
			 * @name getDelegatedName
			 * @methodOf <%= serviceToDecorate %>
			 * @description
			 * A function to return the name of this decorator.
			 *
			 * @returns {Function} The new <%= serviceToDecorate %> method
			 */
			function getDelegatedName() {
				return name;
			};
		}
	}

})();
