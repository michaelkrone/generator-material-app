(function () {
	'use strict';

	/**
	 * Register the edit controller as <%= classedName %>DetailController
 	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list.detail')
		.controller('<%= classedName %>DetailController', <%= classedName %>DetailController);

	// add <%= classedName %>DetailController dependencies to inject
	<%= classedName %>DetailController.$inject = ['<%= classedName %>Service', '$state', '<%= name %>'];

	/**
	 * <%= classedName %>DetailController constructor
	 */
	function <%= classedName %>DetailController(<%= classedName %>Service, $state, <%= name %>) {
		var vm = this;
		vm.<%= name %> = <%= name %>;

		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current <%= name %>
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.<%= name %>._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
