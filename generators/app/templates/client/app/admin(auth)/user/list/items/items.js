	/**
	 * @ngdoc overview
	 * @name <%= scriptAppName %>.admin.user.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `<%= scriptAppName %>.admin.user.list.items` module which provides:
	 *
	 * - {@link <%= scriptAppName %>.admin.user.list.items.controller:UserItemsController UserItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.admin.user.list.items', [
			'ui.router',
			'<%= scriptAppName %>.listImage'
		]);

})();
