/**
 * @author: Sabrina Micale
 * @file: percentageCircle.directive.js
 * @description: This file contains the directive used to show the percentage completion circle of the tasks.
 */

(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('percentageCircle', directive);

 function directive() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      completion: '='
    },
    template: ' <div class="c100 p{{completion}} big blue">\
                      <span>{{completion}}%</span>\
                      <div class="slice">\
                        <div class="bar"></div>\
                        <div class="fill"></div>\
                      </div>\
                    </div>'
        };
}})();