/**
 * @ngdoc directive
 * @name tagenvy.directive:p
 *
 * @description
 * Directive to work with paragraph elements
 */

angular.module('tagenvy.common.directives')
    .directive('p', ['tagenvy.config', '$rootScope', '$log', function (config, $rootScope, $log) {
        return {
            restrict: 'E',
            link    : function (scope, iElement, iAttrs) {

                // Broadcast click events
                iElement.bind('click', function () {
                    if (config.debug) $log.log('Broadcast tagenvy:p:click event');
                    $rootScope.$broadcast('tagenvy:p:click', iElement, iAttrs);
                });

            }
        };
    }]);