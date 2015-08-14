/**
 * floatz.scroller.js
 *
 * Scroller module that adds scrolling functionality to panels.
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
window.floatz.scroller = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Fields */
		module: {
			name: "floatz.scroller",
			version: "1.4.0",
			start: start
		}
	};

	////////////////////////////////////////////////////
	// Private variables

	var module = self.module;

	////////////////////////////////////////////////////
	// Private functions

	/**
	 * Start module.
	 *
	 * @since 1.1.0
	 */
	function start() {

		// Check if dependent modules are loaded
		if(! $) {
			floatz.log(floatz.LOGLEVEL.ERROR, "Module " + module.name + " depends on jquery.js which is not loaded", module.name);
			return;
		}
		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz,  window.jQuery || null));
