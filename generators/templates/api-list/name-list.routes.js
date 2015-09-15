/**
 * @ngdoc overview
 * @name <%= moduleName %>.routes
 * @description
 * Register module routes <% if (menuItem) { %>and the menu item '<%= menuItem %>'<% } %>.
 * Register the '<%= name %>' state on the router. The <%= htmlUrl %> template is used with the
 * {@link <%= moduleName %>.controller:<%= classedName %>Controller <%= classedName %>Controller} as '<%= lowerCameledName %>'.<% if (secure) {%>
 * Only the role '<%= role %>' or higher can access this route.<%}%>
 */

(function () {
	'use strict';

	// register the <%= moduleName %> config function
	angular
		.module('<%= moduleName %>')
		.config(config<%= classedName %>Route);

	/**
	 * @ngdoc function
	 * @api private
	 * @name config<%= classedName %>Route
	 * @methodOf <%= moduleName %>.routes
	 * @description
	 * <%= moduleName %> config function. Register module routes <% if (menuItem) { %>and the menu item '<%= menuItem %>'<%}%>.
	 * Configuring the passed $stateProvider and mainMenuProvider.
	 *
	 * @param {Object} $stateProvider The ui router state provider to register the '<%= name %>' state on<% if (menuItem) { %>
	 * @param {Object} mainMenuProvider The main menu provider to register the '<%= menuItem %>' menu entry on<%}%>
	 */

	config<%= classedName %>Route.$inject = ['$stateProvider'<% if (menuItem) { %>, 'mainMenuProvider'<% } %>];

	function config<%= classedName %>Route($stateProvider<% if (menuItem) { %>, mainMenuProvider<% } %>) {
		// register the states at the providers
		getStates().forEach(registerState);

		/**
		 * Register the given state at the injected state and main menu provider
		 * @param {Object} state The route state definition
		 */
		function registerState(state) {
			$stateProvider.state(state);<% if (menuItem) { %>
			mainMenuProvider.addState(state);<% } %>
		}
	}

	/**
	 * @ngdoc function
	 * @api private
	 * @name getStates
	 * @methodOf <%= moduleName %>.routes
	 * @description
	 * Get the states to register for this module, contains the menu item definitions
	 *
	 * @returns {Array} An array of state definitions for the <%= moduleName %> module.
	 */
	function getStates() {
		return [
			{
				name: '<%= stateName() %>',
				url: '<%= route %>',
				templateUrl: '<%= htmlUrl %>',
				controller: '<%= controllerName %>',
				controllerAs: '<%= controllerAsName %>',
				resolve: { <%= arrayName %>: <%= resolveName %> }<% if (secure) {%>,
				role: '<%= role %>'<% } %><% if (menuItem) { %>,
				menu: {
					name: '<%= menuItem %>',
					icon: '<%= icon %>'<% if (order) {%>,
					order: <%= order %><% } %>
				}<% } %>
			} // generator: add states below
		];
	}
		
	/**
	 * @ngdoc function
	 * @api private
	 * @name <%= resolveName %>
	 * @methodOf <%= moduleName %>.routes
	 * @description
	 * Get an array of <%= name %> from the <%= lowerCameledName %>s dependency. A simple
	 * error handler is attached to the returned Promise which simply displays the http
	 * status error information.
	 * @params {Object} Toast The toast service to display a message in case of error
	 * @params {Object} <%= classedName %>Service The  service to query <%= name %> resources
	 * @returns {Promise} A promise that, when fullfilled, returns an array of <%= name %>.
	 */
	<%= resolveName %>.$inject = ['Toast', '<%= classedName %>Service']

	function <%= resolveName %>(Toast, <%= classedName %>Service) {
		return <%= classedName %>Service
			.query()
			.then(null, reject);

		/**
		 * Promise reject function, simply shows a toast with the http status description.
		 * @param {Object} err The http error object
		 */
		function reject(err) {
			var msg = ['Error loading <%= menuItem %>:', err.status, err.statusText].join(' ');
			Toast.warn(msg);
		}
	}

})();
