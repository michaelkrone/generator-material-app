/**
 * @ngdoc overview
 * @name toast
 * @requires ui.router
 * @requires ngMaterial
 * @description
 * The <%= scriptAppName %>.toast module
 */

/**
 * @ngdoc service
 * @name toast.service:Toast
 * @description
 * Service which wraps $mdToast to simplify usage thereof
 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.toast', [
			'ui.router',
			'ngMaterial'
		])
		.service('Toast', ToastService)
		.controller('ToastController', ToastController);


	/**
	 * @ngdoc function
	 * @name toast.service:ToastService
	 * @description
	 * Provider for the {@link toast.service:Toast Toast-service}
	 *
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$mdToast} $mdToast The toast service to use
	 * @returns {Object} The service definition for the Toast Service
	 */

	ToastService.$inject = ['$mdToast'];

	function ToastService($mdToast) {

		return {
			show: showToast,
			hide: hideToast
		};

		/**
		 * @ngdoc function
		 * @name showToast
		 * @methodOf toast.service:Toast
		 * @description
		 * Display a toast with the given content. If the content is falsy
		 * use vm.message.text instead.
		 *
		 * @param {String|Object} content The toasts content or message object.
		 * If an object, the text property will be used as the toast content.
		 *
		 * @param {Object} [options] Options object passed to the toast service
		 * @returns {Promise} The mdToast promise
		 */
		function showToast(content, options) {
			if (!options) {
				options = {
					hideDelay: 2500,
					controller: 'ToastController',
					controllerAs: 'vm',
					templateUrl: 'app/components/toast/toast.html',
					locals: {
						type: content.type || 'info',
						text: content.text || content,
						link: content.link || false
					}
				};

				// set defaults for content.type warn
				if (content.type && content.type === 'warn') {
					options.hideDelay = 0;
				} else if (content.type && content.type === 'success') {
					options.hideDelay = 5000;
				}
			}

			return $mdToast.show(options);
		}

		/**
		 * @ngdoc function
		 * @name hideToast
		 * @methodOf toast.service:Toast
		 * @description
		 * Hide the current toast
		 * @returns {Promise} The mdToast promise
		 */
		function hideToast() {
			return $mdToast.hide();
		}
	}


	/**
	 * @ngdoc controller
	 * @name toast.controller:ToastController
	 * @description
	 * ToastController
	 *
	 * Controller for the custom toast template
	 *
	 * @param {$mdToast} $mdToast - The toast service to use
	 * @param {$state} $state - The state service to use
	 * @param {String} type - Type of the information
	 * @param {String} text - The toast message
	 * @param {String|Object} link - The link or state config object to navigate to
	 * @returns {Object} The service definition for the Toast Service
	 */

	ToastController.$inject = ['$mdToast', '$state', 'type', 'text', 'link'];

	function ToastController($mdToast, $state, type, text, link) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name text
		 * @description
		 * Some awesome text
		 * @propertyOf toast.controller:ToastController
		 */
		vm.text = text;

		/**
		 * @ngdoc property
		 * @name link
		 * @description
		 * Some awesome link
		 * @propertyOf toast.controller:ToastController
		 */
		vm.link = link;

		/**
		 * @ngdoc property
		 * @name type
		 * @description
		 * Some awesome type
		 * @propertyOf toast.controller:ToastController
		 */
		vm.type = type;

		// functions (documented below)
		vm.showItem = showItem;
		vm.close = closeToast;

		/**
		 * @ngdoc function
		 * @name showItem
		 * @description
		 * Navigate to the injected state
		 * @methodOf toast.controller:ToastController
		 * @api private
		 */
		function showItem() {
			vm.close();
			$state.go(vm.link.state, vm.link.params);
		}

		/**
		 * @ngdoc function
		 * @name closeToast
		 * @description
		 * Close the current toast
		 * @methodOf toast.controller:ToastController
		 * @api private
		 */
		function closeToast() {
			$mdToast.hide();
		}
	}

})();
