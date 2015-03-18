(function () {
	'use strict';

	/**
	 * Register the list controller as <%= classedName %>ListController
	 */
	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list')
		.controller('<%= classedName %>ListController', <%= classedName %>ListController);

	// add <%= classedName %>ListController dependencies to inject
	<%= classedName %>ListController.$inject = [<% if(features.socketio) { %>'$scope', 'socket', <% } %>'$state', '<%= name %>s', 'ToggleComponent'];

	/**
	 * <%= classedName %>ListController constructor
	 *<% if(features.socketio) { %>
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to<% }%>
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} <%= name %>s - The list of <%= name %>s resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function <%= classedName %>ListController(<% if(features.socketio) { %>$scope, socket, <% }%>$state, <%= name %>s, ToggleComponent) {
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
