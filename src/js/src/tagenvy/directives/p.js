/**
 * @ngdoc directive
 * @name tagenvy.directive:p
 *
 * @description
 * Test directive to work with paragraphs on example page
 */

angular.module('tagenvy.directives')
    .directive('p', ['tagenvy.config', '$rootScope', function (config, $rootScope) {
        return {
            restrict: 'E',
            link: function (scope, iElement, iAttrs) {

                iElement.bind('click', function(){
                    console.log('Broadcast tagenvy:p:click event');
                    $rootScope.$broadcast('tagenvy:p:click', iElement);
                });

            }
        };
    }]);