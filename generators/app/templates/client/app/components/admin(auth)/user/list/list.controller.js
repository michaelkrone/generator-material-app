(function () {
	'use strict';

	/**
	 * Register the list controller as UserListController
	 */
	angular
		.module('<%= scriptAppName %>.admin.user.list')
		.controller('UserListController', UserListController);

	// add UserListController dependencies to inject
	UserListController.$inject = ['users', '$state', 'ToggleComponent'<% if(features.socketio) { %>, '$scope', 'socket'<% } %>];

	/**
	 * UserListController constructor
	 *
	 * @param {Array} users - The list of users resolved for this route
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {ToggleComponent} ToggleComponent - The toggle component service for switching the detail view
	 */
	function UserListController(users, $state, ToggleComponent <% if(features.socketio) { %>, $scope, socket<% }%>) {
		var vm = this;

		// the array of users
		vm.users = users;
		// toggle detail view
		vm.toggleDetails = toggleDetails;<% if(features.socketio) { %>

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('user', vm.users);
			$scope.$on('$destroy', unsyncUserUpdates);

			function unsyncUserUpdates() {
				socket.unsyncUpdates('user');
			}
		}<% } %>

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('user.detailView').toggle();
		}
	}

})();
