/**
 * @ngdoc service
 * @name <%= moduleName %>.service:<%= controllerName %>
 * @description
 * Provides stuff for this '<%= name %>' thingy.
 */

(function () {
	'use strict';

	// register the service as <%= controllerName %>
	angular.module('<%= moduleName %>')
		.provider('<%= controllerName %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.service:<%= controllerName %> <%= controllerName %>}.
	 * AngularJS will instantiate a singleton which is the object resulting from the $get method call
	 * However, providers can be configured in the config phase of your angular application
	 *
	 * @returns {Object} The intatiated provider object for the <%= controllerName %> provider
	 */

	// add <%= controllerName %> dependencies to inject
	// <%= controllerName %>.$inject = [];

	function <%= controllerName %>() {
		// factory members
		var name = '<%= name %>';


		// public configuration API

		/**
		 * @ndoc function
		 * @name $get
		 * @methodOf <%= moduleName %>.provider:<%= controllerName %>
		 * @description
		 * Function called by Angular.js to intantiate the service object.
		 *
		 * @returns {Object} A new <%= controllerName %> object
		 */
		this.$get = <%= controllerName %>Factory;

		/**
		 * @ndoc function
		 * @name setName
		 * @methodOf <%= moduleName %>.provider:<%= controllerName %>
		 * @description
		 * Set the name property of this provider
		 */
		this.setName = function setName(s) {
			name = s;
		};

		/**
		 * @ndoc function
		 * @name <%= controllerName %>
		 * @constructor
		 * @api private
		 * @methodOf <%= moduleName %>.service:<%= controllerName %>
		 * @description
		 * A private constructor of this provider, called by the $get function
		 *
		 * @returns {Object} The <%= name %> provider object
		 */
		function <%= controllerName %>() {

			/**
			 * @ndoc function
			 * @name <%= controllerName %>
			 * @methodOf <%= moduleName %>.service:<%= controllerName %>
			 * @description
			 * @returns {string} A greeting to the name property of this provider
			 */
			this.greet = function () {
				return 'Hello ' + name;
			};
		}

		/**
		 * @ndoc function
		 * @name <%= name %>Factory
		 * @methodOf <%= moduleName %>.provider:<%= controllerName %>
		 * @description
		 * Intatiate a new <%= controllerName %> object and return it.
		 *
		 * @returns {Object} A new <%= controllerName %> object
		 */

		// other providers needed by the $get function
		// <%= name %>Factory.$inject = [];

		function <%= controllerName %>Factory() {
			return new <%= controllerName %>();
		}
	}

})();
