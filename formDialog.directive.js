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
      '  <md-dialog-content flex class="md-padding md-margin flex " layout="column">'+
           '<h3>{{formDialogCtrl.title}}</h3>'+
           '<md-tabs md-dynamic-height md-dynamic-width md-border-bottom class="no-scroll md-margin md-padding" flex layout="column">'+
                    '<md-tab label="Task info" flex  >'+
                       
                            '<div ng-messages="formDialogCtrl.formName.tags.$error" ng-if="formDialogCtrl.formName.$dirty>'+
    '<div ng-message="md-max-chips">You reached the maximum amount of tags</div>'+
 '</div>'+
           ' <md-input-container flex>'+
                      '<label>Title:</label>'+
                        '<input name="title" ng-model = "formDialogCtrl.task.title"  maxlength="50" required >'+
                         '<div ng-show="formDialogCtrl.formName.$submitted || formDialogCtrl.formName.title.$touched">'+
      '<div ng-show="formDialogCtrl.formName.title.$error.required">Insert a name for the task.</div>'+
    '</div>'+
                  '</md-input-container>'+
                 '<md-input-container flex>'+
                      '<label>Description:</label>'+
                       '<input name="description" ng-model="formDialogCtrl.task.description"maxlength="100"  >'+
                   '</md-input-container>'+
                    
                   '<md-input-container flex>'+
                      '<label>Estimated work hours:</label>'+
                       '<input type="number" name="estimatedWork" ng-model="formDialogCtrl.task.estimatedWork" >'+
                   '</md-input-container>'+
                   '<md-input-container flex>'+
                      '<label>Set date: {{formDialogCtrl.task.date | date : "dd/MM/y HH:mm"}}</label>'+
                      
                       '<input flex type="datetime-local" name="date" ng-model=formDialogCtrl.task.date >'+
                       
                   '</md-input-container>'+
                  
                 
                   '<md-input-container flex>'+
                      '<label>Priority:</label>'+
                       '<md-select ng-model="formDialogCtrl.task.priority">'+
                        '<md-option ng-value="1">Low</md-option>'+
                        '<md-option ng-value="2">Normal</md-option>'+
                        '<md-option ng-value="3">High</md-option>'+
                    '</md-select>'+
                   '</md-input-container>'+
                   '<md-input-container layout="row" layout-align="space-between start" flex md-margin md-padding>'+
                   '<md-label>Completed?</md-label>   '+
                 
                   '<md-checkbox class="md-primary" layout-align-end-center ng-model="formDialogCtrl.task.done" aria-label="completed" tooltip="Change status">'+
                    '</md-checkbox>'+
                    '</md-input-container>'+
                     '<md-chips name="tags" ng-model="formDialogCtrl.task.tags" placeholder="Insert tags" md-enable-chip-edit="true" md-max-chips="6">'+
            
                    '</md-chips>'+
                    '</md-tab>'+


                    '<md-tab flex label="Subtasks"   >'+
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
    '<md-checkbox  ng-model="item.done"></md-checkbox>'+
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
 
                   '</md-tab>'+
                  '</md-tabs>'
                    
          

                     
                    
              
        };
    }

  FormDialogController.$inject = ['$mdDialog'];
    //Directive controller
    function FormDialogController($mdDialog) {
        var vm = this;
        vm.subtask="subtask";


        vm.addSubtask = function() {
            vm.task.subtasks.push({
                title : vm.subtask,
                done : false
            });
        }
        vm.deleteSubtask = function(item) {
            var index = vm.task.subtasks.indexOf(item);  
                                if (index != -1) 
                            vm.task.subtasks.splice(index, 1);

        
        }
        
    }
})();