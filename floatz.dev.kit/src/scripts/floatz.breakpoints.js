/**
 * floatz.breakpoints.js
 *
 * Breakpoints module that adds breakpoint functionality for contextual layouts.
 *
 * Depends on: floatz.js
 *
 * @project       floatz CSS Framework
 * @version       1.4.0
 * @since         1.4.0
 * @see           https://github.com/floatzcss/floatz
 * @author        Harald Humml
 * @copyright     Copyright (c) 1998-2015 by :hummldesign
 * @link          http://www.floatzcss.com
 * @license       Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0
 * @lastmodified  2015-08-14
 */
window.floatz.breakpoints = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Fields */
		module: {
			name: "floatz.breakpoints",
			version: "1.4.0",
			start: start
		},
		add: add
	};

	////////////////////////////////////////////////////
	// Private variables

	var module = self.module;

	////////////////////////////////////////////////////
	// Private functions

	/**
	 * Start module.
	 *
	 * @since 1.4.0
	 */
	function start() {
		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	/**
	 * Add breakpoint.
	 * @param fn Callback function
	 */
	function add(fn) {
		fn();
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, jQuery));
