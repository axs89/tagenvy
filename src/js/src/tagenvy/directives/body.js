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

                // Create array of class names
                var classNames = [];
                if (iAttrs.class){
                    classNames = iAttrs.class.split(/\s+/);
                }

                var bodyId = iAttrs.id || void 0;

                // Broadcast events when the body is ready
                angular.element(iElement).ready(function(){

                    if (config.debug) console.log('tagenvy:body:init');
                    $rootScope.$broadcast('tagenvy:body:init', $location);

                    if (config.debug) console.log('tagenvy:common:init');
                    $rootScope.$broadcast('tagenvy:common:init', $location);

                    angular.forEach(classNames, function(className){

                        if (config.debug) console.log('tagenvy:' + className + ':init');
                        $rootScope.$broadcast('tagenvy:' + className + ':init', $location);

                        if(bodyId){
                            if (config.debug) console.log('tagenvy:' + className + ':' + bodyId);
                            $rootScope.$broadcast('tagenvy:' + className + ':' + bodyId, $location);
                        }

                    });

                    if (config.debug) console.log('tagenvy:common:finalize');
                    $rootScope.$broadcast('tagenvy:common:finalize', $location);

                });

            }
        };
    }]);