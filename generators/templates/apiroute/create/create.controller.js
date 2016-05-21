/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController
 * @description
 * Controller of the <%= cameledName %> create page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the create controller as <%= modelName %>CreateController
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.create')
    .controller('<%= modelName %>CreateController', <%= modelName %>CreateController);

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>.<%= moduleName %>.create.provider:<%= modelName %>CreateController
   * @description
   * Provider of the {@link <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController <%= modelName %>CreateController}
   *
   * @param {Service} Auth The Auth service to use
   * @param {Service} $mdDialog The mdDialog service to use
   * @param {Service} <%= modelName %> The <%= modelName %> resource
   * @param {Service} <%= modelName %>Service The <%= modelName %> service to use
   * @param {Service} <%= modelName %>Definition The model definition of <%= modelName %> resource
   * @param {Service} Toast The Toast service to use
   * @returns {Service} {@link <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController <%= modelName %>CreateController}
   */

  <%= modelName %>CreateController.$inject = ['$mdDialog', '<%= modelName %>', '<%= modelName %>Service', '<%= modelName %>Definition', 'Toast'];

  function <%= modelName %>CreateController($mdDialog, <%= modelName %>, <%= modelName %>Service, <%= modelName %>Definition, Toast) {
    var vm = this;

    /**
     * @ngdoc property
     * @name <%= cameledName %>
     * @propertyOf <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController
     * @description
     * The new <%= cameledName %> data
     *
     * @returns {Object} The <%= cameledName %> data
     */
    vm.<%= cameledName %> = new <%= modelName %>();
    vm.<%= cameledName %>Definition = <%= modelName %>Definition;

    // view model bindings (documented below)
    vm.create = create<%= modelName %>;
    vm.close = hideDialog;
    vm.cancel = cancelDialog;

    /**
     * @ngdoc function
     * @name create<%= modelName %>
     * @methodOf <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController
     * @description
     * Create a new <%= cameledName %> by using the <%= modelName %>Service create method
     *
     * @param {form} [form] The form to gather the information from
     */
    function create<%= modelName %>(form) {
      // refuse to work with invalid data
      if (vm.<%= cameledName %>._id || (form && !form.$valid)) {
        return;
      }

      <%= modelName %>Service.create(vm.<%= cameledName %>)
        .then(create<%= modelName %>Success)
        .catch(create<%= modelName %>Catch);

      function create<%= modelName %>Success(new<%= modelName %>) {
        Toast.show({
          type: 'success',
          text: '<%= modelName %> ' + new<%= modelName %>.name + ' has been created',
          link: {state: '<%= moduleName %>.list.detail', params: {id: new<%= modelName %>._id}}
        });
        vm.close();
      }

      function create<%= modelName %>Catch(err) {
        if (form && err) {
          form.setResponseErrors(err);
        }

        Toast.show({
          type: 'warn',
          text: 'Error while creating a new <%= modelName %>'
        });
      }
    }

    /**
     * @ngdoc function
     * @name hide
     * @methodOf <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController
     * @description
     * Hide the dialog
     */
    function hideDialog() {
      $mdDialog.hide();
    }

    /**
     * @ngdoc function
     * @name cancel
     * @methodOf <%= scriptAppName %>.<%= moduleName %>.create.controller:<%= modelName %>CreateController
     * @description
     * Cancel the dialog
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
