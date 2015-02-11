(function () {
	'use strict';

	// register the service as <%= classedName %>Service
	angular
		.module('<%= scriptAppName %>')
		.factory('<%= classedName %>', <%= classedName %>);

	// add <%= classedName %> dependencies to inject
	// <%= classedName %>.$inject = [''];

	/**
	 * <%= classedName %> factory constructor
	 * AngularJS will instantiate a singleton which is
	 * an object that has the members of this factory
	 */
	function <%= classedName %>() {
		// factory members
		var name = '<%= name %>';

		// public API
		return {
			name: name,
			doSomething: doSomething
		};

		// factory function definitions
		function doSomething() {
			return name;
		}
	}

})();
