# TagEnvy

The TagEnvy analytics framework

## Quickstart

First make sure `tagenvy-with-dependencies.js` is loaded on your page:

    <script src="tagenvy-with-dependencies.js"></script>

Then use the `tagenvy` global object to add as much event listeners as you like:

    <script>
        tagenvy.ready(function(){

            // Listen for p elements that are clicked
            tagenvy.on('tagenvy:p:click', function(){

                // Code you want to run
            });

            // Listen for body elements that are initialized
            tagenvy.on('tagenvy:body:init', function(){

                // Code you want to run
            });

        });
    </script>

## Events

TagEnvy will broadcast events when certain actions take place on the page.

The event listener function format is `function(event, args)`.

All event names are prefixed with `tagenvy:` and you can define listeners to listen to any of the following events:

### tagenvy:*

    // Listen to tagenvy ready event which is fired when tagenvy is ready to run
    tagenvy.on('tagenvy:ready', function(){...});

### tagenvy:body:*

    // Listen to body initialization event
    tagenvy.on('tagenvy:body:init', function(){...});

### tagenvy:p:*

    // Listen to click event on p elements
    tagenvy.on('tagenvy:p:click', function(){...});

## Demo

There is a [demo](examples/index.html) available in the [examples](examples) folder.

To run the demo locally, you can clone this repository and run:

    $ bower install // To install the bower components

    $ grunt // To build the dist files

    $ grunt serve // To start a local web server

Then navigate your browser to:

    http://localhost:9000/examples/index.html

## Change log

### 0.4.0

- Added support for unit tests
- Added support for skipping automatic bootstrapping

### 0.3.0

- Added live selectors support (using jQuery)
- Added tagenvy:document:p:click event to demonstrate live selectors
- Updated example with live selector

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
