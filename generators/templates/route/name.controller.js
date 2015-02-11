(function () {
	'use strict';

	// register the controller as <%= classedName %>Ctrl
	angular
		.module('<%= scriptAppName %>')
		.controller('<%= classedName %>Ctrl', <%= classedName %>Ctrl);

	// add <%= classedName %>Ctrl dependencies to inject
	// <%= classedName %>Ctrl.$inject = ['$scope'];

	/**
	 * <%= classedName %>Ctrl constructor
 	 */
	function <%= classedName %>Ctrl() {
		var vm = this;

		// view model bindings
		vm.title = '<%= name %>';
		vm.doSomething = doSomething;

		// view model implementations
		function doSomething() {
			return [vm.title, 'a sublime controller'].join(' - ');
		}
	}

})();
