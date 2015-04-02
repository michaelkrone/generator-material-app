/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.admin.user.create.controller:UserCreateController
 * @description
 * Controller of the user create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as UserCreateController
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.create')
		.controller('UserCreateController', UserCreateController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.admin.user.create.provider:UserCreateController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.admin.user.create.controller:UserCreateController UserCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} User The User service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @returns {Service} {@link <%= scriptAppName %>.admin.user.create.controller:UserCreateController UserCreateController}
	 */

	UserCreateController.$inject = ['$mdDialog', 'Auth', 'User', 'Toast'];

	function UserCreateController($mdDialog, Auth, User, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name userRoles
		 * @propertyOf <%= scriptAppName %>.admin.user.create.controller:UserCreateController
		 * @description
		 * The settable user roles
		 *
		 * Default retrieved from {@link auth.service:Auth#getSettableRoles Auth.getSettableRoles()}
		 * @returns {Array} settable user roles
		 */
		vm.userRoles = Auth.getSettableRoles();


		/**
		 * @ngdoc function
		 * @name getNameForRole
		 * @propertyOf <%= scriptAppName %>.admin.user.create.controller:UserCreateController
		 * @description
		 * Function for returning the human readable name of the passed user role
		 *
		 * Default retrieved from {@link auth.service:Auth#getNameForRole Auth.getNameForRole()}
		 * @param {String} rolename The name of the user role
		 * @returns {String} Name of the user role
		 */
		vm.getNameForRole = Auth.getNameForRole;

		/**
		 * @ngdoc property
		 * @name user
		 * @propertyOf <%= scriptAppName %>.admin.user.create.controller:UserCreateController
		 * @description
		 * The new user data
		 *
		 * Defaults:
		 * - active	=	true
		 * - role	=	user
		 * @returns {User} User data
		 */
		vm.user = new User({active: true, role: 'user'});

		// view model bindings (documented below)
		vm.create = createUser;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name create
		 * @methodOf <%= scriptAppName %>.admin.user.create.controller:UserCreateController
		 * @description
		 * Create a new user by using the UserService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createUser(form) {
			// refuse to work with invalid data
			if (vm.user._id || (form && !form.$valid)) {
				return;
			}

			Auth.createUser(vm.user)
				.then(createUserSuccess)
				.catch(createUserCatch);

			function createUserSuccess(newUser) {
				Toast.show({
					type: 'success',
					text: 'User ' + newUser.name + ' has been created',
					link: {state: 'admin.user.list.detail', params: {id: newUser._id}}
				});
				vm.close();
			}

			function createUserCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new user'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf <%= scriptAppName %>.admin.user.create.controller:UserCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf <%= scriptAppName %>.admin.user.create.controller:UserCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
