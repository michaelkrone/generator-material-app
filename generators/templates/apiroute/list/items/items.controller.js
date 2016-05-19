(function () {
  'use strict';

  /**
   * Register the list controller as <%= classedName %>ItemsController
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list.items')
    .controller('<%= classedName %>ItemsController', <%= classedName %>ItemsController);

  // add <%= classedName %>ItemsController dependencies to inject
  <%= classedName %>ItemsController.$inject = ['$state'];

  /**
   * <%= classedName %>ItemsController constructor
   */
  function <%= classedName %>ItemsController($state) {
    var vm = this;

    // the selected item id
    var cur<%= classedName %>Id = null;

    // check if this item is selected
    vm.isSelected = isSelected;
    // switch to the detail state
    vm.showInDetails = showInDetails;

    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} <%= cameledName %> - The object to check for selection
     */
    function isSelected(<%= cameledName %>) {
      return cur<%= classedName %>Id === <%= cameledName %>._id;
    }

    /**
     * Open the detail state with the selected item
     *
     * @param {Object} <%= cameledName %> - The <%= cameledName %> to edit
     */
    function showInDetails(<%= cameledName %>) {
      cur<%= classedName %>Id = <%= cameledName %>._id;
      $state.go('<%= moduleName %>.list.detail', {'id': cur<%= classedName %>Id});
    }
  }

})();
