(function () {
	'use strict';

	// register the service as RepeatInput
	angular
		.module('<%= scriptAppName %>.repeatInput', [])
		.directive('repeatInput', RepeatInput);

	// add RepeatInput dependencies to inject
	// RepeatInput.$inject = [''];

	/**
	 * RepeatInput directive
	 */
	function RepeatInput() {
		// directive definition members
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel'
		};

		return directive;

		// directives link definition
		function link(scope, elem, attrs, model) {
			if (!attrs.repeatInput) {
				console.error('repeatInput expects a model as an argument!');
				return;
			}

			scope.$watch(attrs.repeatInput, function (value) {
				// Only compare values if the second ctrl has a value.
				if (model.$viewValue !== undefined && model.$viewValue !== '') {
					model.$setValidity('repeat-input', value === model.$viewValue);
				}
			});

			model.$parsers.push(function (value) {
				// Mute the repeatInput error if the second ctrl is empty.
				if (value === undefined || value === '') {
					model.$setValidity('repeat-input', true);
					return value;
				}

				var isValid = value === scope.$eval(attrs.repeatInput);
				model.$setValidity('repeat-input', isValid);
				return isValid ? value : undefined;
			});
		}
	}


})();
