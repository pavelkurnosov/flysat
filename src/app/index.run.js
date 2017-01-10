(function() {
  'use strict';

  angular
    .module('flysat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {
    $rootScope.topMenuItems = [
      {id: '1', label: 'Home', url: '#home'},
      {id: '2', label: 'Sat News', url: '#hotbird'},
      {id: '3', label: 'Sat List', url: '#input'},
      {id: '4', label: 'Packages', url: '#packages'},
      {id: '5', label: 'HD TV', url: '#hd_tv'},
      {id: '6', label: 'UHD TV', url: '#uhd_tv'},
      {id: '7', label: '3D TV', url: '#3d_tv'},
      {id: '8', label: 'FTA TV', url: '#fta_tv'},
      {id: '9', label: 'Launches', url: '#launches'},
      {id: '10', label: 'Sat Info', url: '#sat_info'},
      {id: '11', label: 'Track', url: '#track'},
      {id: '12', label: 'Update Form', url: '#update_form'},
      {id: '13', label: 'Football', url: '#football'}
    ];

    $rootScope.currMenu = '1';

    $rootScope.serverUrl = 'http://localhost/fredy_fabrielo/controller.php?flag=';
  }

})();
