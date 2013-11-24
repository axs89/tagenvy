(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('tagenvy.config', [])
    .value('tagenvy.config', {
        debug: true
    });

// Modules
angular.module('tagenvy.controllers', []);
angular.module('tagenvy.directives', []);
angular.module('tagenvy.filters', []);
angular.module('tagenvy.services', []);
angular.module('tagenvy',
    [
        'ng',
        'tagenvy.config',
        'tagenvy.controllers',
        'tagenvy.directives',
        'tagenvy.filters',
        'tagenvy.services'
    ]);

angular.module('tagenvy')
    .run(function(){
        console.log('tagenvy module loaded!');
    });

angular.module('tagenvy.client', ['tagenvy']);

var TagEnvy = function TagEnvy(){
    this.$injector = void 0;
    this.$rootScope = void 0;
    this._readyCallbacks = [];
};

/**
 * Register event listener
 *
 * @param eventName
 * @param listener
 * @returns {*|function()} Returns a function to unregister this listener
 */
TagEnvy.prototype.on = function(eventName, listener){
    console.log('Add listener: ' + eventName);
    return this.$rootScope.$on(eventName, listener);
};

/**
 * Register callback that is run when tagenvy is ready
 *
 * @param callback
 */
TagEnvy.prototype.ready = function(callback){
    console.log('Add ready callback');
    this._readyCallbacks.push(callback);
};

/**
 * Run the registered callbacks
 */
TagEnvy.prototype.runReadyCallbacks = function(){
    angular.forEach(this._readyCallbacks, function(callback){
        callback();
    });
};

console.log('Instantiate window.tagenvy');
window.tagenvy = new TagEnvy();

// window.tagenvy = angular.module('tagenvy.client');

// Bootstrap automatically when document is ready
angular.element(document).ready(function() {

    // Bootstrap tagenvy.client module
    console.log('Bootstrap tagenvy.client module');

    // Bootstrap tagenvy.client module and save injector
    window.tagenvy.$injector = angular.bootstrap(document, ['tagenvy.client']);

    // Instantiate rootscope from injector
    window.tagenvy.$rootScope = window.tagenvy.$injector.get('$rootScope');

    // Run ready listeners
    window.tagenvy.runReadyCallbacks();

    // Broadcast event that tagenvy is ready
    window.tagenvy.$rootScope.$broadcast('tagenvy:ready');
    console.log('broadcast tagenvy:ready');
    console.dir(window.tagenvy);
});/**
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
    }]);/**
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
    }]);/**
 * @ngdoc object
 * @name service:logger
 * @requires $log
 *
 * @description
 * Simple service for logging. Default implementation writes the message
 * into the browser's console (if present).
 *
 * The main purpose of this service is to simplify debugging and troubleshooting.
 *
 * This service proxies all methods to the AngularJS $log service and offers
 * one extra method: dir.
 *
 * The dir method can be used to hierarchically display object properties.
 *
 * @example
 <example>
 <file name="script.js">
 function LogCtrl($scope, logger) {
         $scope.logger = logger;
         $scope.message = 'Hello World!';
       }
 </file>
 <file name="index.html">
 <div ng-controller="LogCtrl">
 <p>Reload this page with open console, enter text and hit the log button...</p>
 Message:
 <input type="text" ng-model="message"/>
 <button ng-click="logger.log(message)">log</button>
 <button ng-click="logger.warn(message)">warn</button>
 <button ng-click="logger.info(message)">info</button>
 <button ng-click="logger.error(message)">error</button>
 <button ng-click="logger.dir(message)">dir</button>
 </div>
 </file>
 </example>
 */

angular.module('tagenvy.services')
    .factory('logger', ['$log', function ($log) {

        // Create service
        var service = {};

        // Proxy regular methods to $log
        angular.forEach(['log', 'info', 'warn', 'error'], function (method) {
            service[method] = function () {
                return $log[method](arguments);
            };
        });


        // Add dir method to hierarchically display objects
        service.dir = function (obj, title) {
            if (window.console) {
                if (angular.isDefined(title)) {
                    $log.info(title + ':');
                }
                window.console.dir(obj);
            }
        };

        return service;
    }]);})(window, document);