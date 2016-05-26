/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController
 * @description
 * Controller of the clientModelDoc create page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the create controller as ClientModelDocCreateController
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.create')
    .controller('ClientModelDocCreateController', ClientModelDocCreateController);

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>.clientModelDoc.create.provider:ClientModelDocCreateController
   * @description
   * Provider of the {@link <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController ClientModelDocCreateController}
   *
   * @param {Service} Auth The Auth service to use
   * @param {Service} $mdDialog The mdDialog service to use
   * @param {Service} ClientModelDoc The ClientModelDoc resource
   * @param {Service} ClientModelDocService The ClientModelDoc service to use
   * @param {Service} ClientModelDocDefinition The model definition of ClientModelDoc resource
   * @param {Service} Toast The Toast service to use
   * @returns {Service} {@link <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController ClientModelDocCreateController}
   */

  ClientModelDocCreateController.$inject = ['$mdDialog', 'ClientModelDoc', 'ClientModelDocService', 'ClientModelDocDefinition', 'Toast'];

  function ClientModelDocCreateController($mdDialog, ClientModelDoc, ClientModelDocService, ClientModelDocDefinition, Toast) {
    var vm = this;

    /**
     * @ngdoc property
     * @name clientModelDoc
     * @propertyOf <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController
     * @description
     * The new clientModelDoc data
     *
     * @returns {Object} The clientModelDoc data
     */
    vm.clientModelDoc = new ClientModelDoc();
    vm.clientModelDocDefinition = ClientModelDocDefinition;

    // view model bindings (documented below)
    vm.create = createClientModelDoc;
    vm.close = hideDialog;
    vm.cancel = cancelDialog;

    /**
     * @ngdoc function
     * @name createClientModelDoc
     * @methodOf <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController
     * @description
     * Create a new clientModelDoc by using the ClientModelDocService create method
     *
     * @param {form} [form] The form to gather the information from
     */
    function createClientModelDoc(form) {
      // refuse to work with invalid data
      if (vm.clientModelDoc._id || (form && !form.$valid)) {
        return;
      }

      ClientModelDocService.create(vm.clientModelDoc)
        .then(createClientModelDocSuccess)
        .catch(createClientModelDocCatch);

      function createClientModelDocSuccess(newClientModelDoc) {
        Toast.show({
          type: 'success',
          text: 'ClientModelDoc ' + newClientModelDoc.name + ' has been created',
          link: {state: 'clientModelDoc.list.detail', params: {id: newClientModelDoc._id}}
        });
        vm.close();
      }

      function createClientModelDocCatch(err) {
        if (form && err) {
          form.setResponseErrors(err);
        }

        Toast.show({
          type: 'warn',
          text: 'Error while creating a new ClientModelDoc'
        });
      }
    }

    /**
     * @ngdoc function
     * @name hide
     * @methodOf <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController
     * @description
     * Hide the dialog
     */
    function hideDialog() {
      $mdDialog.hide();
    }

    /**
     * @ngdoc function
     * @name cancel
     * @methodOf <%= scriptAppName %>.clientModelDoc.create.controller:ClientModelDocCreateController
     * @description
     * Cancel the dialog
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
