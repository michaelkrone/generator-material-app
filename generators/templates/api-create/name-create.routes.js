/**
 * @ngdoc overview
 * @name <%= moduleName %>.routes
 * @description
 * Register module routes <% if (menuItem) { %>and the menu item '<%= menuItem %>'<% } %>.
 * Register the '<%= name %>' state on the router. The <%= htmlUrl %> template is used with the
 * {@link <%= moduleName %>.controller:<%= classedName %>Controller <%= classedName %>Controller} as '<%= lowerCameledName %>'.<% if (secure) {%>
 * Only the role '<%= role %>' or higher can access this route.<%}%>
 *
 * @exports <%= moduleName %>.controller:<%= classedName %>Controller
 *
 * @requires ui.router<% if (menuItem) { %>
 * @requires <%= componentModule %>.mainMenu<% } %>
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
	 * Configuring the passed $stateProvider.
	 *
	 * @param {Object} $stateProvider The ui router state provider to register the '<%= name %>' state on<% if (menuItem) { %>
	 * @param {Object} mainMenuProvider The main menu provider to register the '<%= menuItem %>' menu entry on<%}%>
	 */

	// inject config<%= classedName %>Route dependencies
	config<%= classedName %>Route.$inject = ['$stateProvider'<% if (menuItem) { %>, 'mainMenuProvider'<% } %>];

	function config<%= classedName %>Route($stateProvider<% if (menuItem) { %>, mainMenuProvider<% } %>) {
		const states = [{
			name: '<%= stateName() %>',
			url: '<%= route %>',
			templateUrl: '<%= htmlUrl %>',
			controller: '<%= controllerName %>',
			controllerAs: '<%= controllerAsName %>',
			resolve: {<%= lowerCameledName %>s: resolve<%= classedName %>s}
		}];<% if (menuItem) { %>

		const menuItems = [{
			name: '<%= menuItem %>',
			state: '<%= stateName() %>',
			icon: '<%= icon %>'<% if (secure) {%>,
			role: '<%= role %>'<% } %><% if (order) {%>,
			order: <%= order %><% } %>
		}];<% } %>

		states.forEach(function (state) { $stateProvider.state(state); });<% if (menuItem) { %>
		menuItems.forEach(function (item) { mainMenuProvider.addMenuItem(item); });<% } %>
	}

	/**
	 * @ngdoc function
	 * @api private
	 * @name config<%= classedName + _.capitalize(subPath) %>Route
	 * @methodOf <%= moduleName %>
	 * @description
	 * Resolve dependencies for the <%= name %> state, resolves the <%= lowerCameledName %>s dependency.
	 *
	 * @params {<%= classedName %>} <%= classedName %> The service to query <%= name %>s
	 * @returns {Promise} A promise that, when fullfilled, returns an array of <%= name %>s
	 */

	// inject resolve<%= classedName %>s dependencies
	resolve<%= classedName %>s.$inject = ['<%= classedName %>Resource'];

	function resolve<%= classedName %>s(<%= classedName %>Resource) {
		return <%= classedName %>Resource.query().$promise;
	}

})();
