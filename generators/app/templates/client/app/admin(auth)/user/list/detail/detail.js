(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.admin.user.list.detail submodule
	 * and configure it.
	 *
	 * @requires {<%= scriptAppName %>.auth.user}
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.detail', [
			'<%= scriptAppName %>.auth.user'
		])
		.config(configureUserListDetail);

	// inject configUserRoutes dependencies
	configureUserListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'user.detail' state with the detail template
	 * paired with the UserDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'user' is resolved as the user with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureUserListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'admin.user.list.detail',
			parent: 'admin.user.list',
			url: 'detail/:id',
			onEnter: onEnterUserListDetail,
			views: {
				'detail@admin.user.list': {
					templateUrl: 'app/admin/user/list/detail/detail.html',
					controller: 'UserDetailController',
					controllerAs: 'detail',
					resolve: {
						user: resolveUserFromArray
					}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onUserListDetailEnter dependencies
	onEnterUserListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the admin.user.list.detail state. Open the component
	 * registered with the component id 'user.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterUserListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('user.detailView').open();
		}
	}

	// inject resolveUserFromArray dependencies
	resolveUserFromArray.$inject = ['users', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the user.detail state
	 *
	 * @params {Array} users - The array of users
	 * @params {$stateParams} $stateParams - The $stateParams to read the user id from
	 * @returns {Object|null} The user whose value of the _id property equals $stateParams._id
	 */
	function resolveUserFromArray(users, $stateParams, _) {
		return _.find(users, {'_id': $stateParams.id});
	}

	// inject resolveUser dependencies
	resolveUser.$inject = ['User', '$stateParams'];

	/**
	 * Resolve dependencies for the user.edit state
	 *
	 * @params {User} User - The service to query the user with
	 * @params {$stateParams} $stateParams - The $stateParams to read the user id from
	 * @returns {Object|null} The user whose value of the _id property equals $stateParams._id
	 */
	function resolveUser(User, $stateParams) {
		return User.get({id: $stateParams.id}).$promise;
	}

})();
