/**
 * @ngdoc controller
 * @name <%= moduleName %>.controller:<%= controllerName %>
 * @description
 * Controls this '<%= name %>' thingy.
 */

(function () {
	'use strict';

	// register the controller as <%= controllerName %>
	angular
		.module('<%= moduleName %>'<% if (soloModule) { %>, []<% } %>)
		.controller('<%= controllerName %>', <%= controllerName %>);

	/**
	 * @ngdoc function
	 * @constructor
	 * @name <%= moduleName %>.provider:<%= controllerName %>
	 * @description
	 * Provider of the {@link <%= moduleName %>.controller:<%= controllerName %> <%= controllerName %>}
	 */

	// add <%= controllerName %> dependencies to inject
	<%= controllerName %>.$inject = [];

	function <%= controllerName %>() {
		const vm = this;

		/**
		 * @ngdoc property
		 * @name title
		 * @propertyOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * The title of this component
		 * @returns {String}
		 */
		vm.title = '<%= _.capitalize(name) %>';

		/**
		 * @ngdoc function
		 * @name doSomething
		 * @methodOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * Does something
		 * @returns {String} A self-assessment of this controller
		 */
		vm.doSomething = doSomething;

		// call the activate function to init the controller
		// after all variables have been introduced
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

		/**
		 * @ngdoc function
		 * @name doSomething
		 * @api private
		 * @see <%= moduleName %>.controller:<%= controllerName %>#doSomething
		 */
		function doSomething() {
			return [vm.title, 'has a sublime controller'].join(' - ');
		}
	}

})();
