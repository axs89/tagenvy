/**
 * @ngdoc directive
 * @name tagenvy.directive:body
 *
 * @description
 * Directive to work with body element
 */

angular.module('tagenvy.directives')
    .directive('body', ['tagenvy.config', '$rootScope', '$location', function (config, $rootScope, $location) {
        return {
            restrict: 'E',
            link: function (scope, iElement, iAttrs) {

                // Broadcast init event when the body is ready
                angular.element(iElement).ready(function(){
                    $rootScope.$broadcast('tagenvy:body:init', $location);
                });

            }
        };
    }]);