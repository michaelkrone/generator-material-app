(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc.service module.
   * Register the clientModelDoc resource as ClientModelDoc, register the
   * service as ClientModelDocService.
   *
   * @requires {<%= scriptAppName %>.resource}
   */
  angular
    .module('<%= scriptAppName %>.clientModelDoc.service', ['<%= scriptAppName %>.resource'])
    .factory('ClientModelDoc', ClientModelDoc)
    .service('ClientModelDocService', ClientModelDocService)
    .factory('ClientModelDocDefinition', ClientModelDocDefinition);

  // add ClientModelDoc dependencies to inject
  ClientModelDoc.$inject = ['Resource'];

  /**
   * ClientModelDoc resource constructor
   */
  function ClientModelDoc($resource) {
    // factory members
    var apiURL = '/api/clientModelDocs';
    // public API
    return $resource(apiURL + '/:id/:controller');
  }

  // add ClientModelDocService dependencies to inject
  ClientModelDocService.$inject = ['ClientModelDoc'];

  /**
   * ClientModelDocService constructor
   * AngularJS will instantiate a singleton by calling "new" on this function
   *
   * @param {$resource} ClientModelDoc The resource provided by <%= scriptAppName %>.clientModelDoc.resource
   * @returns {Object} The service definition for the ClientModelDocService service
   */
  function ClientModelDocService(ClientModelDoc) {

    return {
      create: create,
      update: update,
      remove: remove
    };

    /**
     * Save a new clientModelDoc
     *
     * @param  {Object}   clientModelDoc - clientModelDocData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(clientModelDoc, callback) {
      var cb = callback || angular.noop;

      return ClientModelDoc.create(clientModelDoc,
        function (clientModelDoc) {
          return cb(clientModelDoc);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Remove a clientModelDoc
     *
     * @param  {Object}   clientModelDoc - clientModelDocData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function remove(clientModelDoc, callback) {
      var cb = callback || angular.noop;

      return ClientModelDoc.remove({id: clientModelDoc._id},
        function (clientModelDoc) {
          return cb(clientModelDoc);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Create a new clientModelDoc
     *
     * @param  {Object}   clientModelDoc - clientModelDocData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(clientModelDoc, callback) {
      var cb = callback || angular.noop;

      return ClientModelDoc.update(clientModelDoc,
        function (clientModelDoc) {
          return cb(clientModelDoc);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }
  };

  // add ClientModelDocDefinition dependencies to inject
  ClientModelDocDefinition.$inject = ['ModelDefinitions', 'User', 'ClientModelDoc'];
  function ClientModelDocDefinition (ModelDefinitions, User, ClientModelDoc) {
    var typeMap = {
      User: User,
      ClientModelDoc: ClientModelDoc
    };

    return ModelDefinitions({
      name: {type: 'text', required: true},
      user: {
        type: 'select/resource',
        resource: User
      },
      rootUser: {
        type: 'select/resource',
        resource: User,
        params: {
          role: 'root'
        },
        displayKey: 'role'
      },
      anyType: {
        type: 'select',
        options: ['User', 'ClientModelDoc']
      },
      anyTypeRef: {
        type: 'select',
        getOptions: function(model) {
          var resource = typeMap[model.anyType];
          if (!resource || !resource.query) return $q.when([]);
          return resource.query().$promise;
        },
        displayKey: 'name',
        valueKey: '_id'
      },
      important: 'text',
      notImportant: {
        type: 'text',
        desc: 'Not Important',
        displayPriority: 'low'
      },
      nested: {
        name: 'text',
        firstName: {
          type: 'text',
          desc: 'First Name'
        }
      },
      info: 'text',
      //active: 'boolean'
    });
  }
})();
