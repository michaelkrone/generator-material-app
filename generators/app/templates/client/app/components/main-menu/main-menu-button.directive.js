(function () {
	'use strict';

	// register the service as MainMenuButton
	angular
		.module('<%= componentModule %>.mainMenu')
		.directive('mainMenuButton', MainMenuButton);

	/**
	 * MainMenuButton directive
	 */
	function MainMenuButton() {
		// directive definition members
		var directive = {
			restrict: 'E',
			template: '<md-button aria-label="Open menu" ng-click="menu.open()" hide-gt-lg class="md-icon-button">\
					<md-icon md-svg-icon="navigation:ic_menu_24px"></md-icon>\
				</md-button>',
			controller: 'MainMenuController',
			controllerAs: 'menu'
		};

		return directive;
	}
})();
