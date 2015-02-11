(function () {
	'use strict';

	// register the service as <%= classedName %>Service
	angular
		.module('<%= scriptAppName %>')
		.filter('<%= classedName %>', <%= classedName %>);

	// add <%= classedName %> dependencies to inject
	// <%= classedName %>.$inject = [''];

	/**
	 * <%= classedName %> filter constructor
	 */
	function <%= classedName %>() {
		return function (input) {
			return '<%= classedName %> filter: ' + input;
		};
	}

})();
