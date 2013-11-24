/**
 * @ngdoc directive
 * @name tagenvy.directive:p
 *
 * @description
 * Directive to work with paragraph elements
 */

angular.module('tagenvy.directives')
    .directive('p', ['tagenvy.config', '$rootScope', function (config, $rootScope) {
        return {
            restrict: 'E',
            link: function (scope, iElement, iAttrs) {

                // Broadcast click events
                iElement.bind('click', function(){
                    console.log('Broadcast tagenvy:p:click event');
                    $rootScope.$broadcast('tagenvy:p:click', iElement);
                });

            }
        };
    }]);