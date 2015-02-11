(function () {
	'use strict';

	// register directive as mongooseError
	angular
		.module('<%= scriptAppName %>.mongooseError', [])
		.directive('mongooseError', MongooseError);

	// inject dependencies for SocketService
	// MongooseError.$inject = [''];

	/**
	 * MongooseError constructor
	 * Removes server error when user updates input
	 * (set model valid on user input)
	 */
	function MongooseError() {
		// directive definition members
		var directive = {
			restrict: 'A',
			require: 'ngModel',
			link: link
		};

		return directive;

		// set model valid on user input
		function link(scope, element, attrs, ngModel) {
			element.on('keydown', function () {
				return ngModel.$setValidity('mongoose', true);
			});
		}
	}

})();
