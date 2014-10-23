/**
 * panels.js
 *
 * TODO
 *
 * Depends on: floatz.js
 *
 * @project       floatz CSS Framework
 * @version       1.3.0
 * @since         1.3.0
 * @see           https://github.com/floatzcss/floatz
 * @author        Harald Humml
 * @copyright     Copyright (c) 1998-2014 by :humml:design
 * @link          http://www.floatzcss.com
 * @license       Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0
 * @lastmodified  2014-07-17
 */
window.floatz.panels = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Fields */
		module: {
			name: "floatz.panels",
			version: "1.3.0",
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
	 * @since 1.2.0
	 */
	function start() {
		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, jQuery));
