Ractive.js noUiSlider decorator plugin
======================================================

Integrate noUiSlider with Ractive, including two-way binding.

*Find more Ractive.js plugins at [ractivejs.org/plugins](http://docs.ractivejs.org/latest/plugins)*

[See the demo here.](http://keosion.github.io/ractive-decorators-noUiSlider/)

Usage
-----

Include this file on your page below Ractive, e.g:

```html
<script src='lib/ractive.js'></script>
<script src='lib/ractive-decorators-noUiSlider.js'></script>
```

Or, if you're using a module loader, require this module:

```js
// requiring the plugin will 'activate' it - no need to use the return value
require( 'ractive-decorators-noUiSlider' );
```

Add option objects to the `type` property to set noUiSlider constructor options:

```js
Ractive.decorators.noUiSlider.type.search = {
    range: {'min': 0, 'max': 100}, 
    step: 5,
    start: 50, 
    margin: 10
    // ... other noUiSlider options
};
```

Add the decorator to your input elements:

```html
<input decorator='noUiSlider:demo' type='text' value='{{value}}'>
```

You can also use a function that returns an options object. The function is passed the DOM node the noUiSlider applies to:

```js
Ractive.decorators.noUiSlider.type.demo = function (node) {
    return {
        range: {'min': 0, 'max': 100}, 
        step: 5,
        start: 50, 
        margin: 10
        // ... other noUiSlider options
    }
};
```

License
-------

Copyright (C) 2004 Jeremy Bouquain <dev@utagawavtt.com>. Licenced WTFPL.

Created with the [Ractive.js plugin template](https://github.com/ractivejs/plugin-template) for Grunt.
