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
            controller: formDialogController,
            controllerAs: 'formDialogCtrl',
            transclude: true,
            restrict: 'E',
            template: '' +
      '  <md-dialog-content class="md-padding md-margin flex" layout="column">'+
           '<h3>{{formDialogCtrl.title}}</h3>'+
           ' <md-input-container flex>'+
                      '<label>Title:</label>'+
                        '<input name="title" ng-model = "formDialogCtrl.task.title" required >'+
                         '<div ng-show="formDialogCtrl.formName.$submitted || formDialogCtrl.formName.title.$touched">'+
      '<div ng-show="formDialogCtrl.formName.title.$error.required">Insert a name for the task.</div>'+
    '</div>'+
                  '</md-input-container>'+
                 '<md-input-container flex>'+
                      '<label>Description:</label>'+
                       '<input name="description" ng-model="formDialogCtrl.task.description" >'+
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
                    '</md-input-container>'
              
        };
    }
    //Directive controller
    function formDialogController($mdDialog) {
        var vm = this;


       
    }
})();