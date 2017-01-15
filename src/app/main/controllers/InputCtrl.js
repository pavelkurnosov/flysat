(function () {
    'use strict';

    angular.module('flysat')
        .controller('InputController', InputController)
        .controller('DataformController', DataformController)
        .controller('BeamformController', BeamformController)
        .controller('ApidformController', ApidformController);

    /** @ngInject */
    function InputController($http, $uibModal, ServerURL) {
        var vm = this;

        vm.modal = {};
        vm.beamModal = {};
        vm.apidModal = {};
        vm.tableData = [];
        vm.currRowId = 0;
        vm.currBeamId = 0;
        vm.currApidId = 0;
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
        vm.frequencies = {};

        // vm.countries = ['Afghanistan', 'Albania', 'Algeria', 'American_Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua_and_Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'British_Virgin_Islands', 'Brunei', 'Bulgaria', 'Burkina_Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape_Verde', 'Cayman_Islands', 'Central_African_Republic', 'Chad', 'Chile', 'China', 'Christmas_Island', 'Colombia', 'Comoros', 'Cook_Islands', 'Costa_Rica', 'Croatia', 'Cuba', 'Cyprus', 'Cyprus_Northern', 'Czech_Republic', 'Democratic_Republic_of_the_Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican_Republic', 'Ecuador', 'Egypt', 'El_Salvador', 'Equatorial_Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland_Islands', 'Faroe_Islands', 'Fiji', 'Finland', 'France', 'French_Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guinea', 'Guinea_Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong_Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall_Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands_Antilles', 'New_Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk_Island', 'North_Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua_New_Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn_Islands', 'Poland', 'Portugal', 'Puerto_Rico', 'Qatar', 'Republic_of_the_Congo', 'Romania', 'Russian_Federation', 'Rwanda', 'Saint_Kitts_and_Nevis', 'Saint_Lucia', 'Saint_Pierre', 'Saint_Vicent_and_the_Grenadines', 'Samoa', 'San_Marino', 'Sao_Tomé_and_Príncipe', 'Saudi_Arabia', 'Senegal', 'Serbia_and_Montenegro', 'Seychelles', 'Sierra_Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Soloman_Islands', 'Somalia', 'South_Africa', 'South_Georgia', 'South_Korea', 'Soviet_Union', 'Spain', 'Sri_Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Tibet', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad_and_Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks_and_Caicos_Islands', 'Tuvalu', 'UAE', 'Uganda', 'Ukraine', 'United_Kingdom', 'United_States_of_America', 'Uruguay', 'US_Virgin_Islands', 'Uzbekistan', 'Vanuatu', 'Vatican_City', 'Venezuela', 'Vietnam', 'Wallis_and_Futuna', 'Yemen', 'Zambia', 'Zimbabwe'];
        vm.countries = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Colombia', 'Comoros', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Cyprus Northern', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Republic of the Congo', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre', 'Saint Vicent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Soloman Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Soviet Union', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Tibet', 'Timor Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'UAE', 'Uganda', 'Ukraine', 'United Kingdom', 'United States of America', 'Uruguay', 'US Virgin Islands', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Wallis and Futuna', 'Yemen', 'Zambia', 'Zimbabwe'];
        vm.sateStatuses = [];
        vm.bands = [];
        vm.fecs = [];
        vm.modulations = [];
        vm.polarizations = [];
        vm.fformats = [];
        vm.freqStatuses = [];
        vm.channelTypes = [];
        vm.channelStatuses = [];

        vm.onTabSelect = function (tabId) {
            if (tabId == 'channels') {
                vm.getFrequencies();
            }
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
        vm.getFrequencies = function () {
            $http.get(ServerURL + "getfreqcombo").then(function (response) {     // get all frequencies data.
                vm.frequencies = response.data;
            });
        };
        vm.getData = function () {
            vm.tableData = {};
            $http.get(ServerURL + vm.currTab + "-get&p=" + vm.currTablePage).then(function (response) {     // getting table data.
                vm.tableData = response.data;
                vm.resetAllComboData();
                if (vm.currTab == 'frequencies' || vm.currTab == 'channels') {
                    for (var t in vm.tableData) {
                        vm.tableData[t]['date_added'] = new Date(vm.tableData[t]['date_added']);
                    }
                }
            });
            $http.get(ServerURL + vm.currTab + "-getcount").then(function (response) {      // setting all pages count.
                vm.allTablePages = response.data['total_rows'];
            });
        };
        vm.resetAllComboData = function () {
            $http.get(ServerURL + "getallcombolist").then(function (response) {     // getting data for all combos in the data input form.
                vm.sateStatuses = response.data.satellites.status;
                vm.bands = response.data.frequencies.band;
                vm.fecs = response.data.frequencies.fec;
                vm.fformats = response.data.frequencies.fformats;
                vm.modulations = response.data.frequencies.modulation;
                vm.polarizations = response.data.frequencies.polarizations;
                vm.freqStatuses = response.data.frequencies.status;
                vm.channelTypes = response.data.channels.channel_type;
                vm.channelStatuses = response.data.channels.status;
            });
        };

        vm.saveData = function (data) {
            var url = ServerURL + vm.currTab + "-save";
            if (vm.currRowId * 1) url += '&id=' + vm.currRowId;

            var newData = {};
            for (var d in data) {
                if (d == 'date_added') {    // applying date object into date columms. (will be ran in frequencies and channel pages only.)
                    if (!data[d]) {
                        newData[d] = '';
                    } else {
                        newData[d] = data[d].getFullYear() + '-' + (data[d].getMonth() + 1) + '-' + data[d].getDate();
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
        vm.saveApidLang = function (data) {
            var url = ServerURL + "apid-save";
            if (vm.currApidId * 1) url += '&id=' + vm.currApidId;

            data['channel_id'] = vm.currRowId;
            $http.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
                .then(function () {
                    vm.getData();
                    vm.apidModal.close();
                });
        };
        vm.deleteApidLang = function () {
            if (vm.currApidId * 1) {
                if (confirm('Are you sure want to delete this language?')) {
                    $http.get(ServerURL + "apid-delete&id=" + vm.currApidId)
                        .then(function () {
                            vm.getData();
                            vm.apidModal.close();
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
        vm.openApidModal = function (channelId, apidId) {
            vm.currRowId = channelId;
            vm.currApidId = apidId;

            vm.apidModal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'apid_form.html',
                controller: 'ApidformController',
                controllerAs: 'modal',
                size: 'lg',
                resolve: {
                    parentScope: function () {
                        return vm;
                    }
                }
            });

            vm.apidModal.result.then(function () {  // originally used selectedItem for parameter.
                vm.currApidId = 0;
            }, function () {
                vm.currApidId = 0;
            });
        };
    }
})();

function DataformController($scope, parentScope) {
    $scope.sateStatuses = parentScope.sateStatuses;
    $scope.freqStatuses = parentScope.freqStatuses;
    $scope.channelStatuses = parentScope.channelStatuses;
    $scope.bands = parentScope.bands;
    $scope.countries = parentScope.countries;
    $scope.satellites = parentScope.satellites;
    $scope.fecs = parentScope.fecs;
    $scope.modulations = parentScope.modulations;
    $scope.polarizations = parentScope.polarizations;
    $scope.fformats = parentScope.fformats;
    $scope.channelTypes = parentScope.channelTypes;
    $scope.frequencies = parentScope.frequencies;

    if (parentScope.currRowId > 0) {
        $scope.data = parentScope.tableData[parentScope.currRowId];
    } else {
        $scope.data = {};
        if (parentScope.currTab == 'frequencies' || parentScope.currTab == 'channels') {
            $scope.data.date_added = new Date();
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

function ApidformController($scope, parentScope) {  // for A.PID Language form.
    $scope.data = parentScope.tableData[parentScope.currRowId]['a_pid_lang'][parentScope.currApidId];

    $scope.add = function () {
        parentScope.currApidId = 0;
        $scope.data = {id: 0, apid_name: '', link: ''};
    };

    $scope.save = function () {
        parentScope.saveApidLang($scope.data);
    };
    $scope.delete = function () {
        parentScope.deleteApidLang();
    };

    $scope.close = function () {
        parentScope.apidModal.close();
    };
}