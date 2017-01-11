(function () {
    'use strict';

    angular.module('flysat')
        .controller('HomeCtrl', HomeCtrl);

    /** @ngInject */
    function HomeCtrl($http, ServerUrl) {
        console.log(ServerUrl)
        var vm = this;

        vm.sidebarItems = [{
            icon: "ion-android-home",
            level: 0,
            name: "english_menu",
            order: 0,
            stateRef: "english_menu",
            title: "MENU",
            subItems: [
                {level: 1, name: "english_menu1", order: 0, stateRef: "english_menu", subMenu: null, title: "Add To Your Site"},
                {level: 1, name: "english_menu2", order: 0, stateRef: "english_menu", subMenu: null, title: "FTA TV"},
                {level: 1, name: "english_menu3", order: 0, stateRef: "english_menu", subMenu: null, title: "Temporary FTA TV"},
                {level: 1, name: "english_menu4", order: 0, stateRef: "english_menu", subMenu: null, title: "Live TV Turkish"},
                {level: 1, name: "english_menu5", order: 0, stateRef: "english_menu", subMenu: null, title: "HD TV"},
                {level: 1, name: "english_menu6", order: 0, stateRef: "english_menu", subMenu: null, title: "3D TV"},
                {level: 1, name: "english_menu7", order: 0, stateRef: "english_menu", subMenu: null, title: "UHD TV"},
                {level: 1, name: "english_menu8", order: 0, stateRef: "english_menu", subMenu: null, title: "Track"},
                {level: 1, name: "english_menu9", order: 0, stateRef: "english_menu", subMenu: null, title: "Sat Info"},
                {level: 1, name: "english_menu10", order: 0, stateRef: "english_menu", subMenu: null, title: "Antenna Diameter"},
                {level: 1, name: "english_menu11", order: 0, stateRef: "english_menu", subMenu: null, title: "Receiver Codes"},
                {level: 1, name: "english_menu12", order: 0, stateRef: "english_menu", subMenu: null, title: "Send Frequency"},
                {level: 1, name: "english_menu13", order: 0, stateRef: "english_menu", subMenu: null, title: "Official Links"},
                {level: 1, name: "english_menu14", order: 0, stateRef: "english_menu", subMenu: null, title: "History of Sat"},
                {level: 1, name: "english_menu15", order: 0, stateRef: "english_menu", subMenu: null, title: "View from Sat"},
                {level: 1, name: "english_menu16", order: 0, stateRef: "english_menu", subMenu: null, title: "Links"},
                {level: 1, name: "english_menu17", order: 0, stateRef: "english_menu", subMenu: null, title: "Contact"}
            ]
        }, {
            icon: "ion-grid",
            level: 0,
            name: "recommended_sites",
            order: 0,
            stateRef: "recommended_sites",
            subItems: [
                {level: 1, name: "recommended_sites1", order: 0, stateRef: "recommended_sites", subMenu: null, title: "tvnews365.com"},
                {level: 1, name: "recommended_sites2", order: 0, stateRef: "recommended_sites", subMenu: null, title: "Kiralik vinc atasehir"},
                {level: 1, name: "recommended_sites3", order: 0, stateRef: "recommended_sites", subMenu: null, title: "Kadikoy Vinc"},
                {level: 1, name: "recommended_sites4", order: 0, stateRef: "recommended_sites", subMenu: null, title: "kiralik vincler"},
                {level: 1, name: "recommended_sites5", order: 0, stateRef: "recommended_sites", subMenu: null, title: "192.168.1.1"},
                {level: 1, name: "recommended_sites6", order: 0, stateRef: "recommended_sites", subMenu: null, title: "kredi karti"}
            ],
            title: "Recommended Sites"
        }];

        vm.tableData = [{
            title: 'Channels Update for 06.01.2017',
            cells: [
                {name: 'World Travel Channel', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A @ 42° East', band: '', package: '', note: 'C Band', state: 'left', country: 'United_Kingdom'},
                {name: 'Plus M', action: '', frequency: '(12303 V)', satellite: ' Hispasat @ 30° West', band: '', package: '', note: 'D Band', state: 'on', country: 'Turkey'},
                {name: 'Hazan TV', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A', band: '', package: 'NC+', note: 'Orange, Polsat', state: 'on', country: 'United_Kingdom'},
                {name: 'Dolunay Int', action: '', frequency: '(11558 V)', satellite: ' SES-6 @ 40.5° West', band: '', package: 'NC+', note: 'Orange, Polsat', state: 'return', country: 'Syria'},
                {name: 'Nurs', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A', band: '', package: '', note: 'D Band', state: 'on', country: 'United_Kingdom'},
                {name: 'Maya TV', action: '', frequency: '(11558 V)', satellite: ' SES-6 @ 40.5° West', band: '', package: '', note: 'C Band', state: 'return', country: 'Thailand'}
            ]
        }, {
            title: 'Channels Update for 05.01.2017',
            cells: [
                {name: 'Ber TV', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A', band: '', package: '', note: 'C Band', state: 'on', country: 'United_Kingdom'},
                {name: 'Shopping Channel', action: '', frequency: '(11558 V)', satellite: 'Hispasat @ 30° West', band: '', package: '', note: 'D Band', state: 'on', country: 'Spain'},
                {name: 'Medya TV', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A', band: '', package: '', note: 'D Band', state: 'left', country: 'Spain'},
                {name: 'TV A', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A', band: '', package: '', note: 'Orange, Polsat', state: 'return', country: 'United_Kingdom'},
                {name: 'Anadolu Kaplanları', action: '', frequency: '(11558 V)', satellite: 'Türksat 3A', band: 'KU', package: 'Orange Polsat', note: '', state: 'left', country: 'Wallis_and_Futuna'},
                {name: 'Kultura Ukraine', action: '', frequency: '(12341 V)', satellite: 'Türksat 3A', band: 'KU', package: '', note: 'C Band', state: 'on', country: 'United_Kingdom'}
            ]
        }];
        vm.getData = function () {
            $http.get(ServerUrl + "get_home_data")
                .then(function (response) {
                    console.log(response.data)
                    vm.tableData = [{
                        title: 'Channels Update for 06.01.2017',
                        cells: response.data
                    }, {
                        title: 'Channels Update for 05.01.2017',
                        cells: response.data
                    }];
                });
        }
        vm.getData();
    }
})();
