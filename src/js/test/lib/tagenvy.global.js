// Define global tagenvy object that does not bootstrap automatically
// The automatic bootstrap feature will attach to the document ready event, which is not
// convenient for testing purposes
// A global object is defined because only one AngularJS app can be bootstrapped to the same DOM element.
window.tagenvy = new window.TagEnvy({autoBootstrap: false});