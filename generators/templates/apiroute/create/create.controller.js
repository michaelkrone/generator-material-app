(function () {
	'use strict';

	/**
	 * Register the edit controller as <%= classedName %>CreateController
 	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.create')
		.controller('<%= classedName %>CreateController', <%= classedName %>CreateController);

	// add <%= classedName %>CreateController dependencies to inject
	<%= classedName %>CreateController.$inject = ['<%= classedName %>', '<%= classedName %>Service', '$state', '$mdToast', '$mdDialog'];

	/**
	 * <%= classedName %>CreateController constructor
	 */
	function <%= classedName %>CreateController(<%= classedName %>, <%= classedName %>Service, $state, $mdToast, $mdDialog) {
		var vm = this;

		// defaults
		vm.message = {};
		vm.errors = {};
		vm.<%= name %> = new <%= classedName %>();

		// view model bindings
		vm.create = create;
		vm.showToast = showToast;
		vm.openEdit = openEdit;
		vm.hideDialog = hideDialog;
		vm.cancelDialog = cancelDialog;

		/**
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}

		/**
		 * Open the detail state with the current <%= name %>
		 */
		function openEdit() {
			$state.go('^.edit', {'id': vm.<%= name %>._id});
		}

		// view model implementations

		/**
		 * Create a new <%= name %> by using the <%= classedName %>Service create method
		 */
		function create(form) {
			// refuse to work with invalid data
			if (vm.<%= name %>._id || (form && !form.$valid)) {
				return;
			}

			<%= classedName %>Service.create(vm.<%= name %>)
				.then(create<%= classedName %>)
				.catch(catch<%= classedName %>CreateErrors);

			function create<%= classedName %>(new<%= classedName %>) {
				vm.<%= name %> = new<%= classedName %>;
				vm.message = {type: 'success', message: '<%= name %> created'};
				(form && form.$setPristine());
				vm.showToast();
			}

			function catch<%= classedName %>CreateErrors(err) {
				err = err.data || err;
				vm.message = {type: 'danger', message: 'Error while saving <%= name %>: ' + err.toString() };
				resetErrors(err, form);
				vm.showToast();
			}
		}

		/**
		 * Update validity of form fields that match the mongoose errors
		 */
		function resetErrors(err, form) {
			angular.forEach(err.errors, function (error, field) {
				(form && form[field]).$setValidity('mongoose', false);
				vm.errors[field] = error.type;
			});
		}

		/**
		 * Display a toast with the given content. If the content is falsy
		 * use vm.message.message instead.
		 *
		 * @param {String} [content] - The toasts content
		 * @param {$event} [$event] - unused, may be passed to the service
		 */
		function showToast(content, $event) {
			content = content || vm.message.message;
			$mdToast.show($mdToast.simple().content(content));
		}
	}
})();
