/**
 * @author: Sabrina Micale
 * @file: customList.directive.js
 * @description: This file contains the directive used to show the list of tasks.
 */

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
                showFunction: '=',
                orderBy: '=',
            },
            controller: CustomListController,
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
                '                <md-icon style="color: green" ng-if="item.priority == 1">low_priority</md-icon>' +
                '                <md-icon ng-if="item.priority == 2">label</md-icon>' +
                '                <md-icon style="color: red" ng-if="item.priority == 3">priority_high</md-icon>' +
                '            </md-button>' +
                '            <div class="md-list-item-text">' +
                '                <h3>{{item.title}}</h3>' +
                '                <p> {{item.date | date: "dd-MM-yyyy HH:mm"}}</p>' +
               
                '            </div>' +
               
                '            <md-checkbox ng-model="item.done" ng-change="customListCtrl.checkStateChanged(item)" class="md-primary md-align-top-right" tooltip="Change status">' +
                '            </md-checkbox>' +
                '<md-button ng-click="customListCtrl.showFunction($event, item)" class="md-icon-button" aria-label="Show Task"><md-tooltip>Show task</md-tooltip><md-icon>zoom_in</md-icon></md-button>'+
                '<div class="md-padding" ><percentage-circle completion="item.completion"></percentage-circle></div>'+
                '            <md-divider></md-divider>' +
                '        </md-list-item>' +
                '    </md-list>' +
                '</md-content>'
        };
    }
    CustomListController.$inject = ['storageService'];
    //Directive controller
    function CustomListController(storageService) {
        var vm = this;


        //Changes the priority of the given item
        vm.changePriority = function(item) {
      
            if (item.priority <= 2)
                item.priority++;
            else
                item.priority = 1;
          
                vm.saveInStorage();
            //storageService.set(vm.items);
        }

        //Occurs when the status of an items changes
        vm.checkStateChanged = function(item) {
           // if item set to done => set all subtasks to done. If item set to not done => set all subtasks to not done.
            var i=0;
           if(item.done) {
              
               for(i=0; i<item.subtasks.length; i++) {
                    item.subtasks[i].done=true;
                    
               }
               item.completion=100;
           } else {
                for(i=0; i<item.subtasks.length; i++) {
                    item.subtasks[i].done=false;
                   
            }
             item.completion=0;
           }
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