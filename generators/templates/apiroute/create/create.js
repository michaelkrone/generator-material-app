(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.create module
	 * and configure it.
	 *
	 * @requires {ui.router}
	 * @requires {ngMaterial}
	 * @requires {<%= scriptAppName %>.<%= _.slugify(name) %>.service}
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.create', [
			'ui.router',
			'ngMaterial',
			'<%= scriptAppName %>.<%= _.slugify(name) %>.service'
		])
		.config(configure<%= classedName %>CreateRoutes);

	// inject config<%= classedName %>.CreateRoutes dependencies
	configure<%= classedName %>CreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the '<%= name %>.list.create' state. The onEnter<%= classedName %>ListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the <%= createHtmlUrl %> template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configure<%= classedName %>CreateRoutes($stateProvider) {
		var  createListState = {
			name: '<%= name %>.list.create',
			parent: '<%= name %>.list',
			url: '/create',
			onEnter: onEnter<%= classedName %>ListCreateView
		};

		$stateProvider.state(createListState);
	}

	// inject onEnter<%= classedName %>CreateView dependencies
	onEnter<%= classedName %>ListCreateView.$inject = ['$rootScope', '$stateParams', '$state', '$mdDialog'];

	/**
	 * Function executed when entering the <%= name %>.create state.
	 * Open the <%= name %>.create sidenav
	 */
	function onEnter<%= classedName %>ListCreateView($rootScope, $stateParams, $state, $mdDialog) {
		$mdDialog.show({
			controller: '<%= classedName %>CreateController',
			controllerAs: 'create',
			templateUrl: '<%= createHtmlUrl %>'
		}).then(function resolveDialog(answer) {
			return $state.transitionTo('<%= name %>.list');
		}, function rejectDialog() {
			console.log('cancel');
			return $state.transitionTo('<%= name %>.list');
		});
	}

})();
