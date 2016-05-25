(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc.list.detail submodule
   * and configure it.
   *
   * @requires ui.router
   * @requires angularMoment
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.list.detail', [
      'ui.router',
      'angularMoment'
    ])
    .config(configureClientModelDocListDetail);

  // inject configClientModelDocRoutes dependencies
  configureClientModelDocListDetail.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'clientModelDoc.detail' state with the detail template
   * paired with the ClientModelDocDetailController as 'detail' for the
   * 'sidenav' sub view.
   * 'clientModelDoc' is resolved as the clientModelDoc with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureClientModelDocListDetail($stateProvider) {
    // The detail state configuration
    var detailState = {
      name: 'clientModelDoc.list.detail',
      parent: 'clientModelDoc.list',
      url: '/:id',
      authenticate: true,
      role: 'admin',
      onEnter: onEnterClientModelDocListDetail,
      views: {
        'detail@clientModelDoc.list': {
          templateUrl: 'app/clientModelDoc/list/detail/detail.html',
          controller: 'ClientModelDocDetailController',
          controllerAs: 'detail',
          resolve: {clientModelDoc: resolveClientModelDocFromArray}
        }
      }
    };

    $stateProvider.state(detailState);
  }

  // inject onClientModelDocListDetailEnter dependencies
  onEnterClientModelDocListDetail.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the clientModelDoc.list.detail state. Open the component
   * registered with the component id 'clientModelDoc.detailView'.
   *
    * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterClientModelDocListDetail($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('clientModelDoc.detailView').open();
    }
  }

  // inject resolveClientModelDocFromArray dependencies
  resolveClientModelDocFromArray.$inject = ['clientModelDocs', '$stateParams', '_'];

  /**
   * Resolve dependencies for the clientModelDoc.detail state
   *
   * @params {Array} clientModelDocs - The array of clientModelDocs
   * @params {Object} $stateParams - The $stateParams to read the clientModelDoc id from
   * @returns {Object|null} The clientModelDoc whose value of the _id property equals $stateParams._id
   */
  function resolveClientModelDocFromArray(clientModelDocs, $stateParams, _) {
    return _.find(clientModelDocs, {'_id': $stateParams.id});
  }

})();
