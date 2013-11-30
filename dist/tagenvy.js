(function(window, document) {

/**
 * Global configuration that is used by TagEnvy.
 *
 * It is passed to tagenvy global instance and to the AngularJS module
 */

var config = {

    // Enable debug mode to log debug messages in the console
    debug: true
};

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('tagenvy.config', [])
    .value('tagenvy.config', config);

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

angular.module('tagenvy.client', ['tagenvy']);

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
     * Placeholder for the callbacks that need to be called when tagenvy is ready
     */
    this._readyCallbacks = [];

    /**
     * Configuration object
     */
    this.config = {
        debug: true
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

    var tagenvy = this;

    // Call bootstrap method when document is ready
    angular.element(document).ready(function() {

        // Skip automatic bootstrapping if TAGENVY_SKIP_AUTOMATIC_BOOTSTRAPPING is set to true
        // Necessary to skip bootstrapping in unit tests
        if (window.TAGENVY_SKIP_AUTOMATIC_BOOTSTRAPPING === true){
            console.log('TagEnvy automatic bootstrapping skipped!');
            return;
        }

        // Perform bootstrap
        tagenvy.bootstrap();
    });
};

/**
 * Register event listener
 *
 * @param eventName
 * @param listener
 * @returns {*|function()} Returns a function to unregister this listener
 */
TagEnvy.prototype.on = function(eventName, listener){
    if (this.config.debug) console.log('Add listener: ' + eventName);
    return this.$rootScope.$on(eventName, listener);
};

/**
 * Register callback that is run when tagenvy is ready
 *
 * @param callback
 */
TagEnvy.prototype.ready = function(callback){
    if (this.config.debug) console.log('Add ready callback');
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
    if (this.config.debug) console.log('broadcast tagenvy:ready');
    if (this.config.debug) console.dir(this);
};

/**
 * Bootstrap function
 */
TagEnvy.prototype.bootstrap = function(){

    // Bootstrap tagenvy.client module and save injector
    this.$injector = angular.bootstrap(document, ['tagenvy.client']);

    // Instantiate $rootscope from $injector
    this.$rootScope = this.$injector.get('$rootScope');

    // Run post bootstrap tasks
    this.postBootstrap();
};

/**
 * Functions that performs initialization that runs post bootstrap
 *
 * This is isolated so it can be run separately in unit tests
 */
TagEnvy.prototype.postBootstrap = function(){

    // Run ready listeners
    this.runReadyCallbacks();
};

/**
 * Instantiate globally accessible tagenvy instance
 */
if (config.debug) console.log('Instantiate window.tagenvy');
window.tagenvy = new TagEnvy(config);/**
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
    }]);/**
 * @ngdoc directive
 * @name tagenvy.directive:document
 *
 * @description
 * Directive to work with document
 */

angular.module('tagenvy.directives')
    .directive('body', ['tagenvy.config', '$rootScope', function (config, $rootScope) {
        return {
            restrict: 'E',
            link: function (scope, iElement, iAttrs) {

                // Broadcast paragraph clicks using live selector so it also
                // includes paragraphs that are added dynamically in the DOM
                // after the page initially loaded

                // This will require the full jQuery library as the jqLite does
                // not support live selectors

                $(document).on('click', 'p', function(){
                    $rootScope.$broadcast('tagenvy:document:p:click');
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
    }]);})(window, document);