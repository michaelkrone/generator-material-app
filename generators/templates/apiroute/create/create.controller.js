/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController
 * @description
 * Controller of the <%= name %> create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as <%= modelName %>CreateController
	 */

	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.create')
		.controller('<%= modelName %>CreateController', <%= modelName %>CreateController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.<%= _.slugify(name) %>.create.provider:<%= modelName %>CreateController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController <%= modelName %>CreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} <%= modelName %> The <%= modelName %> resource
	 * @param {Service} <%= modelName %>Service The <%= modelName %> service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController <%= modelName %>CreateController}
	 */

	<%= modelName %>CreateController.$inject = ['$mdDialog', '<%= modelName %>', '<%= modelName %>Service', 'Toast'];

	function <%= modelName %>CreateController($mdDialog, <%= modelName %>, <%= modelName %>Service, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name <%= name %>
		 * @propertyOf <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController
		 * @description
		 * The new <%= name %> data
		 *
		 * @returns {Object} The <%= name %> data
		 */
		vm.<%= name %> = new <%= modelName %>();

		// view model bindings (documented below)
		vm.create = create<%= modelName %>;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name create<%= modelName %>
		 * @methodOf <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController
		 * @description
		 * Create a new <%= name %> by using the <%= modelName %>Service create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function create<%= modelName %>(form) {
			// refuse to work with invalid data
			if (vm.<%= name %>._id || (form && !form.$valid)) {
				return;
			}

			<%= modelName %>Service.create(vm.<%= name %>)
				.then(create<%= modelName %>Success)
				.catch(create<%= modelName %>Catch);

			function create<%= modelName %>Success(new<%= modelName %>) {
				Toast.show({
					type: 'success',
					text: '<%= modelName %> ' + new<%= modelName %>.name + ' has been created',
					link: {state: '<%= name %>.list.detail', params: {id: new<%= modelName %>._id}}
				});
				vm.close();
			}

			function create<%= modelName %>Catch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new <%= modelName %>'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf <%= scriptAppName %>.<%= _.slugify(name) %>.create.controller:<%= modelName %>CreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
