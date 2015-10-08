/*

	ractive-decorators-noUiSlider
	=============================================

	Integrate Ractive with noUiSlider

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/ractive.js'></script>
	    <script src='lib/ractive-decorators-noUiSlider.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'ractive-decorators-noUiSlider' );

*/

(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ), require( 'noUiSlider' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive', 'noUiSlider' ], factory );
	}

	// browser global
	else if ( global.Ractive && global.noUiSlider) {
		factory( global.Ractive, global.noUiSlider );
	}

	else {
		throw new Error( 'Could not find Ractive and noUiSlider! They must be loaded before the ractive-decorators-noUiSlider plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive, noUiSlider ) {

	'use strict';

    var noUiSliderDecorator;

    noUiSliderDecorator = function (node, type) {

        var ractive = node._ractive.root;
        var setting = false;
        var observer;

        var options = {};
        if (type) {
            if (!noUiSliderDecorator.type.hasOwnProperty(type)) {
                throw new Error( 'Ractive noUiSlider type "' + type + '" is not defined!' );
            }

            options = noUiSliderDecorator.type[type];
            if (typeof options === 'function') {
                options = options.call(this, node);
            }
        }

        var sliderNode = document.createElement('div');
        node.parentNode.insertBefore(sliderNode, node.nextSibling);
        noUiSlider.create(sliderNode, options);

        // Push changes from ractive to noUiSlider
        if (node._ractive.binding) {
            observer = ractive.observe(node._ractive.binding.keypath.str, function (newvalue) {
                if (!setting) {
                    setting = true;
                    window.setTimeout(function () {
                        sliderNode.noUiSlider.set(newvalue);
                        setting = false;
                    }, 0);
                }
            });
        }

        // Pull changes from noUiSlider to ractive
        sliderNode.noUiSlider.on('change', function (value) {
            if (!setting) {
                setting = true;
                ractive.set(node._ractive.binding.keypath.str, value);
                setting = false;
            }
        });

        return {
            teardown: function () {
                node.noUiSlider.destroy();

                if (observer) {
                    observer.cancel();
                }
            }
        };
    };

    noUiSliderDecorator.type = {};

    Ractive.decorators.noUiSlider = noUiSliderDecorator;

}));
