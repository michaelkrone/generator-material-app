(function () {
	'use strict';

	// register the service as <%= classedName %>
	angular
		.module('<%= scriptAppName %>')
		.directive('<%= _.camelize(name) %>', <%= classedName %>);

	// add <%= classedName %> dependencies to inject
	// <%= classedName %>.$inject = [''];

	/**
	 * <%= classedName %> directive
	 */
	function <%= classedName %>() {
		// directive definition members
		var directive = {
			link: link,
			restrict: 'EA'
		};

		return directive;

		// directives link definition
		function link(scope, element, attrs) {
			element.text('this is the <%= classedName %> directive');
		}
	}

})();
