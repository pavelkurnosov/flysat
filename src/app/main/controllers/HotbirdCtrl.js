(function () {
  'use strict';

  angular
      .module('flysat')
      .controller('HotbirdCtrl', HotbirdCtrl);

  /** @ngInject */
  function HotbirdCtrl() {
    var vm = this;
    console.log(vm)
  }
})();
