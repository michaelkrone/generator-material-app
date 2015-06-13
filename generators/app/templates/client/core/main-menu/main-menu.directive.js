(function () {
	'use strict';

	// register the service as MainMenu
	angular
		.module('<%= scriptAppName %>.mainMenu')
		.directive('mainMenu', MainMenu);

	// add MainMenu dependencies to inject
	MainMenu.$inject = [];

	/**
	 * MainMenu directive
	 */
	function MainMenu() {
		// directive definition members
		var directive = {
			restrict: 'E',
			replace: true,
			templateUrl: 'core/main-menu/main-menu.html',
			controller: 'MainMenuController',
			controllerAs: 'menu'
		};

		return directive;
	}


})();
