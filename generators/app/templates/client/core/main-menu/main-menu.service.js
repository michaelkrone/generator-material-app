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
		var self = this;
		// factory members
		var menu = [];
		var mdSidenav;
		var componentId = 'mainMenu';

		// public configuration API
		self.setMenu = setMenu;
		self.addMenuItem = addMenuItem;
		self.addSubMenuItem = addSubMenuItem;
		self.addController = addController;

		// Method for instantiating
		mainMenuFactory.$inject = ['$mdSidenav'];
		self.$get = mainMenuFactory;

		/**
		 * @ngdoc function
		 * @name mainMenuFactory
		 * @methodOf mainMenu.service:mainMenuFactory
		 * @description
		 * factory function for MainMenu
		 * @param {Function} $mdSidenav The sidenav service to use
		 */
		function mainMenuFactory($mdSidenav) {
			return new MainMenu($mdSidenav);
		}

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

		/**
		 * @ngdoc function
		 * @name addSubMenuItem
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Adds a new submenu item to a parent menu
		 * @param {String} parent The path of the parent element
		 * @param {Object} menuData The sub item data to add
		 */
		function addSubMenuItem(parent, menuData) {
			var menuItem = _.find(menu, {path: parent});
			if (menuItem) {
				menuItem.subItems = menuItem.subItems || [];
				menuItem.subItems.push(menuData);
			}
		}

		/**
		 * @ngdoc function
		 * @name addController
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Uses the $routeConfig property of the controllers constructor
		 * property to build a menu entry. The menu property of the $routeConfig
		 * element is used for setting the menu item.
		 * @param {Object} controller The routed controller to add to the menu
		 */
		function addController(controller) {
			controller.constructor.$routeConfig.forEach(function (item) {
				if (item.menu) {
					item.menu.path = item.path;
					addMenuItem(item.menu);
				}
			});
		}

		/**
		 * Close the main menu component
		 */
		function close() {
			return mdSidenav(componentId).close();
		}

		/**
		 * Open the main menu component
		 */
		function open() {
			return mdSidenav(componentId).open();
		}

		// a private constructor
		function MainMenu($mdSidenav) {
			mdSidenav = $mdSidenav;
			this.getMenu = getMenu;
			this.addSubMenuItem = addSubMenuItem;
			this.addController = addController;
			this.close = close;
			this.open = open;

			function getMenu() {
				return _.sortBy(menu, 'order');
			}
		}

	}
})();
