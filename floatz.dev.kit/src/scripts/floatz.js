/**
 * floatz.js
 *
 * Base module that manages all floatz specific modules and provides some utility methods.
 *
 * Note: This file contains optional javascript code that progressively enhances browser
 * capabilities in circumstances where no HTML & CSS only solution is available.
 *
 * Depends on: jQuery, UAParser
 *
 * @project       floatz CSS Framework
 * @version       1.3.0
 * @since         1.2.0
 * @see           https://github.com/floatzcss/floatz
 * @author        Harald Humml
 * @copyright     Copyright (c) 1998-2015 by :hummldesign
 * @link          http://www.floatzcss.com
 * @license       Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0
 * @lastmodified  2015-02-20
 */

window.floatz = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Enumarations */
		LOGLEVEL: {
			ERROR: 0,
			WARN: 1,
			INFO: 2,
			DEBUG: 3
		},

		/* Fields */
		loadedModules: [],
		module: {
			name: "floatz",
			version: "1.3.0"
		},

		/* Methods */
		start: start,
		log: log,

		/* String utilities */
		string: {
			lpad: lpad,
			rpad: rpad
		},

		/* User agent - Filled in init code at the bottom */
		userAgent: window.UAParser ? new UAParser().getResult() : {},
		isMobileWebkit: isMobileWebkit,
		isMobile: isMobile
	};

	////////////////////////////////////////////////////
	// Private variables

	var LOGLEVEL = self.LOGLEVEL;
	var loadedModules = self.loadedModules;
	var ua = self.userAgent;
	var module = self.module;
	var config = {
		debug: false,
		logLevel: LOGLEVEL.DEBUG /* Use only in dev mode */
	};

	////////////////////////////////////////////////////
	// Private functions

	/**
	 * Start floatz and all configured modules.
	 *
	 * start();
	 * start(<config>);
	 *
	 * @param options Configuration options {
	 *			[debug : true|false][,]
	 *			[logLevel : floatz.LOGLEVEL.<level>][,]
	 *			[modules : { <modulename> [,<modulname>]}]
	 *		}
	 *
	 * @since 1.2.0
	 */
	function start(options) {

		var i, j;

		// Mix options and defaults
		updateConfig(options);

		// Show user agent info
		log(LOGLEVEL.INFO, self.userAgent.ua, module.name);

		// Find modules to start
		log(LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
		for (i = 0; i < loadedModules.length; i++) {

			// Start all loaded modules if nothing is configured
			var canStart = config.modules === undefined;
			if (!canStart) {

				// Check if module is configured to be started
				for (j = 0; j < config.modules.length; j++) {
					if (loadedModules[i].name === config.modules[j]) {
						canStart = true;
						break;
					}
				}
			}

			// Start module
			if (canStart) {
				loadedModules[i].start();
			}
		}

		// Show all modules in config that could not be loaded
		if (config.modules !== undefined && config.modules !== null) {
			for (i = 0; i < config.modules.length; i++) {
				var found = false;
				for (j = 0; j < loadedModules.length; j++) {
					if (config.modules[i] === loadedModules[j].name) {
						found = true;
					}
				}

				if (!found) {
					log(LOGLEVEL.ERROR, "Module " + config.modules[i] + " is invalid or not loaded", module.name);
				}
			}
		}

		// Execute function when floatz has been started
		if (config.onStarted !== undefined) {
			config.onStarted();
		}
	}

	/**
	 * Update config containing defaults with options.
	 *
	 * @param options Options
	 */
	function updateConfig(options) {
		if(options.debug !== null) {
			config.debug = options.debug;
		}
		if(options.logLevel != null) {
			config.logLevel = options.logLevel;
		}
		if(options.modules != null) {
			config["modules"] = options.modules;
		}
		if(options.onStarted != null) {
			config["onStarted"] = options.onStarted;
		}
	}

	/**
	 * Log into browser console.
	 *
	 * @param level Log level
	 * @param msg Log message
	 * @param context Context (e.g. module name)
	 * @since 1.2.0
	 */
	function log(level, msg, context) {

		// Check if console is available (IE 8 and below) and log level is allowed
		if (window.console  !== undefined && level <= config.logLevel) {
			console.log(rpad(context, " ", 20) + " | " + module.version + " | " +
			rpad(logLevelName(level), " ", 6) + " | " + msg);
		}
	}

	/**
	 * Get readable name for log level.
	 *
	 * @param level Log level
	 * @return {string} Name for log level
	 * @since 1.2.0
	 */
	// Get name for log level
	function logLevelName(level) {
		return level === LOGLEVEL.ERROR ? "ERROR" : level === LOGLEVEL.WARN ? "WARN" :
			level === LOGLEVEL.INFO ? "INFO" : level === LOGLEVEL.DEBUG ? "DEBUG" : "UNKOWN";
	}

	/**
	 * Right pad a string.
	 *
	 * @param str Original string
	 * @param c Padding character
	 * @param len Target length of the returned string
	 * @return Padded string
	 * @since 1.2.0
	 */
	function rpad(str, c, len) {
		if (!str || !c || str.length >= len) {
			return str;
		}

		var pstr = str;
		var max = (len - str.length) / c.length;
		for (var i = 0; i < max; i++) {
			pstr += c;
		}
		return pstr;
	}

	/**
	 * Left pad a string.
	 *
	 * @param str Original string
	 * @param c Padding character
	 * @param len Target length of the returned string
	 * @return Padded string
	 * @since 1.2.0
	 */
	function lpad(str, c, len) {
		if (!str || !c || str.length >= len) {
			return str;
		}

		var pstr = str;
		var max = (len - str.length) / c.length;
		for (var i = 0; i < max; i++) {
			pstr = c + pstr;
		}
		return pstr;
	}

	/**
	 * Check if mobile webkit browser.
	 *
	 * @return {boolean} true if mobile webkit, false if not
	 * @since 1.2.0
	 */
	function isMobileWebkit() {
		return ua.engine.name === "WebKit" && (ua.os.name === "Android" || ua.os.name === "iOS");
	}

	/**
	 * Check if mobile browser.
	 *
	 * @return {boolean} true if mobile, false if not
	 * @since 1.2.0
	 */
	function isMobile() {
		return ua.os.name === "Android" || ua.os.name === "iOS" || ua.os.name === "Windows Phone" || ua.os.name === "BlackBerry";
	}

	////////////////////////////////////////////////////
	// Init code

	// Check if dependent modules are loaded
	if(! window.UAParser) {
		log(LOGLEVEL.ERROR, "Module " + module.name + " depends on ua-parser.js which is not loaded", module.name);
		return;
	}

	log(LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, window.jQuery || null));