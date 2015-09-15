/**
 * @ngdoc service
 * @name <%= componentModule %>.mainMenu.service:mainMenu
 * @description
 * Service to manage the main menu
 */

(function () {
	'use strict';

	// register the service as MenuService
	angular.module('<%= componentModule %>.mainMenu')
		.provider('mainMenu', mainMenuProvider);

	/**
	 * @ngdoc function
	 * @name <%= componentModule %>.mainMenu.provider:mainMenu
	 * @description
	 * MenuProvider definition
	 * AngularJS will instantiate a singleton which is
	 * the object resulting from the $get method call
	 * However, providers can be configured in the config
	 * phase of your angular application
	 * @returns {Object} Singleton
	 */

	mainMenuProvider.$inject = ['_'];

	function mainMenuProvider(_) {
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
		self.addState = addState;

		// Method for instantiating
		self.$get = mainMenuFactory;

		/**
		 * @ngdoc function
		 * @name mainMenuFactory
		 * @methodOf <%= componentModule %>.mainMenu.service:mainMenuFactory
		 * @description
		 * factory function for MainMenu
		 * @param {Function} $mdSidenav The sidenav service to use
		 */

		mainMenuFactory.$inject = ['$mdSidenav', '_'];

		function mainMenuFactory($mdSidenav, _) {
			return new MainMenu($mdSidenav, _);
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
		 * @param {Object} menuData The menu data to add
		 */
		function addMenuItem(menuData) {
			menu.push(menuData);
		}

		/**
		 * @ngdoc function
		 * @name addState
		 * @methodOf mainMenu.service:mainMenu
		 * @description
		 * Adds a new menu item to the current menu
		 * @param {Object} state The state definition to get the menu
		 * items from.
		 */
		function addState(state) {
			var menuData = state.menu;

			if (!menuData || !state.hasOwnProperty('name')) {
				return;
			}

			menuData.state = state.name;

			if (state.hasOwnProperty('role')) {
				menuData.role = state.role;
			}

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

		/**
		 * Toggle the main menu component
		 */
		function toggle() {
			return mdSidenav(componentId).toggle();
		}

		// a private constructor
		function MainMenu($mdSidenav, _) {
			mdSidenav = $mdSidenav;
			this.getMenu = getMenu;
			this.addSubMenuItem = addSubMenuItem;
			this.close = close;
			this.open = open;
			this.toggle = toggle;

			/**
			 * Return the current ordered menu
			 * @returns {Array}
			 */
			function getMenu() {
				return _.sortBy(menu, 'order');
			}
		}

	}
})();
