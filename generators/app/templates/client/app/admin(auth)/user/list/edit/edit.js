/**
 * @ngdoc overview
 * @name <%= scriptAppName %>.admin.user.list.edit
 * @description
 * The `<%= scriptAppName %>.admin.user.list.edit` module which provides:
 *
 * - {@link <%= scriptAppName %>.admin.user.list.items.controller:UserItemsController UserItemsController}
 *
 * @requires ui.router
 * @requires ngMaterial
 * @requires ngMessages
 * @requires components/auth
 * @requires components/repeatInput
 * @requires components/toast
 * @requires components/mongooseError
 * @requires components/remoteUnique
 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.admin.user.list.edit', [
			'ui.router',
			'ngMaterial',
			'ngMessages',
			'<%= scriptAppName %>.auth',
			'<%= scriptAppName %>.repeatInput',
			'<%= scriptAppName %>.toast',
			'<%= scriptAppName %>.mongooseError',
			'<%= scriptAppName %>.remoteUnique'
		])
		.config(configureUserListEdit);


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

	configureUserListEdit.$inject = ['$stateProvider'];

	function configureUserListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'admin.user.list.edit',
			parent: 'admin.user.list',
			url: 'edit/:id',
			authenticate: true,
			role: 'admin',
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


	/**
	 * Executed when entering the admin.user.list.detail state. Open the component
	 * registered with the component id 'user.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 * @params {Auth} Auth - The auth service to check user rights with
	 */

	onEnterUserListEdit.$inject = ['$timeout', 'ToggleComponent', 'Auth'];

	function onEnterUserListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('user.detailView').open();
		}
	}

	/**
	 * Resolve dependencies for the admin.user.list.edit state
	 *
	 * @params {Array} users - The array of users
	 * @params {$stateParams} $stateParams - The $stateParams to read the user id from
	 * @returns {Object|null} The user whose value of the _id property equals $stateParams._id
	 */

	resolveUserFromArray.$inject = ['users', '$stateParams', '_'];

	function resolveUserFromArray(users, $stateParams, _) {
		return _.find(users, {'_id': $stateParams.id});
	}

})();
