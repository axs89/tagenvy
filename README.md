# TagEnvy

The TagEnvy analytics framework

## Quick

## Events

TagEnvy will broadcast events when certain actions take place on the page.

The event listener function format is `function(event, args)`.

All event names are prefixed with `tagenvy:` and you can define listeners to listen to any of the following events:

### tagenvy

    // Listen to tagenvy ready event which is fired when tagenvy is ready to run
    tagenvy.on('tagenvy:ready', function(){...});

### tagenvy:body

    // Listen to body initialization event
    tagenvy.on('tagenvy:body:init', function(){...});

### tagenvy:p

    // Listen to click event on p elements
    tagenvy.on('tagenvy:p:click', function(){...});

## Change log

### 0.2.0

- Added TagEnvy automatic bootstrapping
- Added tagenvy:ready event
- Added tagenvy:body:init event
- Added tagenvy:p:click event
- Added automatic building of dist/tagenvy-with-dependecies.js

### 0.1.0

- Initial release
- Added modular source code layout
- Added build configuration

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
