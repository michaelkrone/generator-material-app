(function () {
	'use strict';

	// register the service as MainMenu
	angular
		.module('<%= componentModule %>.mainMenu')
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
			templateUrl: 'app/components/main-menu/main-menu.html',
			controller: 'MainMenuController',
			controllerAs: 'menu'
		};

		return directive;
	}


})();
