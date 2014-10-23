/**
 * mobile.js
 *
 * Mobile module that adds some fixes to mobile webkit browsers.
 *
 * Note: This file contains optional javascript code that progressively enhances browser
 * capabilities in circumstances where no HTML & CSS only solution is available.
 *
 * Depends on: floatz.js
 *
 * @project       floatz CSS Framework
 * @version       1.3.0
 * @since         1.2.0
 * @see           https://github.com/floatzcss/floatz
 * @author        Harald Humml
 * @copyright     Copyright (c) 1998-2014 by :humml:design
 * @link          http://www.floatzcss.com
 * @license       Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0
 * @lastmodified  2014-07-17
 */
window.floatz.mobile = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Fields */
		module: {
			name: "floatz.mobile",
			version: "1.3.0",
			start: start,
			bind: bind
		},

		/* Bind to DOM (re-bind safe) */
		bind: bind
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

		// Optimize mobile webkit behavior
		if (floatz.isMobileWebkit()) {

			////////
			// TODO - Check if -webkit-text-size-adjust: 100% would solve that problem directly in CSS?
			////////

			// Prevent unpredictable automatic resizing of fonts on iOS devices
			// See: http://blog.55minutes.com/2012/04/iphone-text-resizing/
			if (document.styleSheets.length > 0) {
				floatz.log(floatz.LOGLEVEL.DEBUG, "Adding -webkit-text-size-adjust: none to * in mobile webkit", module.name);
				document.styleSheets[0].addRule("*", "-webkit-text-size-adjust: none;");
			} else {
				floatz.log(floatz.LOGLEVEL.ERROR, "Adding mobile webkit specific styles failed. Please load the stylesheets before the script modules.", module.name);
			}

			// Bind module features to DOM
			bind();
		}

		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	/**
	 * Bind module to DOM.
	 *
	 * This method can be called more than once for re-binding (e.g. when new markup is loaded dynamically to the DOM)
	 *
	 * @since 1.2.0
	 */
	function bind() {

		// Smooth scrolling for scrollable panels on mobile iOS devices
		// See: http://johanbrook.com/browsers/native-momentum-scrolling-ios-5/
		floatz.log(floatz.LOGLEVEL.DEBUG, "Adding -webkit-overflow-scrolling: touch to flz_scrollbar, flz_scrollbox on mobile webkit", module.name);
		floatz.log(floatz.LOGLEVEL.DEBUG, "Adding overflow:scroll to flz_scrollpanel, flz_scrollbox on mobile webkit", module.name);
		$(".flz_scrollpanel, .flz_scrollbox").css("-webkit-overflow-scrolling", "touch").css("overflow", "scroll");
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, jQuery));
