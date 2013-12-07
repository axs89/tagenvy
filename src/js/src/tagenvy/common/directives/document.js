/**
 * @ngdoc directive
 * @name tagenvy.directive:document
 *
 * @description
 * Directive to work with document
 */

angular.module('tagenvy.common.directives')
    .directive('body', ['tagenvy.config', '$rootScope', function (config, $rootScope) {
        return {
            restrict: 'E',
            link: function (scope, iElement, iAttrs) {

                // Broadcast paragraph clicks using live selector so it also
                // includes paragraphs that are added dynamically in the DOM
                // after the page initially loaded

                // This will require the full jQuery library as the jqLite does
                // not support live selectors

                angular.element(document).on('click', 'p', function(){
                    $rootScope.$broadcast('tagenvy:document:p:click', iElement, iAttrs);
                });

            }
        };
    }]);