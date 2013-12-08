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
window.TagEnvy = TagEnvy;