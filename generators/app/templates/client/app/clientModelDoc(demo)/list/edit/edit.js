(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc.list.edit module
   * and configure it.
   *
   * @requires 'ui.router',
   * @requires 'ngMaterial',
   * @requires <%= scriptAppName %>.mongooseError
   * @requires <%= scriptAppName %>.clientModelDoc.service
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.list.edit', [
      'ui.router',
      'ngMaterial',
      '<%= scriptAppName %>.mongooseError',
      '<%= scriptAppName %>.clientModelDoc.service'
    ])
    .config(configureClientModelDocListEdit);

  // inject configClientModelDocListEdit dependencies
  configureClientModelDocListEdit.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the clientModelDoc.list.edit state with the edit template
   * paired with the ClientModelDocEditController as 'edit' for the
   * 'detail@clientModelDoc.list' view.
   * 'clientModelDoc' is resolved as the clientModelDoc with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureClientModelDocListEdit($stateProvider) {
    // The edit state configuration.
    var editState = {
      name: 'clientModelDoc.list.edit',
      parent: 'clientModelDoc.list',
      url: '/edit/:id',
      authenticate: true,
      role: 'admin',
      onEnter: onEnterClientModelDocListEdit,
      views: {
        'detail@clientModelDoc.list': {
          templateUrl: 'app/clientModelDoc/list/edit/edit.html',
          controller: 'ClientModelDocEditController',
          controllerAs: 'edit',
          resolve: {clientModelDoc: resolveClientModelDocFromArray}
        }
      }
    };

    $stateProvider.state(editState);
  }

  // inject onClientModelDocListEditEnter dependencies
  onEnterClientModelDocListEdit.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the clientModelDoc.list.detail state. Open the component
   * registered with the component id 'clientModelDoc.detailView'.
   *
   * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterClientModelDocListEdit($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('clientModelDoc.detailView').open();
    }
  }

  // inject resolveClientModelDocDetailRoute dependencies
  resolveClientModelDocFromArray.$inject = ['clientModelDocs', '$stateParams', '_'];

  /**
   * Resolve dependencies for the clientModelDoc.list.edit state. Get the clientModelDoc
   * from the injected Array of clientModelDocs by using the '_id' property.
   *
   * @params {Array} clientModelDocs - The array of clientModelDocs
   * @params {Object} $stateParams - The $stateParams to read the clientModelDoc id from
   * @params {Object} _ - The lodash service to find the requested clientModelDoc
   * @returns {Object|null} The clientModelDoc whose value of the _id property equals $stateParams._id
   */
  function resolveClientModelDocFromArray(clientModelDocs, $stateParams, _) {
    //  return ClientModelDoc.get({id: $stateParams.id}).$promise;
    return _.find(clientModelDocs, {'_id': $stateParams.id});
  }

})();
