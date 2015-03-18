(function () {
	'use strict';

	// register the directive as <%= classedName %>
	angular
		.module('<%= scriptAppName %>')
		.directive('<%= classedName %>', <%= classedName %>);

	// add <%= classedName %> dependencies to inject
	// <%= classedName %>.$inject = [''];

	/**
	 * <%= classedName %> directive
	 */
	function <%= classedName %>() {
		// directive definition members
		var directive = {
			link: link,
			templateUrl: '<%= htmlUrl %>',
			restrict: 'EA'
		};

		return directive;

		// directives link definition
		function link(scope, element, attrs) {
			element.text('this is the <%= classedName%> directive');
		}
	}

})();
