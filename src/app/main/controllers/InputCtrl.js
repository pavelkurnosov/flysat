(function () {
    'use strict';

    angular.module('flysat')
        .controller('InputController', InputController)
        .controller('DataformController', DataformController);

    /** @ngInject */
    function InputController($http, $uibModal, ServerURL) {
        var vm = this;

        vm.modal = {};
        vm.tableData = [];
        vm.currRowId = 0;
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
        vm.rowsInOnePage = 10;

        vm.onTabSelect = function (tabId) {
            vm.currTab = tabId;
            vm.getData();
        };

        vm.onPaginationChange = function () {
            vm.getData();
        };

        vm.getData = function () {
            vm.tableData = {};
            $http.get(ServerURL + vm.currTab + "-get&p=" + vm.currTablePage).then(function (response) {     // getting table data.
                vm.tableData = response.data;
            });
            $http.get(ServerURL + vm.currTab + "-getcount").then(function (response) {      // setting all pages count.
                vm.allTablePages = response.data['total_rows'];
            });
        };

        vm.saveData = function (data) {
            var url = ServerURL + vm.currTab + "-save";
            if (vm.currRowId * 1) url += '&id=' + vm.currRowId;

            var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
            $http.post(url, data, config)
                .then(function () {
                    vm.getData();
                    vm.modal.close();
                });
        }

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
                    },
                    currRowId: function () {
                        return vm.currRowId;
                    }
                }
            });

            vm.modal.result.then(function () {  // originally used selectedItem for parameter.
                vm.currRowId = 0;
            }, function () {
                vm.currRowId = 0;
            });
        };
    }
})();

function DataformController($scope, parentScope, currRowId) {
    $scope.countries = ['Afghanistan', 'Albania', 'Algeria', 'American_Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua_and_Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'British_Virgin_Islands', 'Brunei', 'Bulgaria', 'Burkina_Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape_Verde', 'Cayman_Islands', 'Central_African_Republic', 'Chad', 'Chile', 'China', 'Christmas_Island', 'Colombia', 'Comoros', 'Cook_Islands', 'Costa_Rica', 'Croatia', 'Cuba', 'Cyprus', 'Cyprus_Northern', 'Czech_Republic', 'Democratic_Republic_of_the_Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican_Republic', 'Ecuador', 'Egypt', 'El_Salvador', 'Equatorial_Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland_Islands', 'Faroe_Islands', 'Fiji', 'Finland', 'France', 'French_Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guinea', 'Guinea_Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong_Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall_Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands_Antilles', 'New_Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk_Island', 'North_Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua_New_Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn_Islands', 'Poland', 'Portugal', 'Puerto_Rico', 'Qatar', 'Republic_of_the_Congo', 'Romania', 'Russian_Federation', 'Rwanda', 'Saint_Kitts_and_Nevis', 'Saint_Lucia', 'Saint_Pierre', 'Saint_Vicent_and_the_Grenadines', 'Samoa', 'San_Marino', 'Sao_Tomé_and_Príncipe', 'Saudi_Arabia', 'Senegal', 'Serbia_and_Montenegro', 'Seychelles', 'Sierra_Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Soloman_Islands', 'Somalia', 'South_Africa', 'South_Georgia', 'South_Korea', 'Soviet_Union', 'Spain', 'Sri_Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Tibet', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad_and_Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks_and_Caicos_Islands', 'Tuvalu', 'UAE', 'Uganda', 'Ukraine', 'United_Kingdom', 'United_States_of_America', 'Uruguay', 'US_Virgin_Islands', 'Uzbekistan', 'Vanuatu', 'Vatican_City', 'Venezuela', 'Vietnam', 'Wallis_and_Futuna', 'Yemen', 'Zambia', 'Zimbabwe'];

    for (var i in parentScope.tableData) {
        if (parentScope.tableData[i]['id'] == currRowId) {
            $scope.data = parentScope.tableData[i];
            break;
        }
    }

    $scope.save = function () {
        parentScope.saveData($scope.data);
    };

    $scope.close = function () {
        parentScope.modal.close();
    }
}