(function () {
    'use strict';

    angular
        .module('flysat')
        .run(runBlock)
        .controller('MainController', MainController);

    /** @ngInject */
    function runBlock($log, $rootScope) {
        $rootScope.topMenuItems = [
            {id: '1', label: 'Home', url: '#home', className: 'menu-item'},
            {id: '2', label: 'Sat News', url: '#singlesat', className: ''},
            {id: '3', label: 'Sat List', url: '#input', className: ''},
            {id: '4', label: 'Packages', url: '#packages', className: ''},
            {id: '5', label: 'HD TV', url: '#hd_tv', className: ''},
            {id: '6', label: 'UHD TV', url: '#uhd_tv', className: 'hide-sm'},
            {id: '7', label: '3D TV', url: '#3d_tv', className: 'hide-sm'},
            {id: '8', label: 'FTA TV', url: '#fta_tv', className: ''},
            {id: '9', label: 'Launches', url: '#launches', className: 'hide-sm'},
            {id: '10', label: 'Sat Info', url: '#sat_info', className: ''},
            {id: '11', label: 'Track', url: '#track', className: 'hide-sm'},
            {id: '12', label: 'Update Form', url: '#update_form', className: ''},
            {id: '13', label: 'Football', url: '#football', className: 'hide-sm'}
        ];

        $rootScope.currMenu = '1';

        Date.prototype.getDateString = function() {
            if (!this.getDate()) {
                return '';
            } else {
                return this.getDate() + '/' + (this.getMonth() + 1) + '/' + this.getFullYear();
            }
        }

    }

    function MainController($rootScope) {
        $rootScope.topMenuClick = function (menuId) {
            $rootScope.currMenu = menuId;
        }
    }
})();

