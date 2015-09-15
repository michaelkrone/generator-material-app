/**
 * @ngdoc service
 * @name toggleComponent.service:ToggleComponent
 * @requires toggleComponent.directive:toggleComponent
 * @description
 * ToggleComponent constructor
 * AngularJS will instantiate a singleton by calling "new" on this function
 */

(function () {
	'use strict';

	angular
		.module('<%= componentModule %>.toggleComponent')
		.service('ToggleComponent', ToggleComponentService)
		.factory('componentRegistry', ComponentRegistry);

	/**
	 * @ngdoc function
	 * @name toggleComponent.provider:ToggleComponentService
	 * @description
	 * Provider for the {@link toggleComponent.service:ToggleComponent ToggleComponent-service}
	 *
	 * @param {Service} componentRegistry Component registry service
	 * @param {Service} $log Logging service
	 * @param {Service} $q Promising service
	 */
	ToggleComponentService.$inject = ['$rootScope', 'componentRegistry', '$log', '$q'];

	function ToggleComponentService($rootScope, componentRegistry, $log, $q) {
		// jshint shadow:true
		return function (contentHandle) {
			var errorMsg = 'ToggleComponent "' + contentHandle + '" is not available!';
			var instance = componentRegistry.get(contentHandle);

			if (!instance) {
				$log.error('No toggle-component found for handle ' + contentHandle);
			}

			return {
				isOpen: isOpen,
				toggle: toggle,
				open: open,
				close: close
			};

			/**
			 * @ngdoc function
			 * @name isOpen
			 * @methodOf toggleComponent.service:ToggleComponent
			 * @returns {Boolean} True, if open
			 */
			function isOpen() {
				return instance && instance.isOpen();
			}

			/**
			 * @ngdoc function
			 * @name toggle
			 * @methodOf toggleComponent.service:ToggleComponent
			 * @returns {Boolean} True, if open
			 */
			function toggle() {
				var ret = instance ? instance.toggle() : $q.reject(errorMsg);
				emit(isOpen());
				return ret;
			}

			/**
			 * @ngdoc function
			 * @name open
			 * @methodOf toggleComponent.service:ToggleComponent
			 * @returns {Boolean} True, if open
			 */
			function open() {
				var ret = instance ? instance.open() : $q.reject(errorMsg);
				emit(true);
				return ret;
			}

			/**
			 * @ngdoc function
			 * @name close
			 * @methodOf toggleComponent.service:ToggleComponent
			 * @returns {Boolean} True, if open
			 */
			function close() {
				var ret = instance ? instance.close() : $q.reject(errorMsg);
				emit(false);
				return ret;
			}

			function emit(open) {
				$rootScope.$emit('component.toggled', {component: contentHandle, open: open});
			}
		};
	}


	/*
	 * @private
	 * @ngdoc factory
	 * @name ComponentRegistry
	 */

	ComponentRegistry.$inject = ['$log', '$q'];

	function ComponentRegistry($log, $q) {

		var instances = [];
		var pendings = {};

		var self = {
			/**
			 * Used to print an error when an instance for a handle isn't found.
			 */
			notFoundError: function (handle) {
				$log.error('No instance found for handle', handle);
			},
			/**
			 * Return all registered instances as an array.
			 */
			getInstances: function () {
				return instances;
			},

			/**
			 * Get a registered instance.
			 * @param handle the String handle to look up for a registered instance.
			 */
			get: function (handle) {
				if (!isValidID(handle)) {
					return null;
				}

				var i, j, instance;
				for (i = 0, j = instances.length; i < j; i += 1) {
					instance = instances[i];
					if (instance.$$componentHandle === handle) {
						return instance;
					}
				}
				return null;
			},

			/**
			 * Register an instance.
			 * @param instance the instance to register
			 * @param handle the handle to identify the instance under.
			 */
			register: function (instance, handle) {
				if (!handle) {
					return angular.noop;
				}

				instance.$$componentHandle = handle;
				instances.push(instance);
				resolveWhen();

				return deregister;

				/**
				 * Remove registration for an instance
				 */
				function deregister() {
					var index = instances.indexOf(instance);
					if (index !== -1) {
						instances.splice(index, 1);
					}
				}

				/**
				 * Resolve any pending promises for this instance
				 */
				function resolveWhen() {
					var dfd = pendings[handle];
					if (dfd) {
						dfd.resolve(instance);
						delete pendings[handle];
					}
				}
			},

			/**
			 * Async accessor to registered component instance
			 * If not available then a promise is created to notify
			 * all listeners when the instance is registered.
			 */
			when: function (handle) {
				if (isValidID(handle)) {
					var deferred = $q.defer();
					var instance = self.get(handle);

					if (instance) {
						deferred.resolve(instance);
					} else {
						pendings[handle] = deferred;
					}

					return deferred.promise;
				}
				return $q.reject('Invalid `toggle-component` value.');
			}

		};

		function isValidID(handle) {
			return handle && (handle !== '');
		}

		return self;
	}

})();
