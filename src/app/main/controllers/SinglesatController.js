(function () {
    'use strict';

    angular
        .module('flysat')
        .controller('SinglesatController', SinglesatController);

    /** @ngInject */
    function SinglesatController($http, ServerURL) {
        var vm = this;
        vm.tableData = [];
        vm.rowspans = {};
        vm.getData = function () {
            $http.get(ServerURL + "singlesat")
                .then(function (response) {
                    vm.tableData = response.data;
                    for (var t in vm.tableData) {
                        if (isNaN(vm.rowspans[vm.tableData[t].sate_id])) vm.rowspans[vm.tableData[t].sate_id] = 0;
                        vm.rowspans[vm.tableData[t].sate_id] ++;
                    }
                });
        };
        vm.getData();
    }
})();
