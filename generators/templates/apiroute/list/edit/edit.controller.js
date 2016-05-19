/**
 * @ngdoc controller
 * @name <%= scriptAppName %><%= moduleName %>.list.edit.controller:<%= modelName %>EditController
 * @description
 * Controller of the <%= cameledName %> edit page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the edit controller as <%= modelName %>EditController
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list.edit')
    .controller('<%= modelName %>EditController', <%= modelName %>EditController);

  /**
   * @ngdoc function
   * @name <%= scriptAppName %><%= moduleName %>.list.edit.provider:<%= modelName %>EditController
   * @description
   * Provider of the {@link <%= scriptAppName %><%= moduleName %>.list.edit.controller:<%= modelName %>EditController <%= modelName %>EditController}
   * @param {Service} $state The state service to use
   * @param {Service} $stateParams The stateParams service to use
   * @param {Service} $mdDialog The dialog service to use
   * @param {Service} Toast The Toast service to use
   * @param {Service} <%= modelName %>Service The <%= modelName %>Service to use
   * @param {Resource} <%= cameledName %> The <%= cameledName %> data to use
   */

  <%= modelName %>EditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', '<%= modelName %>Service', '<%= cameledName %>'];

  function <%= modelName %>EditController($state, $stateParams, $mdDialog, Toast, <%= modelName %>Service, <%= cameledName %>) {
    var vm = this;

    // defaults
    vm.<%= cameledName %> = angular.copy(<%= cameledName %>, vm.<%= cameledName %>);
    vm.displayName = <%= cameledName %>.name;

    // view model bindings
    vm.update = update;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.showList = showList;

    /**
     * Open the detail state with the current <%= cameledName %>
     *
     */
    function goBack() {
      $state.go('^.detail', {id: vm.<%= cameledName %>._id});
    }

    /**
     * Open the <%= cameledName %> list state
     *
     */
    function showList() {
      $state.go('^');
    }
    /**
     * Updates a <%= cameledName %> by using the <%= modelName %>Service save method
     * @param {Form} [form]
     */
    function update(form) {
      // refuse to work with invalid data
      if (!vm.<%= cameledName %>._id || form && !form.$valid) {
        return;
      }

      <%= modelName %>Service.update(vm.<%= cameledName %>)
        .then(update<%= modelName %>Success)
        .catch(update<%= modelName %>Catch);

      function update<%= modelName %>Success(updated<%= modelName %>) {
        // update the display name after successful save
        vm.displayName = updated<%= modelName %>.name;
        Toast.show({text: '<%= modelName %> ' + vm.displayName + ' updated'});
        if (form) {
          form.$setPristine();
        }
      }

      function update<%= modelName %>Catch(err) {
        Toast.show({
          type: 'warn',
          text: 'Error while updating <%= modelName %> ' + vm.displayName,
          link: {state: $state.$current, params: $stateParams}
        });

        if (form && err) {
          form.setResponseErrors(err.data);
        }
      }
    }

    /**
     * Show a dialog to ask the <%= cameledName %> if she wants to delete the current selected <%= cameledName %>.
     * @param {AngularForm} form - The form to pass to the remove handler
     * @param {$event} ev - The event to pass to the dialog service
     */
    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete <%= cameledName %> ' + vm.displayName + '?')
        .content('Do you really want to delete <%= cameledName %> ' + vm.displayName + '?')
        .ariaLabel('Delete <%= cameledName %>')
        .ok('Delete <%= cameledName %>')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm)
        .then(performRemove);

      /**
       * Removes a <%= cameledName %> by using the <%= modelName %>Service remove method
       * @api private
       */
      function performRemove() {
        <%= modelName %>Service.remove(vm.<%= cameledName %>)
          .then(delete<%= modelName %>Success)
          .catch(delete<%= modelName %>Catch);

        function delete<%= modelName %>Success() {
          Toast.show({type: 'success', text: '<%= modelName %> ' + vm.displayName + ' deleted'});
          vm.showList();
        }

        function delete<%= modelName %>Catch(err) {
          Toast.show({
            type: 'warn',
            text: 'Error while deleting <%= cameledName %> ' + vm.displayName,
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
