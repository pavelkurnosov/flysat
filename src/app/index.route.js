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
            .state('input', {
                url: '/input',
                templateUrl: 'app/main/views/input.html',
                controller: 'InputController',
                controllerAs: 'vm'
            })
            .state('singlesat', {
                url: '/singlesat',
                templateUrl: 'app/main/views/singlesat.html',
                controller: 'SinglesatController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
