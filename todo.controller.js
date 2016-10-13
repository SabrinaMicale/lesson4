(function(angular) {

    'use strict';

    angular.module('todoApp').controller('TodoController', TodoController);

    function TodoController(storageService, $mdDialog) {
        var vm = this;

        vm.selectedItem = 0;
        vm.items = storageService.get() || [];
        vm.selected = null;
        vm.task = {title: "title",
                description: "description",
                done: false,
                priority: 0,
                date: Date.now(),
                estimatedWork: 10,
                selected: false};
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

       

        //Delete the current selected item, if any
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

        //Set to done selected items
          vm.setToDone = function() {
            var i=0;
                 for(i=0; i<vm.items.length; i++) {
                 if (vm.items[i].selected) vm.items[i].done=true;
                } 
            vm.deselectAll(vm.items);
             storageService.set(vm.items); 
        }

        //Set to not yet done selected items
          vm.setToNotDone = function() {
            var i=0;
                 for(i=0; i<vm.items.length; i++) {
                 if (vm.items[i].selected) vm.items[i].done=false;
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

        //Creates a new item with the given parameters
        vm.createItem = function(title,description, priority, done, date, estimatedWork) {
            vm.items.push({
                title: title,
                description: description,
                done: done || false,
                priority: priority || 0,
                date: date || Date.now(),
                estimatedWork: estimatedWork || 10,
                selected: false
            });
           vm.saveInStorage();
        }

        //Update the item with the given parameters
        vm.updateItem = function(title, description, priority, done, date, estimatedWork) {
            vm.selected.title = title;
            vm.selected.description = description;
            vm.selected.done = done;
            vm.selected.priority = priority || vm.selected.priority;
            vm.selected.date=  date;
            vm.selected.estimatedWork=estimatedWork || vm.selected.estimatedWork;
            vm.selected= false;
            /*vm.items.push({
                title: title,
                description: description,
                done: done || false,
                priority: priority || 0,
                date: date || Date.now(),
                estimatedWork: estimatedWork || 10,
                selected: false
            });*/
            vm.selected = null;
           vm.saveInStorage();
        }

        //Open dialog to show task and let user change its fields
        vm.showTask = function($event, item) {
        var parentEl = angular.element(document.body);
        vm.task.title = item.title;
       vm.task.description= item.description;
        vm.task.priority = item.priority;
        vm.task.done = item.done;
        vm.task.estimatedWork = item.estimatedWork;
        vm.task.date = item.date;
        vm.selected = item;
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           '<md-dialog flex="25" aria-label="Update Task">' +
           '<form name="updateTaskForm" novalidate>'+
    
           '  <md-dialog-content class="md-padding md-margin flex" layout="column">'+
           
           '<h3>Update Task</h3>'+
      
           ' <md-input-container flex>'+
                      '<label>Title:</label>'+
                        '<input name="title" ng-model = "task.title" required >'+
                         '<div ng-show="updateTaskForm.$submitted || updateTaskForm.title.$touched">'+
      '<div ng-show="updateTaskForm.title.$error.required">Insert a name for the task.</div>'+
    '</div>'+
                  '</md-input-container>'+
                 '<md-input-container flex>'+
                      '<label>Description:</label>'+
                       '<input name="description" ng-model="task.description" >'+
                   '</md-input-container>'+
                    
                   '<md-input-container flex>'+
                      '<label>Estimated work hours:</label>'+
                       '<input type="number" name="estimatedWork" ng-model="task.estimatedWork" >'+
                   '</md-input-container>'+
                   '<md-input-container flex>'+
                      '<label>Current date: {{task.date | date : "dd/MM/y HH:mm"}}</label>'+
                      
                       '<input flex type="datetime-local" name="date" ng-model="task.date" >'+
                       
                   '</md-input-container>'+
                  
                 
                   '<md-input-container flex>'+
                      '<label>Priority:</label>'+
                       '<md-select ng-model="task.priority">'+
                        '<md-option ng-value="-1">Low</md-option>'+
                        '<md-option ng-value="0">Normal</md-option>'+
                        '<md-option ng-value="1">High</md-option>'+
                    '</md-select>'+
                   '</md-input-container>'+
                   '<md-input-container flex md-margin md-padding>'+
                   '<md-label>Completed?</md-label>   '+
                 
                   '<md-checkbox ng-model="task.done" aria-label="completed">'+
                    '</md-checkbox>'+
                    '</md-input-container>'+
                    
           '  </md-dialog-content>' +
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
      function DialogController($scope, $mdDialog, task) {
        $scope.task = task;
        
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.update = function(item) {
            vm.updateItem($scope.task.title, $scope.task.description, $scope.task.priority,$scope.task.done, $scope.task.date, $scope.task.estimatedWork );
            $mdDialog.hide();
        }
      }
        }

      //Open dialog to create new task
         vm.addTask = function($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           '<md-dialog flex="25" aria-label="Add Task">' +
           '<form name="addTaskForm" novalidate>'+
    
           '  <md-dialog-content class="md-padding md-margin flex" layout="column">'+
           
           '<h3>Create a new Task</h3>'+
      
           ' <md-input-container flex>'+
                      '<label>Title:</label>'+
                        '<input name="title" ng-model = "task.title" required >'+
                         '<div ng-show="addTaskForm.$submitted || addTaskForm.title.$touched">'+
      '<div ng-show="addTaskForm.title.$error.required">Insert a name for the task.</div>'+
    '</div>'+
                  '</md-input-container>'+
                 '<md-input-container flex>'+
                      '<label>Description:</label>'+
                       '<input name="description" ng-model="task.description" >'+
                   '</md-input-container>'+
                    
                   '<md-input-container flex>'+
                      '<label>Estimated work hours:</label>'+
                       '<input type="number" name="estimatedWork" ng-model="task.estimatedWork" >'+
                   '</md-input-container>'+
                   '<md-input-container flex>'+
                      '<label>Date:</label>'+
                       '<input type="datetime-local" name="date" ng-model="task.date" >'+
                   '</md-input-container>'+
                  
                 
                   '<md-input-container flex>'+
                      '<label>Priority:</label>'+
                       '<md-select ng-model="task.priority">'+
                        '<md-option ng-value="-1">Low</md-option>'+
                        '<md-option ng-value="0">Normal</md-option>'+
                        '<md-option ng-value="1">High</md-option>'+
                    '</md-select>'+
                   '</md-input-container>'+
                   '<md-input-container flex>'+
                   '<md-label>Completed?</md-label>   '+
                 
                   '<md-checkbox ng-model="task.done" aria-label="completed">'+
                    '</md-checkbox>'+
                    '</md-input-container>'+
                    
           '  </md-dialog-content>' +
           '  <md-dialog-actions class="md-padding" layout="row" layout-align="center center">' +
            '    <md-button type="submit" ng-disabled="addTaskForm.$invalid" class="md-primary" ng-click="insert()" class="md-primary">' +
           '     Create task' +
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
      function DialogController($scope, $mdDialog, task) {
        $scope.task = task;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.insert = function() {
            vm.createItem($scope.task.title, $scope.task.description, $scope.task.priority,$scope.task.done, $scope.task.date, $scope.task.estimatedWork );
            $mdDialog.hide();
        }
      }
    }


    }


})(window.angular);