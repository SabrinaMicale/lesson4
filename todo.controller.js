/**
 * @author: Sabrina Micale
 * @file: todo.controller.js
 * @description: This file contains the main controller of the app.
 */

(function(angular) {

    'use strict';

    angular.module('todoApp').controller('TodoController', TodoController);

    TodoController.$inject = ['storageService', '$mdDialog'];
    
    function TodoController(storageService, $mdDialog) {
        var vm = this;

        vm.selectedItem = 0;
        vm.items = storageService.get() || [];
        vm.selected = null;
        vm.task = {title: "title",
                description: "description",
                done: false,
                priority: 2,
                date: new Date(),
                estimatedWork: 10,
                selected: false,
                tags: [],
                subtasks: [],
                completion: 0}
        vm.show = 'ToDo';
        vm.orderBy = 'date';

       
        vm.setState = function(label) {
            vm.show = label;
            vm.deselectAll(vm.items);
           
        }

        vm.notDone = function(item) {
            return item.done == false;
        }

        vm.done = function(item) {
            return item.done == true;
        }

        vm.all = function(item) {
            return true;
        }

        vm.deselectAll = function(list) {
        for(var i=0; i<list.length; i++)
                list[i].selected=false;
        vm.selectedItem=0;
        }

         vm.saveInStorage= function() {
            var copy = angular.copy(vm.items);
           vm.deselectAll(copy);
            storageService.set(copy);
        }

       

        //Delete the current selected items, if any
        vm.deleteItem = function(ev) {

            if (vm.selectedItem != 0) {
                var confirm = $mdDialog.confirm()

                .textContent('' + vm.selectedItem + ' tasks will be deleted. Are you sure?')
                    .ariaLabel('Delete task')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm).then(function(result) {
                    if (result) {
                        var sItems = [];
                        var i=0;
                        for(i=0; i<vm.items.length; i++) {
                            if (vm.items[i].selected) sItems.push(vm.items[i]);
                        }
                        for(i=0; i<sItems.length; i++) {
                               var index = vm.items.indexOf(sItems[i]);  
                                if (index != -1) {
                            vm.items.splice(index, 1);
                            
                        } 
                        }
                        vm.selectedItem=0;
                        sItems=null;
                      storageService.set(vm.items); 
                    }
                });
            }
        }

// if item set to done => set all subtasks to done. If item set to not done => set all subtasks to not done.
         vm.setSubtasksStatus = function(item) {
           
            var i=0;
           if(item.done) {
              
               for(i=0; i<item.subtasks.length; i++)
                    item.subtasks[i].done=true;
           } else {
                for(i=0; i<item.subtasks.length; i++)
                    item.subtasks[i].done=false;
           }
          
        }

        //Set to done selected items
          vm.setToDone = function() {
            var i=0;
                 for(i=0; i<vm.items.length; i++) {
                 if (vm.items[i].selected) { vm.items[i].done=true;
                     vm.setSubtasksStatus(vm.items[i]);
                     vm.items[i].completion=100;
                 }
                } 
            vm.deselectAll(vm.items);
             storageService.set(vm.items); 
        }

        //Set to not yet done selected items
          vm.setToNotDone = function() {
            var i=0;
                 for(i=0; i<vm.items.length; i++) {
                 if (vm.items[i].selected) {vm.items[i].done=false;
                     vm.setSubtasksStatus(vm.items[i]);
                     vm.items[i].completion=0;
                 }
                } 
            vm.deselectAll(vm.items);
             storageService.set(vm.items); 
        }
        //Set the priority of the selected items
        vm.setPriority = function(priority) {
            
             var i=0;
                 for(i=0; i<vm.items.length; i++) {
                 if (vm.items[i].selected) vm.items[i].priority=priority;
                } 
            vm.deselectAll(vm.items);
             storageService.set(vm.items); 
        }

        //Calculates task's completion percentage
        vm.calculateCompletion = function(subtasks) {
            var length = subtasks.length;
            if(length>0) {
            var count=0;
            var i=0;
            for(i=0; i<length; i++)
                if(subtasks[i].done) count++;
            
            return Math.floor((count/length)*100);
            } else return 0;
        }

        //Creates a new item with the given parameters
        vm.createItem = function(title,description, priority, done, date, estimatedWork, tags, subtasks) {
           var completion;
            if(done) completion = 100;
            else
                if(subtasks!=null)
                    completion = vm.calculateCompletion(subtasks);
                else completion = 0;
        
            vm.items.push({
                title: title,
                description: description,
                done: done || false,
                priority: priority || 2,
                date: new Date(date).toISOString() || new Date().toISOString(),
                estimatedWork: estimatedWork || 10,
                selected: false,
                tags: tags || [],
                subtasks: subtasks || [],
                completion: completion
            });
                
           vm.saveInStorage();
        }

        //Update the item with the given parameters
        vm.updateItem = function(title, description, priority, done, date, estimatedWork, tags, subtasks) {
            var completion;
            if(done) completion = 100;
            else
                if(subtasks!=null)
                    completion = vm.calculateCompletion(subtasks);
                else completion = 0;

            vm.selected.title = title;
            vm.selected.description = description;
            vm.selected.done = done;
            vm.selected.priority = priority || vm.selected.priority;
            vm.selected.date=  new Date(date).toISOString();
            vm.selected.estimatedWork=estimatedWork || vm.selected.estimatedWork;
            vm.selected.tags = tags || vm.selected.tags;
            vm.selected.subtasks = subtasks || vm.selected.subtasks;
            vm.selected.completion = completion;
            
            vm.selected = null;
           vm.saveInStorage();
        }

        //Open dialog to show task and let user change its fields
        vm.showTask = function($event, item) {
        var parentEl = angular.element(document.body);
     
        vm.setTaskValues(item);
        vm.selected = item;
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template: 
                
           '<md-dialog flex="30" aria-label="Update Task" >' +
           '<form name="updateTaskForm" novalidate>'+
           
        
           '<form-dialog task="task" form-name="updateTaskForm" title="Update Task"></form-dialog>'+
    
           '  <md-dialog-actions class="md-padding" layout="row" layout-align="center center">' +
            '    <md-button type="submit" ng-disabled="updateTaskForm.$invalid" class="md-primary" ng-click="update(item)" class="md-primary">' +
           '    Update task' +
           '    </md-button>' +
           '    <md-button class="md-primary" ng-click="closeDialog()" class="md-primary">' +
           '      Cancel' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
          '</form>'+
           '</md-dialog>',
         locals: {
           task: vm.task
         },
         controller: DialogController
      });
   
        }

        //Reset task's values to default or to the item's values
        vm.setTaskValues = function(item) {
            if(item!=null) {
            vm.task.title = item.title;
       vm.task.description= item.description;
        vm.task.priority = item.priority;
        vm.task.done = item.done;
        vm.task.estimatedWork = item.estimatedWork;
        vm.task.date = new Date(item.date);
        vm.task.selected=false;
        vm.task.tags = angular.copy(item.tags);
        vm.task.subtasks = angular.copy(item.subtasks);
            } else {
        vm.task.title="title";
      vm.task.description="description";
      vm.task.done=false;
      vm.task.priority=2;
      vm.task.date= new Date();
      vm.task.estimatedWork=10;
      vm.task.selected=false;
       vm.task.date.setMilliseconds(0);
       vm.task.tags = [];
       vm.task.subtasks = [];
            }
        }

      //Open dialog to create new task
         vm.addTask = function($event) {
       var parentEl = angular.element(document.body);
       vm.setTaskValues();
     
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           '<md-dialog flex="30" aria-label="Add Task">' +
           '<form name="addTaskForm" novalidate>'+
    '<form-dialog task="task" form-name="addTaskForm" title="Create a new Task"></form-dialog>'+
           '  <md-dialog-actions class="md-padding" layout="row" layout-align="center center">' +
            '    <md-button type="submit" ng-disabled="addTaskForm.$invalid" class="md-primary" ng-click="insert()" >' +
           '     Create task' +
           '    </md-button>' +
           '    <md-button class="md-primary" ng-click="closeDialog()" >' +
           '      Cancel' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
          '</form>'+
           '</md-dialog>',
         locals: {
           task: vm.task
         },
         controller: DialogController
      });
    
    }
        DialogController.$inject = ['$scope', '$mdDialog', 'task'];
      function DialogController($scope, $mdDialog, task) {
        $scope.task = task;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.insert = function() {
           
            vm.createItem($scope.task.title, $scope.task.description, $scope.task.priority,$scope.task.done, $scope.task.date, $scope.task.estimatedWork, $scope.task.tags, $scope.task.subtasks );
            $mdDialog.hide();
        }
          $scope.update = function(item) {
            vm.updateItem($scope.task.title, $scope.task.description, $scope.task.priority,$scope.task.done, $scope.task.date, $scope.task.estimatedWork, $scope.task.tags, $scope.task.subtasks );
            $mdDialog.hide();
        }
      }

    }


})(window.angular);