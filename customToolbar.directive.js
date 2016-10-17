/**
 * @author: Sabrina Micale
 * @file: customToolbar.directive.js
 * @description: This file contains the directive that shows and handles the toolbar's actions.
 */

(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('customToolbar', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                disableFunction: '=',
                applyFunction: '=',
                cancelFunction: '=',
                disableApplyCondition: "@",
                disableCancelCondition: "@",
                priorityFunction: '=',
                deleteFunction: '=',
                filteredItems: '=',
                orderBy: '=',
                appName: '@',
            },
            controller: CustomToolbarController,
            controllerAs: 'customToolbarCtrl',
            transclude: true,
            restrict: 'E',
            template: '' +
             '<md-toolbar flex class="md-whiteframe-3dp">'+
                '<div flex class="md-toolbar-tools">'+
             '<h2><span>{{customToolbarCtrl.appName}}</span></h2>'+
                    '<span flex></span>'+
               '<md-button ng-disabled="customToolbarCtrl.selectedItem ==0 || customToolbarCtrl.disableFunction==customToolbarCtrl.disableApplyCondition" ng-click="customToolbarCtrl.applyFunction()" class="md-icon-button" aria-label="Done">'+
                         '<md-tooltip md-autohide=\'true\'>Set to done</md-tooltip>'+
                        '<md-icon> done </md-icon>'+
                    '</md-button>'+
                     '<md-button ng-disabled="customToolbarCtrl.selectedItem ==0 || customToolbarCtrl.disableFunction==customToolbarCtrl.disableCancelCondition" ng-click="customToolbarCtrl.cancelFunction()" class="md-icon-button" aria-label="Not Done">'+
                         '<md-tooltip md-autohide=\'true\'>Set to not done</md-tooltip>'+
                        '<md-icon> undo </md-icon>'+
                    '</md-button>'+
                     '<md-menu>'+
                     '<!-- Trigger element is a md-button with an icon -->'+
                    '<md-button ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="Open search menu">'+
                     '<md-tooltip md-autohide=\'true\'>Filter tasks</md-tooltip>'+
                    '<md-icon>search</md-icon>'+
                    '</md-button>'+
                     '<md-menu-content>'+
                    '<md-menu-item>'+
                        '<md-input-container>'+
                      '<md-icon>search</md-icon>'+
                     '<input type="search" ng-model="customToolbarCtrl.filteredItems" placeholder="filter tasks..." aria-label="filter tasks" />'+
                      '</md-input-container>'+
                    '</md-menu-item>'+
                    '<md-menu-item>'+
                    '<md-button ng-click="customToolbarCtrl.orderItemsBy(\'title\')">{{customToolbarCtrl.orderByTitle}}</md-button>'+
                    '</md-menu-item>'+
                    '<md-menu-item>'+
                    '<md-button ng-click="customToolbarCtrl.orderItemsBy(\'date\')">{{customToolbarCtrl.orderByDate}}</md-button>'+
                    '</md-menu-item>'+
                    '<md-menu-item>'+
                    '<md-button ng-click="customToolbarCtrl.orderItemsBy(\'priority\')">{{customToolbarCtrl.orderByPriority}}</md-button>'+
                    '</md-menu-item>'+
                    '<md-menu-item>'+
                    '<md-button ng-click="customToolbarCtrl.orderItemsBy(\'completion\')">{{customToolbarCtrl.orderByCompletion}}</md-button>'+
                    '</md-menu-item>'+
                     '</md-menu-content>'+
                     '</md-menu>'+
                    '<md-menu>'+
                     '<!-- Trigger element is a md-button with an icon -->'+
                    '<md-button ng-disabled="customToolbarCtrl.selectedItem == 0" ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="Open priority menu">'+
                     '<md-tooltip md-autohide=\'true\'>Change priority</md-tooltip>'+
                    '<md-icon>create</md-icon>'+
                    '</md-button>'+
                    '<md-menu-content>'+
                    '<md-menu-item><md-button ng-click="customToolbarCtrl.priorityFunction(1)"> '+
                                        '<md-tooltip md-autohide=\'true\'>Low priority</md-tooltip>'+
                                        '<md-icon style="color: green">low_priority</md-icon></md-button>'+
                                  '<md-button ng-click="customToolbarCtrl.priorityFunction(2)">'+
                                        '<md-tooltip md-autohide=\'true\'>Normal priority</md-tooltip>'+
                                        '<md-icon>label</md-icon></md-button>'+
                                  '<md-button ng-click="customToolbarCtrl.priorityFunction(3)">'+
                                        '<md-tooltip md-autohide=\'true\'>High priority</md-tooltip>'+
                                        '<md-icon style="color: red">priority_high</md-icon></md-button></md-menu-item>'+
                    '</md-menu-content>'+
                    '</md-menu>'+
                    '<md-button ng-disabled="customToolbarCtrl.selectedItem == 0" ng-click="customToolbarCtrl.deleteFunction()" class="md-icon-button" aria-label="Delete">'+
                         '<md-tooltip md-autohide=\'true\'>Delete</md-tooltip>'+
                        '<md-icon> delete </md-icon>'+
                    '</md-button>'+
                    '</div>'+
            '</md-toolbar>'
        };
    }
    //Directive controller
    function CustomToolbarController() {
        var vm = this;
        //Order items
        vm.orderByTitle = "Order by title (ASC)";
        vm.orderByDate = "Order by date (DESC)";
        vm.orderByPriority = "Order by priority (ASC)";
        vm.orderByCompletion = "Order by completion (ASC)";
        vm.orderItemsBy = function(attribute) {
            if(vm.orderBy==attribute) vm.orderBy='-'+attribute; //If items are already ordered by attribute, order them in descending order
            else
                vm.orderBy = attribute;
                switch(vm.orderBy) {
            case 'title':   vm.orderByTitle = "Order by title (DESC)";
                            vm.orderByDate = "Order by date (ASC)";
                            vm.orderByPriority = "Order by priority (ASC)";
                            vm.orderByCompletion = "Order by completion (ASC)";
                        break;
            case 'date':    vm.orderByDate = "Order by date (DESC)";
                            vm.orderByPriority = "Order by priority (ASC)";
                            vm.orderByTitle = "Order by title (ASC)";
                            vm.orderByCompletion = "Order by completion (ASC)";
                        break;
            case 'priority':    vm.orderByPriority = "Order by priority (DESC)";
                                vm.orderByDate = "Order by date (ASC)";
                                vm.orderByTitle = "Order by title (ASC)";
                                vm.orderByCompletion = "Order by completion (ASC)";
                        break;
            case 'completion': vm.orderByPriority = "Order by priority (ASC)";
                                vm.orderByDate = "Order by date (ASC)";
                                vm.orderByTitle = "Order by title (ASC)";
                                vm.orderByCompletion = "Order by completion (DESC)";
                        break;
            default:        vm.orderByTitle = "Order by title (ASC)";
                            vm.orderByDate = "Order by date (ASC)";
                            vm.orderByPriority = "Order by priority (ASC)";
                            vm.orderByCompletion = "Order by completion (ASC)";
                        break;
        

        }
        }
        
        
    }
})();