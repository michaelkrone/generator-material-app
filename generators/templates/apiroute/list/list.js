(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.list module
	 * and configure it.
	 *<% if(features.socketio) { %>
	 * @requires {<%= scriptAppName %>.socket}<% }%>
	 * @requires {ui.router}
	 * @requires {ngMaterial}
	 * @requires {<%= scriptAppName %>.<%= _.slugify(name) %>.list.detail}
	 * @requires {<%= scriptAppName %>.<%= _.slugify(name) %>.list.edit}
	 * @requires {<%= scriptAppName %>.<%= _.slugify(name) %>.list.items}
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list', [
			'<%= scriptAppName %>.<%= _.slugify(name) %>.list.detail',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.list.edit',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.list.items'
		])
		.config(config<%= classedName %>ListRoutes);

	// inject config<%= classedName %>ListRoutes dependencies
	config<%= classedName %>ListRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the <%= name %>.list state with the list template fpr the
	 * 'main' view paired with the <%= classedName %>ListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function config<%= classedName %>ListRoutes($urlRouterProvider, $stateProvider) {
		// The list state configuration
		var listState = {
			name: '<%= name %>.list',
			parent: '<%= name %>',
			url: '/list',
			resolve: {
				<%= name %>s:  resolve<%= classedName %>s
			},
			views: {

				// target the unnamed view in the <%= name %> state
				'@<%= name %>': {
					templateUrl: '<%= listHtmlUrl %>',
					controller: '<%= classedName %>ListController',
					controllerAs: 'list'
				},

				// target the content view in the <%= name %>.list state
				'content@<%= name %>.list': {
					templateUrl: '<%= listItemsHtmlUrl %>',
					controller: '<%= classedName %>ItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);
	}

	// inject resolve<%= classedName %>s dependencies
	resolve<%= classedName %>s.$inject = ['<%= classedName %>'];

	/**
	 * Resolve dependencies for the <%= name %>.list state
	 *
	 * @params {<%= classedName %>} <%= classedName %> - The service to query <%= name %>s
	 * @returns {Promise} A promise that, when fullfilled, returns an array of <%= name %>s
	 */
	function resolve<%= classedName %>s(<%= classedName %>) {
		return <%= classedName %>.query().$promise;
	}

})();
