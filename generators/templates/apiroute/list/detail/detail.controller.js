(function () {
  'use strict';

  /**
   * Register the edit controller as <%= classedName %>DetailController
    */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list.detail')
    .controller('<%= classedName %>DetailController', <%= classedName %>DetailController);

  // add <%= classedName %>DetailController dependencies to inject
  <%= classedName %>DetailController.$inject = ['$state', '<%= cameledName %>'];

  /**
   * <%= classedName %>DetailController constructor
   */
  function <%= classedName %>DetailController($state, <%= cameledName %>) {
    var vm = this;

    // the current <%= cameledName %> to display
    vm.<%= cameledName %> = <%= cameledName %>;
    // switch to the edit state
    vm.edit = edit;
    // switch to the parent state
    vm.goBack = goBack

    /**
     * Open the edit state with the current <%= cameledName %>
     *
     */
    function edit() {
      $state.go('^.edit', {'id': vm.<%= cameledName %>._id});
    }

    /**
     * Return to the parent state
     *
     */
    function goBack() {
      $state.go('^');
    }
  }
})();
