/**
 * floatz.js
 *
 * Base module that manages all floatz specific modules and provides some utility methods.
 *
 * Note: This file contains optional javascript code that progressively enhances browser
 * capabilities in circumstances where no HTML & CSS only solution is available.
 *
 * Depends on: jQuery
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

/**
 * TODO Test for different user agent strings.
 * TODO Other platforms? Firefox OS, Blackberry?
 * TODO Does not work in iOS?
 */


window.floatz = (function () {
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

        BROWSER: {
            CHROME: "Chrome",
            FIREFOX: "Firefox",
            MSIE: "Internet Explorer",
            OPERA: "Opera",
            SAFARI: "Safari"
        },

        PLATFORM: {
            ANDROID: "Android",
            CHROMEOS: "Chrome OS",
            IOS: "iOS",
            LINUX: "Linux",
            MAC: "Macintosh",
            WIN: "Windows",
            WINPHONE: "Windows Phone"
        },

        DEVICE: {
            IPAD: "iPad",
            IPHONE: "iPhone",
            WINPHONE: "Windows Phone",
            DESKTOP: "Desktop",
            NA: "n.a."
        },

        ENGINE: {
            GECKO: "Gecko",
            MOZILLA: "Mozilla",
            PRESTO: "Presto",
            WEBKIT: "Webkit"
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

        /* User agent */
        userAgent: {
            /* Fields */
            browser: "",
            browserVersion: "",
            device: "",
            engine: "",
            platform: "",
            platformVersion: "",

            /* Helper methods */
            isMobileWebkit: isMobileWebkit,
            isMobile: isMobile,
            isBrowser: isBrowser,
            isPlatform: isPlatform,
            isEngine: isEngine,
            isDevice: isDevice,
            analyze: analyzeUserAgent
        }
	};

	////////////////////////////////////////////////////
	// Private variables

	var LOGLEVEL = self.LOGLEVEL;
    var BROWSER = self.BROWSER;
    var PLATFORM = self.PLATFORM;
    var DEVICE = self.DEVICE;
    var ENGINE = self.ENGINE;
	var loadedModules = self.loadedModules;
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
	 * @param config Configuration options {
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
		$.extend(config, options);

        // Analyze user agent
        analyzeUserAgent(navigator.userAgent);

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

		// Execute function when floatz has been started
		if (config.onStarted !== undefined) {
			config.onStarted();
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
		if (window.console !== undefined && level <= config.logLevel) {
			console.log(rpad(context, " ", 20) + " | " + module.version + " | " +
				rpad(logLevelName(level), " ", 6) + " | " + msg);
		}
	}

	/**
	 * Get readable name for log level.
	 *
	 * @param Log level
	 * @return {string} Name for log level
	 * @since 1.2.0
	 */
		// Get name for log level
	function logLevelName(level) {
		return  level === LOGLEVEL.ERROR ? "ERROR" : level === LOGLEVEL.WARN ? "WARN" :
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
     * Analyze user agent.
     * @param agent User agent string
     * @since 1.3.0
     */
    function analyzeUserAgent(agent) {

        var ua = agent.toLowerCase();
        floatz.log(floatz.LOGLEVEL.DEBUG, ua, module.name);

        // Read browser and version
        if (/chrome/.test(ua)) {
            self.userAgent.browser = BROWSER.CHROME;
        } else if (/firefox/.test(ua)) {
            self.userAgent.browser = BROWSER.FIREFOX;
        } else if (/msie/.test(ua) && !/opera/.test(ua)) {
            self.userAgent.browser = BROWSER.MSIE;
        } else if (/opera/.test(ua)) {
            self.userAgent.browser = BROWSER.OPERA;
        } else if (/webkit/.test(ua) && !/chrome/.test(ua)) {
            self.userAgent.browser = BROWSER.SAFARI;
        }
        self.userAgent.browserVersion = (ua.match(/.+(?:rv|it|ra|ie|me|ve|ion)[\/: ]([\d.]+)/) || [])[1];

        // Read device and version
        if (/ipad/.test(ua)) {
            self.userAgent.device = DEVICE.IPAD
        } else if (/iphone|ipod/.test(ua)) {
            self.userAgent.device = DEVICE.IPHONE;
        } else if (/windows\ phone/.test(ua)) {
            self.userAgent.device = DEVICE.WINPHONE;
        }

        // Read platform and version
        if (/iphone|ipod/.test(ua) || /ipad/.test(ua)) {
            self.userAgent.platform = PLATFORM.IOS;
            self.userAgent.platformVersion = isDevice(DEVICE.IPHONE) ?
                (ua.match(/.+(?:iphone\ os)[\/: ]([\d_]+)/) || [0, 0])[1].toString().split('_').join('.') :
                (ua.match(/.+(?:cpu\ os)[\/: ]([\d_]+)/) || [0, 0])[1].toString().split('_').join('.');
        } else if (/android/.test(ua)) {
            self.userAgent.platform = PLATFORM.ANDROID;
            self.userAgent.platformVersion = "" + (ua.match(/.+(?:android)[\/: ]([\d.]+)/) || [0, 0])[1];
        } else if (/windows\ phone/.test(ua)) {
            self.userAgent.platform = PLATFORM.WINPHONE;
            self.userAgent.platformVersion = "" + (ua.match(/.+(?:windows\ phone\ os)[\/: ]([\d_]+)/) || [0, 0])[1];
        } else if (/macintosh/.test(ua)) {
            self.userAgent.platform = PLATFORM.MAC;
            self.userAgent.platformVersion = (ua.match(/.+(?:mac\ os x)[\/: ]([\d_.]+)/) || [0, 0])[1].toString().split('_').join('.');
        } else if (/windows/.test(ua)) {
            self.userAgent.platform = PLATFORM.WIN;
        } else if (/linux/.test(ua)) {
            self.userAgent.platform = PLATFORM.LINUX;
        } else if (/cros/.test(ua)) {
            self.userAgent.platform = PLATFORM.CHROMEOS;
        }

        // Read device based on platform if empty
        if (isDevice("")) {
            self.userAgent.device = isPlatform(PLATFORM.MAC) || isPlatform(PLATFORM.WIN) ||
                isPlatform(PLATFORM.LINUX) || isPlatform(PLATFORM.CHROMEOS) ? DEVICE.DESKTOP : DEVICE.NA;
        }

        // Read engine
        if (/[^like]{4} gecko/.test(ua)) {
            self.userAgent.engine = ENGINE.GECKO;
        } else if (/mozilla/.test(ua) && !/(compatible|webkit)/.test(ua)) {
            self.userAgent.engine = ENGINE.MOZILLA;
        } else if (/presto/.test(ua)) {
            self.userAgent.engine = ENGINE.PRESTO;
        } else if (/webkit/.test(ua)) {
            self.userAgent.engine = ENGINE.WEBKIT;
        }
    }

    /**
     * Check if mobile webkit browser.
     *
     * @return {boolean} true if mobile webkit, false if not
     * @since 1.2.0
     */
    function isMobileWebkit() {
        return isEngine(ENGINE.WEBKIT) && (isPlatform(PLATFORM.ANDROID) || isPlatform(PLATFORM.IOS));
    }

    /**
     * Check if mobile browser.
     *
     * @return {boolean} true if mobile, false if not
     * @since 1.2.0
     */
    function isMobile() {
        return isPlatform(PLATFORM.ANDROID) || isPlatform(PLATFORM.IOS) || isPlatform(PLATFORM.WINPHONE);
    }

    /**
     * Check browser.
     * @param browser Browser contant
     * @returns {boolean} true if browser, false if not
     * @since 1.3.0
     */
    function isBrowser(browser) {
        return self.userAgent.browser === browser;
    }

    /**
     * Check engine.
     * @param engine Engine constant
     * @returns {boolean} true if engine, false if not
     * @since 1.3.0
     */
    function isEngine(engine) {
        return self.userAgent.engine === engine;
    }

    /**
     * Check platform.
     * @param platform Platform constant
     * @returns {boolean} true if platform, false if not
     * @since 1.3.0
     */
    function isPlatform(platform) {
        return self.userAgent.platform === platform;
    }

    /**
     * Check device.
     * @param device Device constant
     * @returns {boolean} true if device, false if not
     * @since 1.3.0
     */
    function isDevice(device) {
        return self.userAgent.device === device;
    }

	////////////////////////////////////////////////////
	// Init code

	log(LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}());