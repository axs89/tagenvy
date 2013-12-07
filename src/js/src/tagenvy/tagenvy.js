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

// Common module
angular.module('tagenvy.common.directives', []);
angular.module('tagenvy.common.services', []);
angular.module('tagenvy.common',
    [
        'ng',
        'tagenvy.config',
        'tagenvy.common.directives',
        'tagenvy.common.services'
    ]);

// Main module
angular.module('tagenvy',
    [
        'ng',
        'tagenvy.config',
        'tagenvy.common'
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
     * Placeholder for the AngularJS $log
     */
    this.$log = void 0;

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
            //$log.log('TagEnvy automatic bootstrapping skipped!');
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

    // Bootstrap tagenvy.client module and save injector
    this.$injector = angular.bootstrap(document, ['tagenvy.client']);

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

    // Instantiate $log
    this.$log = this.$injector.get('$log');

    // Run ready listeners
    this.runReadyCallbacks();
};

/**
 * Instantiate globally accessible tagenvy instance
 */
window.tagenvy = new TagEnvy(config);