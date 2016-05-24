(function () {
  'use strict';

  /**
   * Register the list controller as <%= classedName %>ListController
   */
  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list')
    .controller('<%= classedName %>ListController', <%= classedName %>ListController);

  // add <%= classedName %>ListController dependencies to inject
  <%= classedName %>ListController.$inject = [<% if(features.socketio) { %>'$scope', 'socket', <% } %>'$state', '<%= cameledName %>s', 'ToggleComponent'];

  /**
   * <%= classedName %>ListController constructor
   *<% if(features.socketio) { %>
   * @param {Object} $scope - The current scope
   * @param {Object} socket - The socket service to register to<% }%>
   * @param {$state} $state - The $state to activate routing states on
   * @param {Array} <%= cameledName %>s - The list of <%= cameledName %>s resolved for this route
   * @param {Service} ToggleComponent - The service for switching the detail view
   */
  function <%= classedName %>ListController(<% if(features.socketio) { %>$scope, socket, <% }%>$state, <%= cameledName %>s, ToggleComponent) {
    var vm = this;

    // the array of <%= cameledName %>s
    vm.<%= cameledName %>s = <%= cameledName %>s;
    // toggle detail view
    vm.toggleDetails = toggleDetails;<% if(features.socketio) { %>

    // initialize the controller
    activate();

    /**
     * Register socket updates and unsync on scope $destroy event
     */
    function activate() {
      socket.syncUpdates('<%= syncUpdateUrl %>', vm.<%= cameledName %>s);
      $scope.$on('$destroy', unsync<%= classedName %>Updates);

      function unsync<%= classedName %>Updates() {
        socket.unsyncUpdates('<%= cameledName %>');
      }
    }<% } %>

    /**
     * Toggle the detail view
     */
    function toggleDetails() {
      ToggleComponent('<%= moduleName %>.detailView').toggle();
    }
  }

})();
