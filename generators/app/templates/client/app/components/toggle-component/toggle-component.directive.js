(function () {
	'use strict';

	/**
	 * Register the ToggleComponentDirective directive as toggleComponent.
	 * Register the directive controller as ToggleComponentController
	 * @module <%= scriptAppName %>.toggleComponent
	 * @name ToggleComponent
	 */

	angular
		.module('<%= scriptAppName %>.toggleComponent')
		.directive('toggleComponent', ToggleComponentDirective)
		.controller('ToggleComponentController', ToggleComponentController);

	// inject dependencies for the ToggleComponentDirective
	ToggleComponentDirective.$inject = ['$timeout', '$animate', '$parse', '$mdMedia', '$mdConstant', '$q', '$document'];

	/**
	 * Directive for components that can be toggled.
	 *
	 * @ngdoc directive
	 * @name ToggleComponentDirective
	 * @module <%= scriptAppName %>.toggleComponent
	 *
	 * @param $timeout
	 * @param $animate
	 * @param $parse
	 * @param $mdMedia
	 * @param $mdConstant
	 * @param $q
	 * @param $document
	 * @returns {{restrict: string, scope: {isOpen: string}, controller: string, compile: Function}}
	 * @constructor
	 */
	function ToggleComponentDirective($timeout, $animate, $parse, $mdMedia, $mdConstant, $q, $document) {
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
			var isLockedOpenParsed = $parse(attr.toggleComponentIsOpen);
			var isLocked = function () {
				return isLockedOpenParsed(scope.$parent, {$media: $mdMedia});
			};

			element.on('$destroy', toggleComponentCtrl.destroy);
			scope.$watch(isLocked, updateIsLocked);
			scope.$watch('isOpen', updateIsOpen);

			// Publish special accessor for the Controller instance
			toggleComponentCtrl.$toggleOpen = toggleOpen;

			/**
			 * Toggle the DOM classes to indicate `locked`
			 * @param isLocked
			 */
			function updateIsLocked(isLocked, oldValue) {
				if (isLocked === oldValue) {
					element.toggleClass('toggle-component-locked-open', !!isLocked);
				} else {
					$animate[isLocked ? 'addClass' : 'removeClass'](element, 'toggle-component-locked-open');
				}
			}

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

				return promise = $q.all([
					$animate[isOpen ? 'removeClass' : 'addClass'](element, 'toggle-component-closed')
						.then(function setElementFocus() {
							if (scope.isOpen) {
								element.focus();
							}
						})
				]);
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
							triggeringElement && triggeringElement.focus();
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
			 * apply the CSS close transition... Then notify the controller
			 * to close() and perform its own actions.
			 */
			function close(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				return toggleComponentCtrl.close();
			}
		}
	}

	// inject dependencies for the ToggleComponentController
	ToggleComponentController.$inject = ['$scope', '$element', '$attrs', '$q', '$mdComponentRegistry'];

	/**
	 * @private
	 * @ngdoc controller
	 * @name ToggleComponentController
	 * @module <%= scriptAppName %>.toggleComponent
	 *
	 */
	function ToggleComponentController($scope, $element, $attrs, $q, $mdComponentRegistry) {
		var self = this;

		// Use Default internal method until overridden by directive postLink

		self.toggleOpen = function () {
			return $q.when($scope.isOpen);
		};

		self.isOpen = function () {
			return !!$scope.isOpen;
		};

		self.open = function () {
			return self.$toggleOpen(true);
		};

		self.close = function () {
			return self.$toggleOpen(false);
		};

		self.toggle = function () {
			return self.$toggleOpen(!$scope.isOpen);
		};

		self.destroy = $mdComponentRegistry.register(self, $attrs.mdComponentId);
	}

})();


