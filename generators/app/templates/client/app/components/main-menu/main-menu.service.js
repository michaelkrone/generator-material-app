/**
 * @ngdoc service
 * @name <%= scriptAppName %>.mainMenu.service:mainMenu
 * @description
 * Service to manage the main menu
 */

(function () {
	'use strict';

	// register the service as MenuService
	angular.module('<%= scriptAppName %>.mainMenu')
		.provider('mainMenu', mainMenuProvider);

	/**
	 * @ngdoc function
	 * @name mainMenu.provider:mainMenu
	 * @description
	 * MenuProvider definition
	 * AngularJS will instantiate a singleton which is
	 * the object resulting from the $get method call
	 * However, providers can be configured in the config
	 * phase of your angular application
	 * @returns {Object} Singleton
	 */
	function mainMenuProvider() {
		/* jshint validthis:true */
		// factory members
		var menu = [];

		// public configuration API
		this.setMenu = setMenu;
		this.addMenuItem = addMenuItem;

		/**
		 * @ngdoc function
		 * @name setMenu
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Sets a new menu
		 * @param {*} newMenu The new menu
		 */
		function setMenu(newMenu) {
			menu = newMenu;
		}

		/**
		 * @ngdoc function
		 * @name addMenuItem
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Adds a new menu item to the current menu
		 * @param {*} menuData The menu data to add
		 */
		function addMenuItem(menuData) {
			menu.push(menuData);
		}

		// a private constructor
		function MainMenu() {
			this.getMenu = getMenu;

			function getMenu() {
				return menu;
			}
		}

		// Method for instantiating
		this.$get = function mainMenuFactory() {
			return new MainMenu();
		};
	}
})();
