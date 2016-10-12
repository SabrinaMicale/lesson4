(function(angular) {

    'use strict';

    angular.module('todoApp').controller('TodoController', TodoController);

    function TodoController(storageService, $mdDialog) {
        var vm = this;

        vm.selectedItem = 0;
        vm.items = storageService.get() || [];
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
        vm.createItem = function(title, priority, done, date) {
            vm.items.push({
                title: title,
                done: done || false,
                priority: priority || 0,
                date: date || Date.now(),
                selected: false
            });
           vm.saveInStorage();
        }

       
        //Add a new task to the items list 
        vm.addTask = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add new task')
                .placeholder('Your task title...')
                .ariaLabel('Your task title...')
                .targetEvent(ev)
                .ok('Add')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                if (result)
                    vm.createItem(result);
            });
        };

    }


})(window.angular);