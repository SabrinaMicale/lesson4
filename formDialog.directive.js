/**
 * @author: Sabrina Micale
 * @file: formDialog.directive.js
 * @description: This file contains the directive that shows the content part of the dialog to insert and update tasks.
 */

(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('formDialog', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                task: '=',
                formName: '=',
                title: '@',
            },
            controller: FormDialogController,
            controllerAs: 'formDialogCtrl',
            transclude: true,
            restrict: 'E',
            template: '' +
      '  <md-dialog-content  flex class="no-scroll md-padding in flex " layout="column">'+
           '<h3>{{formDialogCtrl.title}}</h3>'+
           '<md-tabs  layout-fill md-stretch-tabs="always" md-swipe-content="true" md-dynamic-height md-border-bottom class="no-scroll md-padding " flex layout="column">'+
                    '<md-tab layout-fill label="Task info" class="scroll md-padding" flex  >'+
           '<md-content layout-fill class="md-padding scroll fixed-width tab-content flex" flex layout="column">' +
           ' <md-input-container class="fixed-width" flex>'+
                      '<label>Title:</label>'+
                        '<input name="title" ng-model = "formDialogCtrl.task.title"  maxlength="50" required >'+
                         '<div ng-show="formDialogCtrl.formName.$submitted || formDialogCtrl.formName.title.$touched">'+
      '<div ng-show="formDialogCtrl.formName.title.$error.required">Insert a name for the task.</div>'+
    '</div>'+
                  '</md-input-container>'+
                 '<md-input-container class="fixed-width" flex>'+
                      '<label>Description:</label>'+
                       '<input name="description" ng-model="formDialogCtrl.task.description"maxlength="100"  >'+
                   '</md-input-container>'+
                    
                   '<md-input-container class="fixed-width" flex>'+
                      '<label>Estimated work hours:</label>'+
                       '<input type="number" name="estimatedWork" ng-model="formDialogCtrl.task.estimatedWork" >'+
                   '</md-input-container>'+
                   '<md-input-container class="fixed-width" flex>'+
                      '<label>Set date: {{formDialogCtrl.task.date | date : "dd/MM/y HH:mm"}}</label>'+
                      
                       '<input flex type="datetime-local" name="date" ng-model=formDialogCtrl.task.date >'+
                       
                   '</md-input-container>'+
                  
                 
                   '<md-input-container class="fixed-width" flex>'+
                      '<label>Priority:</label>'+
                       '<md-select ng-model="formDialogCtrl.task.priority">'+
                        '<md-option ng-value="1">Low</md-option>'+
                        '<md-option ng-value="2">Normal</md-option>'+
                        '<md-option ng-value="3">High</md-option>'+
                    '</md-select>'+
                   '</md-input-container>'+
                   '<md-input-container layout="row" layout-align="space-between start" flex md-margin md-padding>'+
                   '<md-label>Completed?</md-label>   '+
                 
                   '<md-checkbox class="md-primary" ng-change="formDialogCtrl.setSubtasksStatus()" layout-align-end-center ng-model="formDialogCtrl.task.done" aria-label="completed" tooltip="Change status">'+
                    '</md-checkbox>'+
                    '</md-input-container>'+
                     '<md-chips class="fixed-width" name="tags" ng-model="formDialogCtrl.task.tags" placeholder="Insert tags" md-enable-chip-edit="true" md-max-chips="6">'+
            
                    '</md-chips>'+       
                            '<div ng-messages="formDialogCtrl.formName.tags.$error" ng-if="formDialogCtrl.formName.$dirty>'+
    '<div ng-message="md-max-chips">You reached the maximum amount of tags</div>'+
 '</div>'+
 '</md-content>'+
                    '</md-tab>'+


                    '<md-tab layout-fill label="Subtasks" class="scroll md-padding" flex >'+
                    '<md-content layout-fill class="md-padding scroll tab-content fixed-width flex" layout="column" >' +
                    '<br/><br/>'+
                        '<div flex layout="row">'+
                    '<md-input-container flex class="md-margin" layout="row" layout-align="space-between start">'+
                  
                       '<input type="textarea" name="subtaskText" ng-model="formDialogCtrl.subtask" flex maxlength="100" placeholder="Insert subtask" >'+
                  
          
                    '</md-input-container>' +
                     '    <md-button flex class="md-icon-button" ng-click="formDialogCtrl.addSubtask()" >' +
           '<md-tooltip md-autohide=\'true\'>Add subtask</md-tooltip>'+
           '   <md-icon> add</md-icon>' +
           '    </md-button>' +
             '</div>'+
                    
                    '<md-list flex class="no-scroll">'+
                    '<md-list-item flex  layout="row" layout-align="space-between center" ng-repeat="item in formDialogCtrl.task.subtasks" >'+
    
      
      '<p flex="50" class="md-padding"  >{{item.title}}</p>'+
      
   '<div flex="nogrow"  layout="row" layout-align="end start" >'+
   '<div flex layout-align="center center">'+
    '<md-checkbox  ng-model="item.done" ng-change="formDialogCtrl.checkStatusChange()"></md-checkbox>'+
    '</div>'+
    '<div flex layout-align="center center">'+
    '    <md-button  class="md-icon-button" ng-click="formDialogCtrl.deleteSubtask(item)" >' +
          '<md-tooltip md-autohide=\'true\'>Remove subtask</md-tooltip>'+
           '      <md-icon>remove</md-icon>' +
           '    </md-button>' +
           '</div>'+
           '</div>'+
            '            <md-divider></md-divider>' +
  '</md-list-item>'+
   
'</md-list>'+
 '</md-content>'+
                   '</md-tab>'+
                   
                  '</md-tabs>'
                    
          

                     
                    
              
        };
    }

  FormDialogController.$inject = ['$mdDialog'];
    //Directive controller
    function FormDialogController($mdDialog) {
        var vm = this;
        vm.subtask="subtask";

//Function to add subtask
        vm.addSubtask = function() {
            vm.task.subtasks.push({
                title : vm.subtask,
                done : false
            });
            vm.task.done=false;
        }
//Function called to check if all subtasks are done. If yes, task is set to done.
        vm.checkStatusChange = function() {
            var length = vm.task.subtasks.length;
            if(length>0) {
            var done = true;
            var i=0;
            for(i=0; i<length; i++) {
                    done = done && vm.task.subtasks[i].done;
                    if(!done) break;
            }
            vm.task.done = done;
        }
        }
//Function called to delete subtask.
        vm.deleteSubtask = function(item) {
            var index = vm.task.subtasks.indexOf(item);  
                                if (index != -1)
                                    vm.task.subtasks.splice(index, 1);
            vm.checkStatusChange();              
        
        }

//Function called when task status is changed. If task set to done => all subtasks set to done. If set to not done => all subtasks set to not done.
        vm.setSubtasksStatus = function() {
                     var i=0;
           if(vm.task.done) {
              
               for(i=0; i<vm.task.subtasks.length; i++)
                    vm.task.subtasks[i].done=true;
           } else {
                for(i=0; i<vm.task.subtasks.length; i++)
                  vm.task.subtasks[i].done=false;
           }
          
        }


        
    }
})();