(function() {
  'use strict';

  angular
    .module('flysat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
