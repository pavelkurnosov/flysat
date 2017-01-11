(function () {
    'use strict';

    angular.module('flysat')
        .controller('InputCtrl', InputCtrl)
        .controller('DataformCtrl', DataformCtrl);

    /** @ngInject */
    function InputCtrl($http, $rootScope, $uibModal, ServerURL) {
        console.log(ServerURL)
        var vm = this;
        vm.modal = {};
        vm.tableData = [];
        vm.currRowId = 0;
        vm.currData = {};

        vm.getData = function () {
            $http.get(ServerUrl + "get_table_data")
                .then(function (response) {
                    vm.tableData = response.data;
                });
        };
        vm.getData();

        vm.saveData = function (data) {
            var url = $rootScope.serverUrl + "add_table_data";
            if (vm.currRowId * 1) url += '&id=' + vm.currRowId;

            var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
            $http.post(url, data, config)
                .then(function (response) {
                    vm.getData();
                    vm.modal.close();
                });
        }

        vm.deleteData = function (id) {
            if (confirm('Are you sure want to delete this?')) {
                $http.get($rootScope.serverUrl + "delete_table_data&id=" + id)
                    .then(function (response) {
                        vm.getData();
                    });
            }
        };

        vm.openModal = function (rowId) {
            vm.currRowId = rowId;
            if (rowId * 1) {
                for (var i in vm.tableData) {
                    if (vm.tableData[i]['id'] == rowId) {
                        vm.currData = vm.tableData[i];
                        break;
                    }
                }
            } else {
                vm.currData = {
                    'txp_no': '',
                    'source': '',
                    'date_val': '',
                    'freq_pol': '',
                    'mode': '',
                    'sr_fec': '',
                    'channel_name': '',
                    'web': '',
                    'v_pid': '',
                    'a_pid': '',
                    'language': '',
                    'sid': '',
                    'code': '',
                    'foot_prints': '',
                    'comments': '',
                    'country': 'United_Kingdom'
                };
            }
            vm.modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'dataform.html',
                controller: 'DataformCtrl',
                controllerAs: 'modal',
                size: 'lg',
                resolve: {
                    parentScope : function () {
                        return vm;
                    },
                    currData : function () {
                        return vm.currData;
                    }
                }
            });

            vm.modal.result.then(function (selectedItem) {
                vm.currRowId = 0;
            }, function () {
                vm.currRowId = 0;
            });
        };
    }

    function DataformCtrl($scope, parentScope, currData) {
        $scope.countries = ['Afghanistan','Albania','Algeria','American_Samoa','Andorra','Angola','Anguilla','Antigua_and_Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia','Botswana','Brazil','British_Virgin_Islands','Brunei','Bulgaria','Burkina_Faso','Burundi','Cambodia','Cameroon','Canada','Cape_Verde','Cayman_Islands','Central_African_Republic','Chad','Chile','China','Christmas_Island','Colombia','Comoros','Cook_Islands','Costa_Rica','Croatia','Cuba','Cyprus','Cyprus_Northern','Czech_Republic','Democratic_Republic_of_the_Congo','Denmark','Djibouti','Dominica','Dominican_Republic','Ecuador','Egypt','El_Salvador','Equatorial_Guinea','Eritrea','Estonia','Ethiopia','Falkland_Islands','Faroe_Islands','Fiji','Finland','France','French_Polynesia','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guam','Guatemala','Guinea','Guinea_Bissau','Guyana','Haiti','Honduras','Hong_Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macao','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall_Islands','Martinique','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montserrat','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','Netherlands_Antilles','New_Zealand','Nicaragua','Niger','Nigeria','Niue','Norfolk_Island','North_Korea','Norway','Oman','Pakistan','Palau','Panama','Papua_New_Guinea','Paraguay','Peru','Philippines','Pitcairn_Islands','Poland','Portugal','Puerto_Rico','Qatar','Republic_of_the_Congo','Romania','Russian_Federation','Rwanda','Saint_Kitts_and_Nevis','Saint_Lucia','Saint_Pierre','Saint_Vicent_and_the_Grenadines','Samoa','San_Marino','Sao_Tomé_and_Príncipe','Saudi_Arabia','Senegal','Serbia_and_Montenegro','Seychelles','Sierra_Leone','Singapore','Slovakia','Slovenia','Soloman_Islands','Somalia','South_Africa','South_Georgia','South_Korea','Soviet_Union','Spain','Sri_Lanka','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Tibet','Timor-Leste','Togo','Tonga','Trinidad_and_Tobago','Tunisia','Turkey','Turkmenistan','Turks_and_Caicos_Islands','Tuvalu','UAE','Uganda','Ukraine','United_Kingdom','United_States_of_America','Uruguay','US_Virgin_Islands','Uzbekistan','Vanuatu','Vatican_City','Venezuela','Vietnam','Wallis_and_Futuna','Yemen','Zambia','Zimbabwe'];
        $scope.data = currData;

        $scope.save = function () {
            if ($scope.data.txp_no != '') {
                parentScope.saveData($scope.data);
            }
        };

        $scope.close = function () {
            parentScope.modal.close();
        }
    };
})();
