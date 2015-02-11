(function () {
	'use strict';

	// register the service as <%= classedName %>Service
	angular
		.module('<%= scriptAppName %>')
		.service('<%= classedName %>', <%= classedName %>);

	// add <%= classedName %> dependencies to inject
	// <%= classedName %>.$inject = [''];

	/**
	 * <%= classedName %> constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 * @returns {Object} The service definition for the <%= classedName %> Service
	 */
	function <%= classedName %>() {

		return {
			doSomething: doSomething
		};

		// define instance methods
		function doSomething () {
			return '<%= name %>';
		}
	}

})();
