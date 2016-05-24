(function () {
  'use strict';

  // register the controller as <%= classedName %>Controller
  angular
    .module('<%= scriptAppName %>.<%= moduleName %>')
    .controller('<%= classedName %>Controller', <%= classedName %>Controller);

  /**
   * add <%= classedName %>Controller dependencies to inject
   * @param {Service} <%= modelName %>Definition The model definition of <%= modelName %> resource
   */
  <%= classedName %>Controller.$inject = ['ModelDefinitions', '<%= modelName %>Definition'];

  /**
   * <%= classedName %>Controller constructor. Main controller for the <%= scriptAppName %>.<%= moduleName %>
   * module.
   *
   * @param {$scope} $scope - The scope to listen for events<% if(features.socketio) { %>
   * @param {socket.io} socket - The socket to register updates<% } %>
   */
  function <%= classedName %>Controller(ModelDefinitions, <%= modelName %>Definition) {
    var vm = this;

    vm.ModelDefinitions = ModelDefinitions;
    vm.<%= cameledName %>Definition = <%= modelName %>Definition;
  }

})();
