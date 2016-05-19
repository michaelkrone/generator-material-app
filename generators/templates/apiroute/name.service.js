(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %>.service module.
   * Register the <%= name %> resource as <%= classedName %>, register the
   * service as <%= classedName %>Service.
   *
   * @requires {<%= scriptAppName %>.resource}
   */
  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.service', ['<%= scriptAppName %>.resource'])
    .factory('<%= classedName %>', <%= classedName %>)
    .service('<%= classedName %>Service', <%= classedName %>Service);

  // add <%= classedName %> dependencies to inject
  <%= classedName %>.$inject = ['Resource'];

  /**
   * <%= classedName %> resource constructor
   */
  function <%= classedName %>($resource) {
    // factory members
    var apiURL = '<%= apiURL%>';
    // public API
    return $resource(apiURL + '/:id/:controller');
  }

  // add <%= classedName %>Service dependencies to inject
  <%= classedName %>Service.$inject = ['<%= classedName %>'];

  /**
   * <%= classedName %>Service constructor
   * AngularJS will instantiate a singleton by calling "new" on this function
   *
   * @param {$resource} <%= classedName %> The resource provided by <%= scriptAppName %>.<%= moduleName %>.resource
   * @returns {Object} The service definition for the <%= classedName %>Service service
   */
  function <%= classedName %>Service(<%= classedName %>) {

    return {
      create: create,
      update: update,
      remove: remove
    };

    /**
     * Save a new <%= cameledName %>
     *
     * @param  {Object}   <%= cameledName %> - <%= cameledName %>Data
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(<%= cameledName %>, callback) {
      var cb = callback || angular.noop;

      return <%= classedName %>.create(<%= cameledName %>,
        function (<%= cameledName %>) {
          return cb(<%= cameledName %>);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Remove a <%= cameledName %>
     *
     * @param  {Object}   <%= cameledName %> - <%= cameledName %>Data
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function remove(<%= cameledName %>, callback) {
      var cb = callback || angular.noop;

      return <%= classedName %>.remove({id: <%= cameledName %>._id},
        function (<%= cameledName %>) {
          return cb(<%= cameledName %>);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Create a new <%= cameledName %>
     *
     * @param  {Object}   <%= cameledName %> - <%= cameledName %>Data
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(<%= cameledName %>, callback) {
      var cb = callback || angular.noop;

      return <%= classedName %>.update(<%= cameledName %>,
        function (<%= cameledName %>) {
          return cb(<%= cameledName %>);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }
  };
})();
