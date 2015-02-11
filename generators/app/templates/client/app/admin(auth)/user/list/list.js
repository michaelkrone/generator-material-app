(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.admin.user.list module
	 * and configure it.
	 *
	 * @requires {<%= scriptAppName %>.socket}
	 * @requires {ui.router}
	 * @requires {ngMaterial}
	 * @requires {<%= scriptAppName %>.admin.user.list.detail}
	 * @requires {<%= scriptAppName %>.admin.user.list.edit}
	 * @requires {<%= scriptAppName %>.admin.user.list.items}
	 * @requires {<%= scriptAppName %>.admin.user.list.create}
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list', [
			'<%= scriptAppName %>.admin.user.list.detail',
			'<%= scriptAppName %>.admin.user.list.edit',
			'<%= scriptAppName %>.admin.user.list.items'
		])
		.config(configUserListRoutes);

	// inject configUserListRoutes dependencies
	configUserListRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the user.list state with the list template fpr the
	 * 'main' view paired with the UserListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configUserListRoutes($stateProvider) {
		// The list state configuration
		var listState = {
			name: 'admin.user.list',
			parent: 'admin.user',
			url: '/',
			authenticate: true,
			resolve: {users:  resolveUsers},
			views: {

				// target the unnamed view in the user state
				'@admin.user': {
					templateUrl: 'app/admin/user/list/list.html',
					controller: 'UserListController',
					controllerAs: 'list'
				},

				// target the content view in the admin.user.list state
				'content@admin.user.list': {
					templateUrl: 'app/admin/user/list/items/items.html',
					controller: 'UserItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);
	}

	// inject resolveUsers dependencies
	resolveUsers.$inject = ['User'];

	/**
	 * Resolve dependencies for the admin.user.list state
	 *
	 * @params {User} User - The service to query users
	 * @returns {Promise} A promise that, when fullfilled, returns an array of users
	 */
	function resolveUsers(User) {
		return User.query().$promise;
	}

})();
