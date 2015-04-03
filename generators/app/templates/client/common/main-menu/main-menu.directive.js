(function () {
	'use strict';

	// register the service as MainMenu
	angular
		.module('<%= scriptAppName %>.mainMenu')
		.directive('mainMenu', MainMenu);

	// add MainMenu dependencies to inject
	MainMenu.$inject = ['$rootScope', '$mdSidenav', '$document'];

	/**
	 * MainMenu directive
	 */
	function MainMenu($rootScope, $mdSidenav, $document) {
		// directive definition members
		var directive = {
			restrict: 'E',
			replace: true,
			templateUrl: 'common/main-menu/main-menu.html'
		};

		return directive;
	}


})();
