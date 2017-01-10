(function () {
  'use strict';

  angular
      .module('flysat')
      .controller('InputCtrl', InputCtrl);

  /** @ngInject */
  function InputCtrl() {
    var vm = this;
    console.log(vm)
  }
})();
