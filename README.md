# TagEnvy

The TagEnvy analytics framework is an opinionated framework that allows you to easily attach custom callbacks to page events.

## Quickstart

First make sure `tagenvy-with-dependencies.js` is loaded on your page:

    <script src="tagenvy-with-dependencies.js"></script>

Then use the `TagEnvy` global constructor to create a TagEnvy instance:

    var tagenvy = new window.TagEnvy();

Then add as much event listeners as you like:

    tagenvy.ready(function(){

        // Listen for body elements that are initialized
        tagenvy.on('tagenvy:common:init', function(){

            // Code you want to run
        });

    });

## tagenvy.ready()

TagEnvy is designed to work in the background of your page so your the load time of your page is as least affected as possible.

As a consequence, if you write inline scripts to interact with TagEnvy using the `tagenvy` global object, it is possible that `tagenvy` is still processing the page contents and is not completely ready yet.

Therefore you should always write your code inside a `tagenvy.ready()` block to ensure everything is ready before your code is executed:

    // This will throw an error if tagenvy is not ready yet
    tagenvy.on('tagenvy:common:init', function(){
        // Don't do this
    });

    // Instead wrap it inside a tagenvy.ready() block to make sure you are good to go
    tagenvy.ready(function(){
        tagenvy.on('tagenvy:common:init', function(){
            // This is the correct way to add a listener
        });
    });

## Events

TagEnvy will broadcast events when certain actions take place on the page.

The event listener function format is `function(event, args)`.

All event names are prefixed with `tagenvy:` and you can define listeners to listen to any of the following events:

### tagenvy:*

    // Listen to tagenvy ready event which is fired when tagenvy is ready to run
    tagenvy.on('tagenvy:ready', function(){...});

### tagenvy:common:*

Suppose your code has a `body` tag like this:

    <body id="bodyId" class="bodyClassOne bodyClassTwo">

Then TagEnvy will broadcast the following events:

    tagenvy.on('tagenvy:common:init', function(){...});

    tagenvy.on('tagenvy:common:bodyClassOne:init', function(){...});

    tagenvy.on('tagenvy:common:bodyClassOne:bodyId', function(){...});

    tagenvy.on('tagenvy:common:bodyClassTwo:init', function(){...});

    tagenvy.on('tagenvy:common:bodyClassTwo:bodyId', function(){...});

    tagenvy.on('tagenvy:common:common:finalize', function(){...});

These events following the specifications of [this gist](https://gist.github.com/axs89/7558831).

## Event listeners

All listeners callbacks are passed the following arguments:

- event: event object
- element: the DOM element emitting the event wrapped as jQuery selection
- attributes: the attributes of the DOM element emitting the event

This allows you to use the jQuery syntaxt to investigate or manipulate the element:

    tagenvy.on('tagenvy:common:init', function(event, element, attributes){

        // Get element id
        element.attr('id');

        // Get element classes
        element.attr('class');

        // Check if element has class
        element.hasClass('someClass');

        // Get element content as text
        element.text();

        // Get element content as html
        element.html();

        // Etc... see jQuery documentation for all possible methods

    });

## Helper services

### tagenvy.log

You can use the `tagenvy.log` service to safely write messages to the browser console.

    tagenvy.ready(function(){

        tagenvy.log.debug('Log a debug message to the console');
        tagenvy.log.error('Log an error message to the console');
        tagenvy.log.info('Log an info message to the console');
        tagenvy.log.log('Log a message to the console');
        tagenvy.log.warn('Log a warning message to the console');

    });

### tagenvy.location

You can use the `tagenvy.location` service to parse the URL in the browser address bar.

Suppose your browser is at `http://localhost:9000/examples/location.html?one=bar&two=baz#foo`:

    tagenvy.ready(function(){

        tagenvy.location.absUrl(); // http://localhost:9000/examples/location.html?one=bar&two=baz#foo
        tagenvy.location.hash(); // foo
        tagenvy.location.host(); // localhost
        tagenvy.location.path(); // /examples/location.html
        tagenvy.location.port(); // 9000
        tagenvy.location.protocol(); // http
        tagenvy.location.search(); // { one: bar, two: baz }
        tagenvy.location.url(): /examples/location.html?one=bar&two=baz#foo

    });

## Demo

There are several examples available in the [examples](examples) folder.

To run the demo's locally, you can clone this repository and run:

    $ bower install // To install the bower components

    $ grunt // To build the dist files

    $ grunt serve // To start a local web server

Then navigate your browser to:

    http://localhost:9000/examples/index.html

## Change log

### 0.10.0
- Added example page to simulate behavior is specified in [this gist](https://gist.github.com/axs89/31ce27935b518e1d675f)
- Added support for passing in dynamic configuration as argument at instantiation

### 0.9.0

- Event listeners now have access to the DOM element (wrapped as jQuery selection)
- Added example page for working with an element
- Updated documentation

### 0.8.0

- Refactored tagenvy.$log service to tagenvy.log service
- Updated documentation

### 0.7.0

- Added tagenvy.location helper service
- Added example page for demonstrating use of tagenvy.location
- Updated documentation

### 0.6.0

- Added minified version of library with dependencies dist/tagenvy-with-dependecies.min.js
- Added tagenvy.$log helper service
- Updated documentation
- Removed console-shim dependency

### 0.5.0

- Added support for triggering events based on body id and class names as demonstrated in [this gist](https://gist.github.com/axs89/7558831)
- Added additional example page

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
- Added tagenvy:common:body:init event
- Added tagenvy:p:click event
- Added automatic building of dist/tagenvy-with-dependecies.js

### 0.1.0

- Initial release
- Added modular source code layout
- Added build configuration

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