//
//
//
//(function () {
//	'use strict';
//
//	/**
//	 * Register the ToggleComponentDirective directive as toggleComponent.
//	 * Register the directive controller as ToggleComponentController
//	 * @module tApp.toggleComponent
//	 * @name ToggleComponent
//	 */
//
//	angular
//		.module('tApp.toggleComponent')
//		.directive('toggleComponent', ToggleComponentDirective)
//		.controller('ToggleComponentController', ToggleComponentController);
//
//	// inject dependencies for the ToggleComponentDirective
//	ToggleComponentDirective.$inject = ['$timeout', '$animate', '$parse', '$mdMedia', '$mdConstant', '$q', '$document', '$rootScope'];
//
//	/**
//	 * Directive for components that can be toggled.
//	 *
//	 * @ngdoc directive
//	 * @name ToggleComponentDirective
//	 * @module tApp.toggleComponent
//	 *
//	 * @param $timeout
//	 * @param $animate
//	 * @param $parse
//	 * @param $mdMedia
//	 * @param $mdConstant
//	 * @param $q
//	 * @param $document
//	 * @param _
//	 * @returns {{restrict: string, scope: {isOpen: string}, controller: string, compile: Function}}
//	 * @constructor
//	 */
//	function ToggleComponentDirective($timeout, $animate, $parse, $mdMedia, $mdConstant, $q, $document, $rootScope) {
//		return {
//			restrict: 'A',
//
//			scope: {
//				isOpen: '=?toggleComponentIsOpen'
//			},
//
//			controller: 'ToggleComponentController',
//
//			compile: function (element) {
//				element.addClass('toggle-component-closed');
//				element.attr('tabIndex', '-1');
//				return postLink;
//			}
//		};
//
//		/**
//		 * Directive Post Link function
//		 */
//		function postLink(scope, element, attr, toggleComponentCtrl) {
//			var triggeringElement = null;
//			var promise = $q.when(true);
//			var isLockedOpenParsed = $parse(attr.toggleComponentIsOpen);
//			var isLocked = function () {
//				return isLockedOpenParsed(scope.$parent, {$media: $mdMedia});
//			};
//
//			element.on('$destroy', toggleComponentCtrl.destroy);
//			scope.$watch(isLocked, updateIsLocked);
//			scope.$watch('isOpen', updateIsOpen);
//
//			// Publish special accessor for the Controller instance
//			toggleComponentCtrl.$toggleOpen = toggleOpen;
//			$rootScope.$on('$stateChangeStart', checkStates);
//
//			/**
//			 * Check the view of the transitioned states. Call the proper controller
//			 * method depending on the view of the transitioned states.
//			 *
//			 * @param {Event} event
//			 * @param {StateDefinition} toState
//			 * @param {StateParams} toParams
//			 * @param {StateDefinition} fromState
//			 * @param {StateParams} fromParams
//			 * @returns {*|void}
//			 */
//			function checkStates(event, toState, toParams, fromState, fromParams) {
//				return toggleComponentCtrl.open();
//
//				// if (toState.parent !== fromState.parent) {
//				// 	return ToggleComponent(toggleViewCtrl.$$mdHandle).close();
//				// }
//
//				// var sharedViews = _.intersection(Object.keys(toState.views), Object.keys(fromState.views));
//				// if (sharedViews.length) {
//				// 	return ToggleComponent(toggleViewCtrl.$$mdHandle).open();
//				// }
//			}
//
//
//			/**
//			 * Toggle the DOM classes to indicate `locked`
//			 * @param isLocked
//			 */
//			function updateIsLocked(isLocked, oldValue) {
//				if (isLocked === oldValue) {
//					element.toggleClass('toggle-component-locked-open', !!isLocked);
//				} else {
//					$animate[isLocked ? 'addClass' : 'removeClass'](element, 'toggle-component-locked-open');
//				}
//			}
//
//			/**
//			 * Toggle the toggleComponent view and attach/detach listeners
//			 * @param isOpen
//			 */
//			function updateIsOpen(isOpen) {
//				console.log(scope.isOpen, isOpen, element);
//				var parent = element.parent();
//
//				parent[isOpen ? 'on' : 'off']('keydown', onKeyDown);
//
//				if (isOpen) {
//					triggeringElement = $document[0].activeElement;
//				}
//
//				return promise = $q.all([
//					$animate[isOpen ? 'removeClass' : 'addClass'](element, 'toggle-component-closed')
//						.then(function setElementFocus() {
//							if (isOpen) {
//								element.focus();
//							}
//						})
//				]);
//			}
//
//			/**
//			 * Toggle the toggleComponent view and publish a promise to be resolved when
//			 * the view animation finishes.
//			 *
//			 * @param isOpen
//			 * @returns {*}
//			 */
//			function toggleOpen(isOpen) {
//				if (scope.isOpen === isOpen) {
//					return $q.when(true);
//				}
//				var deferred = $q.defer();
//
//				scope.isOpen = isOpen;
//				$timeout(setElementFocus, 0, false);
//
//				return deferred.promise;
//
//				function setElementFocus() {
//					// When the current `updateIsOpen()` animation finishes
//					updateIsOpen(isOpen).then(function (result) {
//						if (!scope.isOpen) {
//							// reset focus to originating element (if available) upon close
//							triggeringElement && triggeringElement.focus();
//							triggeringElement = null;
//						}
//
//						deferred.resolve(result);
//					});
//				}
//			}
//
//			/**
//			 * Auto-close toggleComponent when the `escape` key is pressed.
//			 * @param evt
//			 */
//			function onKeyDown(ev) {
//				var isEscape = (ev.keyCode === $mdConstant.KEY_CODE.ESCAPE);
//				return isEscape ? close(ev) : $q.when(true);
//			}
//
//			/**
//			 * With backdrop `clicks` or `escape` key-press, immediately
//			 * apply the CSS close transition... Then notify the controller
//			 * to close() and perform its own actions.
//			 */
//			function close(ev) {
//				ev.preventDefault();
//				ev.stopPropagation();
//				return toggleComponentCtrl.close();
//			}
//		}
//	}
//
//	// inject dependencies for the ToggleComponentController
//	ToggleComponentController.$inject = ['$scope', '$element', '$attrs', '$q', '$mdComponentRegistry'];
//
//	/**
//	 * @private
//	 * @ngdoc controller
//	 * @name ToggleComponentController
//	 * @module tApp.toggleComponent
//	 *
//	 */
//	function ToggleComponentController($scope, $element, $attrs, $q, $mdComponentRegistry) {
//		var self = this;
//
//		// Use Default internal method until overridden by directive postLink
//
//		self.toggleOpen = function () {
//			return $q.when($scope.isOpen);
//		};
//
//		self.isOpen = function () {
//			return !!$scope.isOpen;
//		};
//
//		self.open = function () {
//			return self.$toggleOpen(true);
//		};
//
//		self.close = function () {
//			return self.$toggleOpen(false);
//		};
//
//		self.toggle = function () {
//			return self.$toggleOpen(!$scope.isOpen);
//		};
//
//		self.destroy = $mdComponentRegistry.register(self, $attrs.mdComponentId);
//	}
//
//})();
