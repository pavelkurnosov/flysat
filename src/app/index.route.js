(function () {
    'use strict';

    angular
        .module('flysat')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/views/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('hotbird', {
                url: '/hotbird',
                templateUrl: 'app/main/views/hotbird.html',
                controller: 'HotbirdController',
                controllerAs: 'vm'
            })
            .state('input', {
                url: '/input',
                templateUrl: 'app/main/views/input.html',
                controller: 'InputController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
