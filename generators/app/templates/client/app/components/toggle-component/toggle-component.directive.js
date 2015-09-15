/**
 * @ngdoc directive
 * @name toggleComponent.directive:toggleComponent
 * @restrict A
 * @requires ngModel
 * @description
 * Directive for components that can be toggled.
 *
 * @element ANY
 * @param {Boolean} toggleComponentIsOpen If the component is open
 * @param {Event} toggleComponentOnKeyDown OnKeyDown-Event for handling keypresses
 */

/**
 * @ngdoc controller
 * @name toggleComponent.controller:ToggleComponentController
 * @description
 * Controller which is used by the {@link toggleComponent.directive:toggleComponent toggleComponent-directive}
 */

(function () {
	'use strict';

	/**
	 * Register the ToggleComponentDirective directive as toggleComponent.
	 * Register the directive controller as ToggleComponentController
	 */
	angular
		.module('<%= componentModule %>.toggleComponent')
		.directive('toggleComponent', ToggleComponentDirective)
		.controller('ToggleComponentController', ToggleComponentController);


	/**
	 * @ngdoc function
	 * @name toggleComponent.provider:ToggleComponentDirective
	 * @description
	 * Provider for the {@link toggleComponent.directive:toggleComponent toggleComponent-directive}
	 *
	 * @param {Service} $timeout Timeout service
	 * @param {Service} $animate Animate service
	 * @param {Service} $parse parse service
	 * @param {Service} $mdMedia Material service
	 * @param {Service} $mdConstant Material constant
	 * @param {Service} $q Promise service
	 * @param {Service} $document Document service
	 * @returns {Object} Directive factory
	 */

	ToggleComponentDirective.$inject = ['$timeout', '$animate', '$mdConstant', '$q', '$document'];

	function ToggleComponentDirective($timeout, $animate, $mdConstant, $q, $document) {
		return {
			restrict: 'A',

			scope: {
				isOpen: '=?toggleComponentIsOpen',
				keyDown: '=?toggleComponentOnKeydown'
			},

			controller: 'ToggleComponentController',

			compile: function (element) {
				element.addClass('toggle-component-closed');
				element.attr('tabIndex', '-1');
				return postLink;
			}
		};

		/**
		 * Directive Post Link function
		 */
		function postLink(scope, element, attr, toggleComponentCtrl) {
			var triggeringElement = null;
			var promise = $q.when(true);

			element.on('$destroy', toggleComponentCtrl.destroy);
			scope.$watch('isOpen', updateIsOpen);

			// Publish special accessor for the Controller instance
			toggleComponentCtrl.$toggleOpen = toggleOpen;

			/**
			 * Toggle the toggleComponent view and attach/detach listeners
			 * @param isOpen
			 */
			function updateIsOpen(isOpen) {
				var parent = element.parent();

				if (scope.keyDown) {
					parent[isOpen ? 'on' : 'off']('keydown', onKeyDown);
				}

				if (isOpen) {
					triggeringElement = $document[0].activeElement;
				}

				promise = $q.all([
					$animate[isOpen ? 'removeClass' : 'addClass'](element, 'toggle-component-closed')
						.then(function setElementFocus() {
							if (scope.isOpen) {
								element.focus();
							}
						})
				]);

				return promise;
			}

			/**
			 * Toggle the toggleComponent view and publish a promise to be resolved when
			 * the view animation finishes.
			 *
			 * @param isOpen
			 * @returns {*}
			 */
			function toggleOpen(isOpen) {
				if (scope.isOpen === isOpen) {
					return $q.when(true);
				}

				var deferred = $q.defer();

				// Toggle value to force an async `updateIsOpen()` to run
				scope.isOpen = isOpen;
				$timeout(setElementFocus, 0, false);

				return deferred.promise;

				function setElementFocus() {
					// When the current `updateIsOpen()` animation finishes
					promise.then(function (result) {
						if (!scope.isOpen) {
							// reset focus to originating element (if available) upon close
							if (triggeringElement) {
								triggeringElement.focus();
							}
							triggeringElement = null;
						}

						deferred.resolve(result);
					});
				}
			}

			/**
			 * Auto-close toggleComponent when the `escape` key is pressed.
			 * @param evt
			 */
			function onKeyDown(ev) {
				var isEscape = (ev.keyCode === $mdConstant.KEY_CODE.ESCAPE);
				return isEscape ? close(ev) : $q.when(true);
			}

			/**
			 * With backdrop `clicks` or `escape` key-press, immediately
			 * apply the CSS close transition. Then notify the controller
			 * to close() and perform its own actions.
			 */
			function close(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				return toggleComponentCtrl.close();
			}
		}
	}

	/**
	 * @ngdoc function
	 * @name toggleComponent.provider:ToggleComponentController
	 * @description
	 * Provider of the {@link toggleComponent.controller:ToggleComponentController ToggleComponentController}
	 *
	 * @param {Service} $scope The scope to use
	 * @param {Service} $element The element to use
	 * @param {Service} $attrs The attributes to use
	 * @param {Service} $q The promise service to use
	 * @param {Service} $mdComponentRegistry The component registry service to use
	 * @returns {Controller} The Controller
	 */
	ToggleComponentController.$inject = ['$scope', '$element', '$attrs', '$q', 'componentRegistry'];

	function ToggleComponentController($scope, $element, $attrs, $q, componentRegistry) {
		var self = this;

		// Use Default internal method until overridden by directive postLink

		/**
		 * @ngdoc function
		 * @name toggleOpen
		 * @methodOf toggleComponent.controller:ToggleComponentController
		 * @returns {Promise} Promise
		 */
		self.toggleOpen = function () {
			return $q.when($scope.isOpen);
		};

		/**
		 * @ngdoc function
		 * @name isOpen
		 * @methodOf toggleComponent.controller:ToggleComponentController
		 * @description
		 * Returns true, if the component is currently open
		 *
		 * @returns {Boolean} True, if component is open
		 */
		self.isOpen = function () {
			return !!$scope.isOpen;
		};

		/**
		 * @ngdoc function
		 * @name open
		 * @methodOf toggleComponent.controller:ToggleComponentController
		 * @description
		 * Opens the component
		 *
		 * Calls {@link toggleComponent.controller:ToggleComponentController#toggleOpen toggleOpen(true)} internally
		 * @returns {Promise} Promise
		 */
		self.open = function () {
			return self.$toggleOpen(true);
		};

		/**
		 * @ngdoc function
		 * @name close
		 * @methodOf toggleComponent.controller:ToggleComponentController
		 * @returns {Promise} Promise
		 */
		self.close = function () {
			return self.$toggleOpen(false);
		};

		/**
		 * @ngdoc function
		 * @name toggle
		 * @methodOf toggleComponent.controller:ToggleComponentController
		 * @returns {Promise} Promise
		 */
		self.toggle = function () {
			return self.$toggleOpen(!$scope.isOpen);
		};

		self.destroy = componentRegistry.register(self, $attrs.toggleComponent);
	}

})();
