(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %> module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires <%= scriptAppName %>.<%= _.slugify(name) %>.main
	 * @requires <%= scriptAppName %>.<%= _.slugify(name) %>.list
	 * @requires <%= scriptAppName %>.<%= _.slugify(name) %>.create
	 */
	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>', [
			'ngResource',
			'ui.router',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.main',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.list',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.create'
		])
		.config(config<%= classedName %>Routes);

	// inject config<%= classedName %>Routes dependencies
	config<%= classedName %>Routes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract <%= name %> state with the <%= name %> template
	 * paired with the <%= classedName %>Controller as 'index'.
	 * The injectable '<%= name %>s' is resolved as a list of all <%= name %>s
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function config<%= classedName %>Routes($urlRouterProvider, $stateProvider) {
		// The <%= name %> state configuration
		var <%= name %>State = {
			name: '<%= name %>',
			url: '<%= route %>',
			abstract: true,
			templateUrl: '<%= htmlUrl %>',
			controller: '<%= classedName %>Controller',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/<%= name %>', '/<%= name %>/');
		$stateProvider.state(<%= name %>State);
	}

})();
