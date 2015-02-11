(function () {
	'use strict';

	/**
	 * Register the list controller as <%= classedName %>ListController
	 */
	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list')
		.controller('<%= classedName %>ListController', <%= classedName %>ListController);

	// add <%= classedName %>ListController dependencies to inject
	<%= classedName %>ListController.$inject = ['<%= name %>s', '$state', 'ToggleComponent'<% if(features.socketio) { %>, '$scope', 'socket'<% } %>];

	/**
	 * <%= classedName %>ListController constructor
	 *
	 * @param {Array} <%= name %>s - The list of <%= name %>s resolved for this route
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {$mdSidenav} $mdSidenav - The sidenav controller for switching the detail view
	 */
	function <%= classedName %>ListController(<%= name %>s, $state, ToggleComponent<% if(features.socketio) { %>, $scope, socket<% }%>) {
		var vm = this;

		// the array of <%= name %>s
		vm.<%= name %>s = <%= name %>s;
		// toggle detail view
		vm.toggleDetails = toggleDetails;<% if(features.socketio) { %>

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('<%= name %>', vm.<%= name %>s);
			$scope.$on('$destroy', unsync<%= classedName %>Updates);

			function unsync<%= classedName %>Updates() {
				socket.unsyncUpdates('<%= name %>');
			}
		}<% } %>


		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('<%= name %>.detailView').toggle();
		}
	}

})();
