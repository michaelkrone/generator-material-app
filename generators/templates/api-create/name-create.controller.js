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
	 * @params {Object} <%= lowerCameledName %>s The array of <%= name %>s injected by the route
	 */

	// add <%= controllerName %> dependencies to inject
	<%= controllerName %>.$inject = ['<%= serviceName %>'];

	function <%= controllerName %>(<%= serviceName %>) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name title
		 * @propertyOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * The title of this component
		 * @returns {String}
		 */
		vm.title = '<%= menuItem %> Create';

		/**
		 * @ngdoc property
		 * @name title
		 * @propertyOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * The title of this component
		 * @returns {String}
		 */
		vm.item = {};

		/**
		 * @ngdoc property
		 * @name <%= lowerCameledName %>s
		 * @propertyOf <%= moduleName %>.controller:<%= controllerName %>
		 * @description
		 * The array of <%= name %>s
		 */
		vm.create = create;

		function create() {
			<%= serviceName %>
				.create(vm.item)
				.then(success)
				.catch(error);
		}
	}

})();
