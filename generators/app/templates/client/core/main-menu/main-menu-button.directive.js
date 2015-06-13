(function () {
	'use strict';

	// register the directive as MainMenuButton
	angular
		.module('<%= scriptAppName %>.mainMenu')
		.directive('mainMenuButton', MainMenuButton);

	// add MainMenu dependencies to inject
	MainMenuButton.$inject = ['mainMenu'];

	/**
	 * MainMenu directive
	 */
	function MainMenuButton(mainMenu) {
		// directive definition members
		var directive = {
			restrict: 'E',
			replace: true,
			templateUrl: 'core/main-menu/main-menu-button.html',
			controller: 'MainMenuButtonController',
			controllerAs: 'mainMenu'
		};

		return directive;
	}


})();
