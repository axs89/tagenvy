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

    // Broadcast event that tagenvy is ready
    this.$rootScope.$broadcast('tagenvy:ready');
    console.log('broadcast tagenvy:ready');
    console.dir(this);
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

    // Run ready listeners
    this.runReadyCallbacks();
};

console.log('Instantiate window.tagenvy');
window.tagenvy = new TagEnvy();

// Bootstrap automatically when document is ready
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