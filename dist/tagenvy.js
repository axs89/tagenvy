(function(window, document) {

/**
 * Global configuration that is used by TagEnvy.
 *
 * It is passed to tagenvy global instance and to the AngularJS module
 */

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('tagenvy.config', []);

// Main module
angular.module('tagenvy.services', []);
angular.module('tagenvy',
    [
        'ng',
        'tagenvy.config',
        'tagenvy.services'
    ]);

// Common module
angular.module('tagenvy.common.directives', []);
angular.module('tagenvy.common.services', []);
angular.module('tagenvy.common',
    [
        'tagenvy',
        'tagenvy.common.directives',
        'tagenvy.common.services'
    ]);

/**
 * Create TagEnvy constructor
 *
 * @constructor
 */

var TagEnvy = function TagEnvy(config){

    /**
     * Placeholder for the AngularJS injector
     */
    this.$injector = void 0;

    /**
     * Placeholder for the AngularJS root scope
     */
    this.$rootScope = void 0;

    /**
     * Placeholder for the log service
     */
    this.log = void 0;

    /**
     * Placeholder for the location service
     */
    this.location = void 0;

    /**
     * Placeholder for the callbacks that need to be called when tagenvy is ready
     */
    this._readyCallbacks = [];

    /**
     * Placeholder to keep track if AngularJS module is already bootstrapped
     */
    this._angularBootstrapped = false;

    /**
     * Configuration object
     */
    this.config = {

        // Enable debug mode to log debug messages in the console
        debug: true,

        location: {

            // Enable or disable HTML5 mode for location parsing
            html5Mode: true
        },

        autoBootstrap: true
    };

    /**
     * Override config settings if config is passed in
     */
    if(angular.isObject(config)) {
        angular.extend(this.config, config);
    }

    /**
     * Automatic bootstrap
     */

    if(this.config.autoBootstrap){
        // Call bootstrap method when document is ready
        var tagenvy = this;
        angular.element(document).ready(
            (function(tagenvy){
                return function() {

                    // Perform bootstrap
                    tagenvy.bootstrap();
                };
            })(tagenvy)
        );
    }
};

/**
 * Register event listener
 *
 * @param eventName
 * @param listener
 * @returns {*|function()} Returns a function to unregister this listener
 */
TagEnvy.prototype.on = function(eventName, listener){
    return this.$rootScope.$on(eventName, listener);
};

/**
 * Register callback that is run when tagenvy is ready
 *
 * @param callback
 */
TagEnvy.prototype.ready = function(callback){
    this._readyCallbacks.push(callback);
};

/**
 * Run the registered callbacks
 */
TagEnvy.prototype.runReadyCallbacks = function(){
    angular.forEach(this._readyCallbacks, function(callback){
        callback();
    });

    // Broadcast event that tagenvy is ready
    this.$rootScope.$broadcast('tagenvy:ready');
};

/**
 * Bootstrap function
 */
TagEnvy.prototype.bootstrap = function(){

    // Bootstrap Angular
    if(this._angularBootstrapped === false){

        var tagenvy = this;

        // Configure Angular components before bootstrapping
        angular.module('tagenvy.config')
            .value('tagenvy.config', tagenvy.config);

        angular.module('tagenvy')
            .config(['$locationProvider', function($locationProvider){
                $locationProvider.html5Mode(tagenvy.config.location.html5Mode);
            }]);

        // Bootstrap tagenvy.client module and save injector
        this.$injector = angular.bootstrap(document, ['tagenvy.common']);

        this._angularBootstrapped = true;
    }

    // Run post bootstrap tasks
    this.postBootstrap();
};

/**
 * Functions that performs initialization that runs post bootstrap
 *
 * This is isolated so it can be run separately in unit tests
 */
TagEnvy.prototype.postBootstrap = function(){

    // Instantiate $rootscope from $injector
    this.$rootScope = this.$injector.get('$rootScope');

    // Instantiate log helper service
    this.log = this.$injector.get('log');

    // Instantiate location helper service
    this.location = this.$injector.get('location');

    // Run ready listeners
    this.runReadyCallbacks();
};

/**
 * Instantiate globally accessible TagEnvy constructor
 */
window.TagEnvy = TagEnvy;/**
 * @ngdoc object
 * @name service:location
 *
 * @description
 * Service factory for location object
 *
 * Wrapper for the AngularJS $location service to prevent
 * tampering with location if necessary.
 *
 * Currently just wraps the $location service without changes.
 *
 */

angular.module('tagenvy.services')
    .factory('location', ['$location', function ($location) {

        return $location;

    }]);/**
 * @ngdoc object
 * @name service:log
 *
 * @description
 * Service factory for log object
 *
 * Wrapper for the AngularJS $log service.
 *
 * Currently just wraps the $log service without changes.
 *
 */

angular.module('tagenvy.services')
    .factory('log', ['$log', function ($log) {

        return $log;

    }]);/**
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
    }]);/**
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
    }]);/**
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
    }]);})(window, document);