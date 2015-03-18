(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {<%= scriptAppName %>.mongooseError}
	 * @requires {<%= scriptAppName %>.remoteUnique}
	 * @requires {<%= scriptAppName %>.<%= _.slugify(name) %>.service}
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'<%= scriptAppName %>.mongooseError',
			'<%= scriptAppName %>.remoteUnique',
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
			url: '/create',<% if (secure) {%>
			authenticate: true,
			role: '<%= role %>',<%}%>
			onEnter: onEnter<%= classedName %>ListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the <%= name %>.list.create state.
	 * Open the create dialog
	 */

	onEnter<%= classedName %>ListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnter<%= classedName %>ListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: '<%= classedName %>CreateController',
			controllerAs: 'create',
			templateUrl: '<%= createHtmlUrl %>',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('<%= name %>.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
