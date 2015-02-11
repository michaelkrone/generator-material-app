(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('<%= scriptAppName %>')
		.config(config<%= classedName %>Route);

	// inject config<%= classedName %>Route dependencies
	config<%= classedName %>Route.$inject = ['$stateProvider'];

	// route config function configuring the passed $stateProvider
	function config<%= classedName %>Route($stateProvider) {
		$stateProvider
			.state('<%= name %>', {
				url: '<%= route %>',
				templateUrl: '<%= htmlUrl %>',
				controller: '<%= classedName %>Ctrl',
				controllerAs: 'vm'
		});
	}

})();
