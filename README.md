# TagEnvy

The TagEnvy analytics framework

## Quick

## Events

TagEnvy will broadcast events when certain actions take place on the page.

All event names are prefixed with `tagenvy:` and you can define listeners to listen to these events.

The event listener function format is `function(event, args)`.

Here is a list of events grouped by element:

### p

    // Listen to click events on p element
    tagenvy.on('tagenvy:p:click', function(){...});

## Change log

### 0.1.0

- Initial release
- Added modular source code layout
- Added build configuration

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
