/**
 * @ngdoc controller
 * @name <%= scriptAppName %><%= _.slugify(name) %>.list.edit.controller:<%= modelName %>EditController
 * @description
 * Controller of the <%= name %> edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as <%= modelName %>EditController
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.list.edit')
		.controller('<%= modelName %>EditController', <%= modelName %>EditController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %><%= _.slugify(name) %>.list.edit.provider:<%= modelName %>EditController
	 * @description
	 * Provider of the {@link <%= scriptAppName %><%= _.slugify(name) %>.list.edit.controller:<%= modelName %>EditController <%= modelName %>EditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} <%= modelName %>Service The <%= modelName %>Service to use
	 * @param {Resource} <%= name %> The <%= name %> data to use
	 */

	<%= modelName %>EditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', '<%= modelName %>Service', '<%= name %>'];

	function <%= modelName %>EditController($state, $stateParams, $mdDialog, Toast, <%= modelName %>Service, <%= name %>) {
		var vm = this;

		// defaults
		vm.<%= name %> = angular.copy(<%= name %>, vm.<%= name %>);
		vm.displayName = <%= name %>.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current <%= name %>
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.<%= name %>._id});
		}

		/**
		 * Open the <%= name %> list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a <%= name %> by using the <%= modelName %>Service save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.<%= name %>._id || form && !form.$valid) {
				return;
			}

			<%= modelName %>Service.update(vm.<%= name %>)
				.then(update<%= modelName %>Success)
				.catch(update<%= modelName %>Catch);

			function update<%= modelName %>Success(updated<%= modelName %>) {
				// update the display name after successful save
				vm.displayName = updated<%= modelName %>.name;
				Toast.show({text: '<%= modelName %> ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function update<%= modelName %>Catch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating <%= modelName %> ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the <%= name %> if she wants to delete the current selected <%= name %>.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete <%= name %> ' + vm.displayName + '?')
				.content('Do you really want to delete <%= name %> ' + vm.displayName + '?')
				.ariaLabel('Delete <%= name %>')
				.ok('Delete <%= name %>')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a <%= name %> by using the <%= modelName %>Service remove method
			 * @api private
			 */
			function performRemove() {
				<%= modelName %>Service.remove(vm.<%= name %>)
					.then(delete<%= modelName %>Success)
					.catch(delete<%= modelName %>Catch);

				function delete<%= modelName %>Success() {
					Toast.show({type: 'success', text: '<%= modelName %> ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function delete<%= modelName %>Catch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting <%= name %> ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}
	}
})();
