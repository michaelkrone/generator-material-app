(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.admin.user.create module
	 * and configure it.
	 *
	 * @requires {ui.router}
	 * @requires {ngMaterial}
	 * @requires {<%= scriptAppName %>.auth}
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.create', [
			'ui.router',
			'ngMaterial',
			'<%= scriptAppName %>.auth'
		])
		.config(configureUserCreateRoutes);

	// inject configUser.CreateRoutes dependencies
	configureUserCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the global create-user state with the edit template
	 * paired with the UserCreateController as 'create'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureUserCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'admin.user.list.create',
			parent: 'admin.user.list',
			url: 'create',
			onEnter: onEnterUserListCreateView
		};

		$stateProvider.state(createListState);
	}

	// inject onEnterUserCreateView dependencies
	onEnterUserListCreateView.$inject = ['$state', '$mdDialog'];

	/**
	 * Function executed when entering the admin.user.create state.
	 * Open the admin.user.create sidenav
	 */
	function onEnterUserListCreateView($state, $mdDialog) {
		$mdDialog.show({
			controller: 'UserCreateController',
			controllerAs: 'create',
			templateUrl: 'app/admin/user/create/create.html'
		}).then(function resolveDialog(answer) {
			return $state.transitionTo('admin.user.list');
		}, function rejectDialog() {
			console.log('cancel');
			return $state.transitionTo('admin.user.list');
		});
	}

})();
