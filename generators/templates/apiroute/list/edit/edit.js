(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires <%= scriptAppName %>.mongooseError
	 * @requires <%= scriptAppName %>.<%= _.slugify(name) %>.service
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list.edit', [
			'ui.router',
			'ngMaterial',
			'<%= scriptAppName %>.mongooseError',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.service'
		])
		.config(configure<%= classedName %>ListEdit);

	// inject config<%= classedName %>ListEdit dependencies
	configure<%= classedName %>ListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the <%= name %>.list.edit state with the edit template
	 * paired with the <%= classedName %>EditController as 'edit' for the
	 * 'detail@<%= name %>.list' view.
	 * '<%= name %>' is resolved as the <%= name %> with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configure<%= classedName %>ListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: '<%= name %>.list.edit',
			parent: '<%= name %>.list',
			url: '/edit/:id',<% if (secure) {%>
			authenticate: true,
			role: '<%= role %>',<%}%>
			onEnter: onEnter<%= classedName %>ListEdit,
			views: {
				'detail@<%= name %>.list': {
					templateUrl: '<%= listEditHtmlUrl %>',
					controller: '<%= classedName %>EditController',
					controllerAs: 'edit',
					resolve: {<%= name %>: resolve<%= classedName %>FromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject on<%= classedName %>ListEditEnter dependencies
	onEnter<%= classedName %>ListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the <%= name %>.list.detail state. Open the component
	 * registered with the component id '<%= name %>.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnter<%= classedName %>ListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('<%= name %>.detailView').open();
		}
	}

	// inject resolve<%= classedName %>DetailRoute dependencies
	resolve<%= classedName %>FromArray.$inject = ['<%= name %>s', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the <%= name %>.list.edit state. Get the <%= name %>
	 * from the injected Array of <%= name %>s by using the '_id' property.
	 *
	 * @params {Array} <%= name %>s - The array of <%= name %>s
	 * @params {Object} $stateParams - The $stateParams to read the <%= name %> id from
	 * @params {Object} _ - The lodash service to find the requested <%= name %>
	 * @returns {Object|null} The <%= name %> whose value of the _id property equals $stateParams._id
	 */
	function resolve<%= classedName %>FromArray(<%= name %>s, $stateParams, _) {
		//	return <%= classedName%>.get({id: $stateParams.id}).$promise;
		return _.find(<%= name %>s, {'_id': $stateParams.id});
	}

})();
