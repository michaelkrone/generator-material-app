/**
 * @ngdoc controller
 * @name <%= moduleName %>.controller:<%= controllerName %>
 * @description
 * Controls the <%= subPath %> route of the '<%= name %>' management.
 */

(function () {
	'use strict';

	// register the <%= subPath %> controller as <%= controllerName %>
	angular
		.module('<%= moduleName %>')
		.controller('<%= controllerName %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.controller:<%= controllerName %> <%= controllerName %>}
	 *
	 * @params {Object} Toast The toast service to display messages to the user
	 * @params {Array} <%= arrayName %> The array of <%= name %> resolved by the route
	 */

	// add <%= controllerName %> dependencies to inject
	<%= controllerName %>.$inject = ['<%= arrayName %>'];

	function <%= controllerName %>(<%= arrayName %>) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name title
		 * @propertyOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * The title of this component
		 * @returns {String}
		 */
		vm.title = '<%= menuItem %> List';

		/**
		 * @ngdoc property
		 * @name <%= lowerCameledName %>s
		 * @propertyOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * The array of <%= name %>
		 * @returns {Array}
		 */
		vm.<%= arrayName %> = <%= arrayName %>;

		// call the activate function to init the controller
		// activate();

		/**
		 * @ngdoc function
		 * @name activate
		 * @api private
		 * @methodOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * Activates the <%= controllerName %>, initializes variables, calls services,
		 * register sockets, bind to events ...
		 */
		function activate() {}

	}

})();
