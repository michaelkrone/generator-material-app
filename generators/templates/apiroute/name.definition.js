/**
 * Created by stupid on 16-5-21.
 */
(function () {
  'use strict';

/**
 * Introduce the <%= scriptAppName %>.<%= moduleName %>.definition module.
 * Register the model definition of <%= modelName %> resource as <%= modelName %>Definition
 *
 */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.definition', [])
    .constant('<%= modelName %>Definition', {
      name: {type: 'text', required: true},
      info: 'text',
      // active: 'boolean'
    });
})();