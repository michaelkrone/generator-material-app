(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %>.list.edit module
   * and configure it.
   *
   * @requires 'ui.router',
   * @requires 'ngMaterial',
   * @requires <%= scriptAppName %>.mongooseError
   * @requires <%= scriptAppName %>.<%= moduleName %>.service
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list.edit', [
      'ui.router',
      'ngMaterial',
      '<%= scriptAppName %>.mongooseError',
      '<%= scriptAppName %>.<%= moduleName %>.service'
    ])
    .config(configure<%= classedName %>ListEdit);

  // inject config<%= classedName %>ListEdit dependencies
  configure<%= classedName %>ListEdit.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the <%= moduleName %>.list.edit state with the edit template
   * paired with the <%= classedName %>EditController as 'edit' for the
   * 'detail@<%= moduleName %>.list' view.
   * '<%= cameledName %>' is resolved as the <%= cameledName %> with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configure<%= classedName %>ListEdit($stateProvider) {
    // The edit state configuration.
    var editState = {
      name: '<%= moduleName %>.list.edit',
      parent: '<%= moduleName %>.list',
      url: '/edit/:id',<% if (secure) {%>
      authenticate: true,
      role: '<%= role %>',<%}%>
      onEnter: onEnter<%= classedName %>ListEdit,
      views: {
        'detail@<%= moduleName %>.list': {
          templateUrl: '<%= listEditHtmlUrl %>',
          controller: '<%= classedName %>EditController',
          controllerAs: 'edit',
          resolve: {<%= cameledName %>: resolve<%= classedName %>FromArray}
        }
      }
    };

    $stateProvider.state(editState);
  }

  // inject on<%= classedName %>ListEditEnter dependencies
  onEnter<%= classedName %>ListEdit.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the <%= moduleName %>.list.detail state. Open the component
   * registered with the component id '<%= moduleName %>.detailView'.
   *
   * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnter<%= classedName %>ListEdit($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('<%= moduleName %>.detailView').open();
    }
  }

  // inject resolve<%= classedName %>DetailRoute dependencies
  resolve<%= classedName %>FromArray.$inject = ['<%= cameledName %>s', '$stateParams', '_'];

  /**
   * Resolve dependencies for the <%= moduleName %>.list.edit state. Get the <%= cameledName %>
   * from the injected Array of <%= cameledName %>s by using the '_id' property.
   *
   * @params {Array} <%= cameledName %>s - The array of <%= cameledName %>s
   * @params {Object} $stateParams - The $stateParams to read the <%= cameledName %> id from
   * @params {Object} _ - The lodash service to find the requested <%= cameledName %>
   * @returns {Object|null} The <%= cameledName %> whose value of the _id property equals $stateParams._id
   */
  function resolve<%= classedName %>FromArray(<%= cameledName %>s, $stateParams, _) {
    //  return <%= classedName%>.get({id: $stateParams.id}).$promise;
    return _.find(<%= cameledName %>s, {'_id': $stateParams.id});
  }

})();
