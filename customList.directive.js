(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('customList', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
                saveInStorage: '=',
                filteredItems: '=',
                orderBy: '=',
            },
            controller: customListController,
            controllerAs: 'customListCtrl',
            transclude: true,
            restrict: 'E',
            template: '' +
                '            <md-content class="md-padding scroll tab-content">' +
                '    <md-list>' +
                '        <md-list-item class="md-2-line" ng-repeat="item in customListCtrl.items | filter: customListCtrl.filteredItems | filter: customListCtrl.filterFunction | orderBy: customListCtrl.orderBy" ng-class="item.selected == true ? \'selected\':\'\'" ng-click="customListCtrl.toggleSelection(item)">'

                +
                '            <md-button ng-click="customListCtrl.changePriority(item)" class="md-icon-button" aria-label="Priority">' +
                '            <md-tooltip>Change priority</md-tooltip>'+
                '                <md-icon style="color: green" ng-if="item.priority == -1">low_priority</md-icon>' +
                '                <md-icon ng-if="item.priority == 0">label</md-icon>' +
                '                <md-icon style="color: red" ng-if="item.priority == 1">priority_high</md-icon>' +
                '            </md-button>' +
                '            <div class="md-list-item-text">' +
                '                <h3>{{item.title}}</h3>' +
                '                <p> {{item.date | date: "dd-MM-yyyy HH:mm"}}</p>' +
                '            </div>' +
                '            <md-checkbox ng-model="item.done" ng-change="customListCtrl.checkStateChanged()" class="md-primary md-align-top-right" tooltip="Change status">' +
                '            </md-checkbox>' +
                '            <md-divider></md-divider>' +
                '        </md-list-item>' +
                '    </md-list>' +
                '</md-content>'
        };
    }
    //Directive controller
    function customListController(storageService) {
        var vm = this;


        //Changes the priority of the given item
        vm.changePriority = function(item) {
      
            if (item.priority <= 0)
                item.priority++;
            else
                item.priority = -1;
          
                vm.saveInStorage();
            //storageService.set(vm.items);
        }

        //Occurs when the status of an items changes
        vm.checkStateChanged = function() {
           // storageService.set(vm.items);
            vm.saveInStorage();
        }

      

        //Select or deselect the given item
        vm.toggleSelection = function(item) {
           /* if (vm.selectedItem == null || vm.selectedItem != item)
                vm.selectedItem = item;
            else
                vm.selectedItem = null;*/
                if(item.selected) {
                    item.selected = false;
                    vm.selectedItem--;
                } else {
                    item.selected=true;
                    vm.selectedItem++;
                }
     
        }
    }
})();