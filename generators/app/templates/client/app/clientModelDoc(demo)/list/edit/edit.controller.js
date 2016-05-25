/**
 * @ngdoc controller
 * @name <%= scriptAppName %>clientModelDoc.list.edit.controller:ClientModelDocEditController
 * @description
 * Controller of the clientModelDoc edit page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the edit controller as ClientModelDocEditController
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.list.edit')
    .controller('ClientModelDocEditController', ClientModelDocEditController);

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>clientModelDoc.list.edit.provider:ClientModelDocEditController
   * @description
   * Provider of the {@link <%= scriptAppName %>clientModelDoc.list.edit.controller:ClientModelDocEditController ClientModelDocEditController}
   * @param {Service} $state The state service to use
   * @param {Service} $stateParams The stateParams service to use
   * @param {Service} $mdDialog The dialog service to use
   * @param {Service} Toast The Toast service to use
   * @param {Service} ClientModelDocService The ClientModelDocService to use
   * @param {Resource} clientModelDoc The clientModelDoc data to use
   */

  ClientModelDocEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'ClientModelDocService', 'clientModelDoc'];

  function ClientModelDocEditController($state, $stateParams, $mdDialog, Toast, ClientModelDocService, clientModelDoc) {
    var vm = this;

    // defaults
    vm.clientModelDoc = angular.copy(clientModelDoc, vm.clientModelDoc);
    vm.displayName = clientModelDoc.name;

    // view model bindings
    vm.update = update;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.showList = showList;

    /**
     * Open the detail state with the current clientModelDoc
     *
     */
    function goBack() {
      $state.go('^.detail', {id: vm.clientModelDoc._id});
    }

    /**
     * Open the clientModelDoc list state
     *
     */
    function showList() {
      $state.go('^');
    }
    /**
     * Updates a clientModelDoc by using the ClientModelDocService save method
     * @param {Form} [form]
     */
    function update(form) {
      // refuse to work with invalid data
      if (!vm.clientModelDoc._id || form && !form.$valid) {
        return;
      }

      ClientModelDocService.update(vm.clientModelDoc)
        .then(updateClientModelDocSuccess)
        .catch(updateClientModelDocCatch);

      function updateClientModelDocSuccess(updatedClientModelDoc) {
        // update the display name after successful save
        vm.displayName = updatedClientModelDoc.name;
        Toast.show({text: 'ClientModelDoc ' + vm.displayName + ' updated'});
        if (form) {
          form.$setPristine();
        }
      }

      function updateClientModelDocCatch(err) {
        Toast.show({
          type: 'warn',
          text: 'Error while updating ClientModelDoc ' + vm.displayName,
          link: {state: $state.$current, params: $stateParams}
        });

        if (form && err) {
          form.setResponseErrors(err.data);
        }
      }
    }

    /**
     * Show a dialog to ask the clientModelDoc if she wants to delete the current selected clientModelDoc.
     * @param {AngularForm} form - The form to pass to the remove handler
     * @param {$event} ev - The event to pass to the dialog service
     */
    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete clientModelDoc ' + vm.displayName + '?')
        .content('Do you really want to delete clientModelDoc ' + vm.displayName + '?')
        .ariaLabel('Delete clientModelDoc')
        .ok('Delete clientModelDoc')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm)
        .then(performRemove);

      /**
       * Removes a clientModelDoc by using the ClientModelDocService remove method
       * @api private
       */
      function performRemove() {
        ClientModelDocService.remove(vm.clientModelDoc)
          .then(deleteClientModelDocSuccess)
          .catch(deleteClientModelDocCatch);

        function deleteClientModelDocSuccess() {
          Toast.show({type: 'success', text: 'ClientModelDoc ' + vm.displayName + ' deleted'});
          vm.showList();
        }

        function deleteClientModelDocCatch(err) {
          Toast.show({
            type: 'warn',
            text: 'Error while deleting clientModelDoc ' + vm.displayName,
            link: {state: $state.$current, params: $stateParams}
          });

          if (form && err) {
            form.setResponseErrors(err, vm.errors);
          }
        }
      }
    }
  }
})();
