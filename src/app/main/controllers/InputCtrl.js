(function () {
    'use strict';

    angular.module('flysat')
        .controller('InputController', InputController)
        .controller('DataformController', DataformController)
        .controller('BeamformController', BeamformController);

    /** @ngInject */
    function InputController($http, $uibModal, ServerURL) {
        var vm = this;

        vm.modal = {};
        vm.beamModal = {};
        vm.countries = ['Afghanistan', 'Albania', 'Algeria', 'American_Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua_and_Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'British_Virgin_Islands', 'Brunei', 'Bulgaria', 'Burkina_Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape_Verde', 'Cayman_Islands', 'Central_African_Republic', 'Chad', 'Chile', 'China', 'Christmas_Island', 'Colombia', 'Comoros', 'Cook_Islands', 'Costa_Rica', 'Croatia', 'Cuba', 'Cyprus', 'Cyprus_Northern', 'Czech_Republic', 'Democratic_Republic_of_the_Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican_Republic', 'Ecuador', 'Egypt', 'El_Salvador', 'Equatorial_Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland_Islands', 'Faroe_Islands', 'Fiji', 'Finland', 'France', 'French_Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guinea', 'Guinea_Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong_Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall_Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands_Antilles', 'New_Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk_Island', 'North_Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua_New_Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn_Islands', 'Poland', 'Portugal', 'Puerto_Rico', 'Qatar', 'Republic_of_the_Congo', 'Romania', 'Russian_Federation', 'Rwanda', 'Saint_Kitts_and_Nevis', 'Saint_Lucia', 'Saint_Pierre', 'Saint_Vicent_and_the_Grenadines', 'Samoa', 'San_Marino', 'Sao_Tomé_and_Príncipe', 'Saudi_Arabia', 'Senegal', 'Serbia_and_Montenegro', 'Seychelles', 'Sierra_Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Soloman_Islands', 'Somalia', 'South_Africa', 'South_Georgia', 'South_Korea', 'Soviet_Union', 'Spain', 'Sri_Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Tibet', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad_and_Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks_and_Caicos_Islands', 'Tuvalu', 'UAE', 'Uganda', 'Ukraine', 'United_Kingdom', 'United_States_of_America', 'Uruguay', 'US_Virgin_Islands', 'Uzbekistan', 'Vanuatu', 'Vatican_City', 'Venezuela', 'Vietnam', 'Wallis_and_Futuna', 'Yemen', 'Zambia', 'Zimbabwe'];
        vm.tableData = [];
        vm.currRowId = 0;
        vm.currBeamId = 0;
        vm.currTab = "satellites";
        vm.tabs = [
            {"id": "satellites", "heading": "Satellites", "active": true, "template": "app/main/views/tabs/satellites.html"},
            {"id": "frequencies", "heading": "Frequencies", "active": false, "template": "app/main/views/tabs/frequencies.html"},
            {"id": "channels", "heading": "Channels", "active": false, "template": "app/main/views/tabs/channels.html"},
            {"id": "packages", "heading": "Packages", "active": false, "template": "app/main/views/tabs/packages.html"},
            {"id": "infopages", "heading": "Info Pages", "active": false, "template": "app/main/views/tabs/infopages.html"}
        ];
        vm.allTablePages = 0;
        vm.currTablePage = 1;
        vm.itemsPerPage = 15;
        vm.satellites = {};

        vm.onTabSelect = function (tabId) {
            vm.currTab = tabId;
            vm.currTablePage = 1;
            vm.getData();
            vm.getSatellites();
        };

        vm.onPaginationChange = function () {
            vm.getData();
        };

        vm.getSatellites = function () {
            $http.get(ServerURL + "getsatecombo").then(function (response) {     // get all satellites data.
                vm.satellites = response.data;
            });
        };

        vm.getData = function () {
            vm.tableData = {};
            $http.get(ServerURL + vm.currTab + "-get&p=" + vm.currTablePage).then(function (response) {     // getting table data.
                vm.tableData = response.data;
                switch (vm.currTab) {
                    case 'satellites':
                        vm.initDateFields(['launch_date']);
                        break;
                    case 'frequencies':
                    case 'channels':
                        vm.initDateFields(['date_added']);
                        break;
                    default:
                }
            });
            $http.get(ServerURL + vm.currTab + "-getcount").then(function (response) {      // setting all pages count.
                vm.allTablePages = response.data['total_rows'];
            });
        };

        vm.saveData = function (data) {
            var url = ServerURL + vm.currTab + "-save";
            if (vm.currRowId * 1) url += '&id=' + vm.currRowId;

            var newData = {};
            for (var d in data) {
                if (typeof data[d] == 'object') {
                    if (angular.isFunction(data[d].getMonth)) {
                        newData[d] = data[d].getFullYear() + '-' + (data[d].getMonth() + 1) + '-' + data[d].getDate();
                    } else {
                        newData[d] = '';
                    }
                } else {
                    newData[d] = data[d];
                }
            }

            $http.post(url, newData, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
                .then(function () {
                    vm.getData();
                    vm.modal.close();
                });
        };

        vm.deleteData = function (id) {
            if (confirm('Are you sure want to delete this?')) {
                $http.get(ServerURL + vm.currTab + "-delete&id=" + id)
                    .then(function () {
                        vm.getData();
                    });
            }
        };

        vm.openModal = function (rowId) {
            vm.currRowId = rowId;

            vm.modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: vm.currTab + '_form.html',
                controller: 'DataformController',
                controllerAs: 'modal',
                size: 'lg',
                resolve: {
                    parentScope: function () {
                        return vm;
                    }
                }
            });

            vm.modal.result.then(function () {  // originally used selectedItem for parameter.
                vm.currRowId = 0;
            }, function () {
                vm.currRowId = 0;
            });
        };

        vm.saveBeam = function (data) {
            var url = ServerURL + "beam-save";
            if (vm.currBeamId * 1) url += '&id=' + vm.currBeamId;

            data['sate_id'] = vm.currRowId;
            $http.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
                .then(function () {
                    vm.getData();
                    vm.beamModal.close();
                });
        };

        vm.deleteBeam = function () {
            if (vm.currBeamId * 1) {
                if (confirm('Are you sure want to delete this beam?')) {
                    $http.get(ServerURL + "beam-delete&id=" + vm.currBeamId)
                        .then(function () {
                            vm.getData();
                            vm.beamModal.close();
                        });
                }
            }
        };

        vm.openBeamModal = function (sateId, beamId) {
            vm.currRowId = sateId;
            vm.currBeamId = beamId;

            vm.beamModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'beam_form.html',
                controller: 'BeamformController',
                controllerAs: 'modal',
                size: 'lg',
                resolve: {
                    parentScope: function () {
                        return vm;
                    }
                }
            });

            vm.beamModal.result.then(function () {  // originally used selectedItem for parameter.
                vm.currBeamId = 0;
            }, function () {
                vm.currBeamId = 0;
            });
        };

        vm.initDateFields = function (fields) {
            for (var t in vm.tableData) {
                for (var f in fields) {
                    vm.tableData[t][fields[f]] = new Date(vm.tableData[t][fields[f]]);
                }
            }
        };
    }
})();

function DataformController($scope, parentScope) {
    $scope.countries = parentScope.countries;
    $scope.satellites = parentScope.satellites;

    for (var i in parentScope.tableData) {
        if (parentScope.tableData[i]['id'] == parentScope.currRowId) {
            $scope.data = parentScope.tableData[i];
            break;
        }
    }

    $scope.save = function () {
        parentScope.saveData($scope.data);
    };

    $scope.close = function () {
        parentScope.modal.close();
    };
}

function BeamformController($scope, parentScope) {
    $scope.data = parentScope.tableData[parentScope.currRowId]['beams'][parentScope.currBeamId];

    $scope.add = function () {
        parentScope.currBeamId = 0;
        $scope.data = {id: 0, beam_name: '', link: ''};
    };

    $scope.save = function () {
        parentScope.saveBeam($scope.data);
    };
    $scope.delete = function () {
        parentScope.deleteBeam();
    };

    $scope.close = function () {
        parentScope.beamModal.close();
    };
}