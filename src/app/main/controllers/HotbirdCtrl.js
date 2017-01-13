(function () {
    'use strict';

    angular
        .module('flysat')
        .controller('HotbirdController', HotbirdController);

    /** @ngInject */
    function HotbirdController($http, ServerURL) {
        var vm = this;
        vm.tableData = [];

        vm.getData = function () {
            $http.get(ServerURL + "get_table_data")
                .then(function (response) {
                    vm.tableData = response.data;
                });
        };
        vm.getData();
    }
})();
