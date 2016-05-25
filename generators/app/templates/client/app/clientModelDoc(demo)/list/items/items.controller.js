(function () {
  'use strict';

  /**
   * Register the list controller as ClientModelDocItemsController
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.list.items')
    .controller('ClientModelDocItemsController', ClientModelDocItemsController);

  // add ClientModelDocItemsController dependencies to inject
  ClientModelDocItemsController.$inject = ['$state'];

  /**
   * ClientModelDocItemsController constructor
   */
  function ClientModelDocItemsController($state) {
    var vm = this;

    // the selected item id
    var curClientModelDocId = null;

    // check if this item is selected
    vm.isSelected = isSelected;
    // switch to the detail state
    vm.showInDetails = showInDetails;

    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} clientModelDoc - The object to check for selection
     */
    function isSelected(clientModelDoc) {
      return curClientModelDocId === clientModelDoc._id;
    }

    /**
     * Open the detail state with the selected item
     *
     * @param {Object} clientModelDoc - The clientModelDoc to edit
     */
    function showInDetails(clientModelDoc) {
      curClientModelDocId = clientModelDoc._id;
      $state.go('clientModelDoc.list.detail', {'id': curClientModelDocId});
    }
  }

})();
