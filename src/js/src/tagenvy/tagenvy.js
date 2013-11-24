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
});