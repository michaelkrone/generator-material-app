(function () {
	'use strict';

	/**
	 * Register the edit controller as <%= classedName %>EditController
 	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list.edit')
		.controller('<%= classedName %>EditController', <%= classedName %>EditController);

	// add <%= classedName %>EditController dependencies to inject
	<%= classedName %>EditController.$inject = ['<%= classedName %>Service', '$state', '$mdToast', '<%= name %>'];

	/**
	 * <%= classedName %>EditController constructor
	 */
	function <%= classedName %>EditController(<%= classedName %>Service, $state, $mdToast, <%= name %>) {
		var vm = this;

		// defaults
		vm.message = {};
		vm.errors = {};
		vm.<%= name %> = {};
		angular.copy(<%= name %>, vm.<%= name %>);

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.showToast = showToast;
		vm.goBack = goBack ;

		/**
		 * Open the detail state with the current <%= name %>
		 *
		 */
		function goBack () {
			$state.go('^.detail', {id: vm.<%= name %>._id});
		}

		// view model implementations

		/**
		 * Updates a <%= name %> by using the <%= classedName %>Service save method
		 * @param {AngularHTMLForm} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (form && !form.$valid) {
				return;
			}

			<%= classedName %>Service.update(vm.<%= name %>)
				.then(update<%= classedName %>)
				.catch(catch<%= classedName %>UpdateErrors);

			function update<%= classedName %>() {
				vm.message = {type: 'success', message: vm.<%= name %>.name + ' updated'};
				(form && form.$setPristine());
				vm.showToast();
			}

			function catch<%= classedName %>UpdateErrors(err) {
				err = err.data;
				vm.message = {type: 'danger', message: 'Error while updating <%= name %>: ' + err };
				resetErrors(err, form);
				vm.showToast();
			}
		}

		/**
		 * Removes a <%= name %> by using the <%= classedName %>Service remove method
		 * @param {AngularHTMLForm} [form]
		 */
		function remove(form) {
			<%= classedName %>Service.remove(vm.<%= name %>)
				.then(delete<%= classedName %>)
				.catch(catch<%= classedName %>RemoveErrors);

			function delete<%= classedName %>() {
				vm.message = {type: 'success', message: '<%= name %> removed'};
				vm.showToast();
			}

			function catch<%= classedName %>RemoveErrors(err) {
				err = err.data;
				vm.errors = {};
				resetErrors(err, form);
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
