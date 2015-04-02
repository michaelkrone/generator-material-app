(function () {
	'use strict';

	/**
	 * Register the service as ToggleComponent
	 * @module <%= scriptAppName %>.toggleComponent
	 * @name ToggleComponent
	 */

	angular
		.module('<%= scriptAppName %>.toggleComponent')
		.service('ToggleComponent', ToggleComponentService);

	// add ToggleComponent dependencies to inject
	ToggleComponentService.$inject = ['$mdComponentRegistry', '$log', '$q'];

	/**
	 * ToggleComponent constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @ngdoc controller
	 * @name ToggleComponentService
	 * @module <%= scriptAppName %>.toggleComponent
	 * @returns {Object} The service definition for the ToggleComponent Service
	 */
	function ToggleComponentService($mdComponentRegistry, $log, $q) {
		return function (contentHandle) {
			var errorMsg = "ToggleComponent '" + contentHandle + "' is not available!";
			var instance = $mdComponentRegistry.get(contentHandle);

			if (!instance) {
				$log.error('No content-switch found for handle ' + contentHandle);
			}

			return {
				isOpen: isOpen,
				toggle: toggle,
				open: open,
				close: close
			};

			function isOpen() {
				return instance && instance.isOpen();
			}

			function toggle() {
				return instance ? instance.toggle() : $q.reject(errorMsg);
			}

			function open() {
				return instance ? instance.open() : $q.reject(errorMsg);
			}

			function close() {
				return instance ? instance.close() : $q.reject(errorMsg);
			}
		};
	}

})();
