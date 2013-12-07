/**
 * @ngdoc directive
 * @name tagenvy.directive:body
 *
 * @description
 * Directive to work with body element
 */

angular.module('tagenvy.common.directives')
    .directive('body', ['tagenvy.config', '$rootScope', '$log', function (config, $rootScope, $log) {
        return {
            restrict: 'E',
            link: function (scope, iElement, iAttrs) {

                // Create array of class names
                var classNames = [];
                if (iAttrs.class){
                    classNames = iAttrs.class.split(/\s+/);
                }

                var bodyId = iAttrs.id || void 0;

                // Fire events when DOM is ready to allow <script>
                // elements to add listeners before the events are fired.
                iElement.ready(function(){

                    if (config.debug) $log.log('Body directive broadcasts: tagenvy:body:init');
                    $rootScope.$broadcast('tagenvy:body:init', iElement, iAttrs);

                    if (config.debug) $log.log('Body directive broadcasts: tagenvy:common:init');
                    $rootScope.$broadcast('tagenvy:common:init', iElement, iAttrs);

                    angular.forEach(classNames, function(className){

                        if (config.debug) $log.log('Body directive broadcasts: tagenvy:' + className + ':init');
                        $rootScope.$broadcast('tagenvy:' + className + ':init', iElement, iAttrs);

                        if(bodyId){
                            if (config.debug) $log.log('Body directive broadcasts: tagenvy:' + className + ':' + bodyId);
                            $rootScope.$broadcast('tagenvy:' + className + ':' + bodyId, iElement, iAttrs);
                        }

                    });

                    if (config.debug) $log.log('Body directive broadcasts: tagenvy:common:finalize');
                    $rootScope.$broadcast('tagenvy:common:finalize', iElement, iAttrs);

                });



            }
        };
    }]);