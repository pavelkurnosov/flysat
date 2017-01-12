(function () {
    'use strict';

    angular
        .module('flysat')
        .controller('HotbirdCtrl', HotbirdCtrl);

    /** @ngInject */
    function HotbirdCtrl($http, ServerURL) {
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
