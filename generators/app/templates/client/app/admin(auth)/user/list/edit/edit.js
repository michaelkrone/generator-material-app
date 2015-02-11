(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.admin.user.list.edit module
	 * and configure it.
	 *
	 * @requires {<%= scriptAppName %>.auth.user}
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.edit', [
			'<%= scriptAppName %>.auth.user'
		])
		.config(configureUserListEdit);

	// inject configUserListEdit dependencies
	configureUserListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the admin.user.list.edit state with the edit template
	 * paired with the UserEditController as 'edit' for the
	 * 'detail@admin.user.list' view.
	 * 'user' is resolved as the user with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureUserListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'admin.user.list.edit',
			parent: 'admin.user.list',
			url: 'edit/:id',
			onEnter: onEnterUserListEdit,
			views: {

				'detail@admin.user.list': {
					templateUrl: 'app/admin/user/list/edit/edit.html',
					controller: 'UserEditController',
					controllerAs: 'edit',
					resolve: {user: resolveUserFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onUserListEditEnter dependencies
	onEnterUserListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the admin.user.list.detail state. Open the component
	 * registered with the component id 'user.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterUserListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('user.detailView').open();
		}
	}

	// inject resolveUserDetailRoute dependencies
	resolveUserFromArray.$inject = ['users', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the admin.user.list.edit state
	 *
	 * @params {Array} users - The array of users
	 * @params {$stateParams} $stateParams - The $stateParams to read the user id from
	 * @returns {Object|null} The user whose value of the _id property equals $stateParams._id
	 */
	function resolveUserFromArray(users, $stateParams, _) {
		return _.find(users, {'_id': $stateParams.id});
	}

	// inject resolveUser dependencies
	// resolveUser.$inject = ['User', '$stateParams'];

	/*
	 * Resolve dependencies for the user.edit state
	 *
	 * @params {User} User - The service to query the user with
	 * @params {$stateParams} $stateParams - The $stateParams to read the user id from
	 * @returns {Object|null} The user whose value of the _id property equals $stateParams._id
	 */
	// function resolveUser(User, $stateParams) {
	//	return User.get({id: $stateParams.id}).$promise;
	// }

})();
