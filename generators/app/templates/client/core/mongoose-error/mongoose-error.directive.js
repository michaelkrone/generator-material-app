/**
 * @ngdoc overview
 * @name mongooseError
 * @description
 * The `<%= scriptAppName %>.mongooseError` module which provides:
 *
 * - {@link mongooseError.directive:mongooseError mongooseError-directive}
 * - {@link mongooseError.constant:mongooseErrorEvent mongooseErrorEvent-constant}

 */

/**
 * @ngdoc directive
 * @module <%= scriptAppName %>.mongooseError
 * @name mongooseError.directive:mongooseError
 * @restrict A
 * @element input
 * @requires ngModel
 * @requires form
 * @requires ngForm
 * @description
 * Removes server error when user updates input (set model valid on user input).
 * Augment the form controller with a 'setResponseErrors' method which can be called
 * with the response object of a request where a create, update or delete mongoose operation
 * is involved. This will set all returned errors on the proper form field
 */

(function () {
	'use strict';

	// register directive as mongooseError
	angular
		.module('<%= scriptAppName %>.mongooseError', [])
		.constant('mongooseErrorEvent', mongooseErrorEvent())
		.directive('mongooseError', MongooseError);

	/**
	 * @ngdoc property
	 * @name mongooseError.constant:mongooseErrorEvent
	 * @description
	 * Name of the event called by parent forms to inform child forms of the
	 * mongoose error object or the corresponding server response.
	 *
	 * @returns {String} 'mongooseErrorEvent'
	 */
	function mongooseErrorEvent() {
		return 'mongooseErrorEvent';
	}

	/**
	 * @ngdoc function
	 * @name mongooseError.provider:MongooseError
	 * @description
	 * Provider of the {@link mongooseError.directive:mongooseError mongooseError-directive}
	 *
	 * @returns {Service} {@link mongooseError.directive:mongooseError mongooseError-directive}
	 */

	MongooseError.$inject = ['$rootScope', 'mongooseErrorEvent'];

	function MongooseError($rootScope, mongooseErrorEvent) {
		// directive definition members
		var directive = {
			restrict: 'A',
			require: ['ngModel', '?^form', '?^ngForm'],
			link: link
		};

		return directive;

		function link(scope, element, attrs, ctrls) {
			var field = ctrls.shift();

			// mixin the setResponse errors function to form and ngForm
			ctrls.forEach(function (ctrl) {
				if (!ctrl) {
					return;
				}

				if (!ctrl.hasOwnProperty('setResponseErrors')) {
					ctrl.setResponseErrors = setResponseErrors;
				}

				var parent = ctrl.$$parentForm;

				// this form is a child of a parent form
				if (parent.$name) {
					// register the delegate once
					if (!parent.hasOwnProperty('setResponseErrors')) {
						parent.setResponseErrors = delegateResponseErrors;
					}

					// attach our fields scope to the error response event from the parent form
					scope.$on(mongooseErrorEvent, function (event, args) {
						ctrl.setResponseErrors(args[0], args[1]);
					});
				}

			});

			// set model valid on user input
			element.on('keydown', function () {
				return field.$setValidity('mongoose', true);
			});

			// set model valid on user input
			if (attrs.type === 'date' ||
				attrs.type === 'datetime-local' ||
				attrs.type === 'month' ||
				attrs.type === 'time') {
				element.on('click', function () {
					return field.$setValidity('mongoose', true);
				});
			}
		}

		/**
		 * Update validity of form fields that match the mongoose errors
		 * @param {Object} errors - The errors object to look for property names on
		 * @param {Object} [obj] - Object to attach all errors to
		 * @return {Object} An object with all fields mapped to the corresponding error
		 */
		function setResponseErrors(err, obj) {
			/* jshint validthis: true */
			var self = this;
			obj = obj || {};

			if (err.data && err.data.errors) {
				err = err.data.errors;
			}

			if (err.errors) {
				err = err.errors;
			}

			angular.forEach(err, function (error, field) {
				if (self[field]) {
					self[field].$setValidity('mongoose', false);
				}
				obj[field] = error.type;
			});
		}

		/**
		 * Delegate the call to setResponseErrors. Broadcast the mongoose error event to
		 * inform child forms of the error response.
		 */
		function delegateResponseErrors() {
			$rootScope.$broadcast(mongooseErrorEvent, arguments);
		}
	}

})();
