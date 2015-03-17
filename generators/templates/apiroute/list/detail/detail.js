(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configure<%= classedName %>ListDetail);

	// inject config<%= classedName %>Routes dependencies
	configure<%= classedName %>ListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the '<%= name %>.detail' state with the detail template
	 * paired with the <%= classedName %>DetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * '<%= name %>' is resolved as the <%= name %> with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configure<%= classedName %>ListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: '<%= name %>.list.detail',
			parent: '<%= name %>.list',<% if (secure) {%>
			url: '/:id',
			authenticate: true,
			role: '<%= role %>',<%}%>
			onEnter: onEnter<%= classedName %>ListDetail,
			views: {
				'detail@<%= name %>.list': {
					templateUrl: '<%= listDetailHtmlUrl %>',
					controller: '<%= classedName %>DetailController',
					controllerAs: 'detail',
					resolve: {<%= name %>: resolve<%= classedName %>FromArray}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject on<%= classedName %>ListDetailEnter dependencies
	onEnter<%= classedName %>ListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the <%= name %>.list.detail state. Open the component
	 * registered with the component id '<%= name %>.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnter<%= classedName %>ListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('<%= name %>.detailView').open();
		}
	}

	// inject resolve<%= classedName %>FromArray dependencies
	resolve<%= classedName %>FromArray.$inject = ['<%= name %>s', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the <%= name %>.detail state
	 *
	 * @params {Array} <%= name %>s - The array of <%= name %>s
	 * @params {Object} $stateParams - The $stateParams to read the <%= name %> id from
	 * @returns {Object|null} The <%= name %> whose value of the _id property equals $stateParams._id
	 */
	function resolve<%= classedName %>FromArray(<%= name %>s, $stateParams, _) {
		return _.find(<%= name %>s, {'_id': $stateParams.id});
	}

})();
