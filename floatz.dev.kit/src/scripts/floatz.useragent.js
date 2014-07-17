/**
 * useragent.js
 *
 * User agent module that allows to check for specific browsers, versions and devices.
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

/**
 * TODO Test for different user agent strings.
 * TODO Other platforms? Firefox OS, Blackberry?
 */



window.floatz.userAgent = (function () {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Enumarations */
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
			WINPHONE: "Windows Phone"
		},

		ENGINE: {
			GECKO: "Gecko",
			MOZILLA: "Mozilla",
			PRESTO: "Presto",
			WEBKIT: "Webkit"
		},

		/* Fields */
		module: {
			name: "floatz.browser",
			version: "1.3.0",
			start: start
		},


		/* User agent fields */
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
		isDevice: isDevice
	};

	////////////////////////////////////////////////////
	// Private variables

	var floatz = window.floatz;
	var module = self.module;
	var BROWSER = self.BROWSER;
	var PLATFORM = self.PLATFORM;
	var DEVICE = self.DEVICE;
	var ENGINE = self.ENGINE;

	////////////////////////////////////////////////////
	// Private functions

	/**
	 * Start module.
	 *
	 * @since 1.2.0
	 */
	function start() {
		floatz.log(floatz.LOGLEVEL.DEBUG, navigator.userAgent, module.name);

		// Analyze user agent
		analyze(navigator.userAgent);

		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	/**
	 * Analyze user agent.
	 * @param agent User agent string
	 * @since 1.3.0
	 */
	function analyze(agent) {

		var ua = agent.toLowerCase();

		// Read browser and version
		if (/chrome/.test(ua)) {
			self.browser = BROWSER.CHROME;
		} else if (/firefox/.test(ua)) {
			self.browser = BROWSER.FIREFOX;
		} else if (/msie/.test(ua) && !/opera/.test(ua)) {
			self.browser = BROWSER.MSIE;
		} else if (/opera/.test(ua)) {
			self.browser = BROWSER.OPERA;
		} else if (/webkit/.test(ua) && !/chrome/.test(ua)) {
			self.browser = BROWSER.SAFARI;
		}
		self.browserVersion = (ua.match(/.+(?:rv|it|ra|ie|me|ve|ion)[\/: ]([\d.]+)/) || [])[1];

		// Read device and version
		if (/ipad/.test(ua)) {
			self.device = DEVICE.IPAD
		} else if (/iphone|ipod/.test(ua)) {
			self.device = DEVICE.IPHONE;
		} else if (/windows\ phone/.test(ua)) {
			self.device = DEVICE.WINPHONE;
		}

		// Read platform and version
		if (/iphone|ipod/.test(ua) || /ipad/.test(ua)) {
			self.platform = PLATFORM.IOS;
			self.platformVersion = self.device === "iphone" ?
				(self.match(/.+(?:iphone\ os)[\/: ]([\d_]+)/) || [0, 0])[1].toString().split('_').join('.') :
				(self.match(/.+(?:cpu\ os)[\/: ]([\d_]+)/) || [0, 0])[1].toString().split('_').join('.');
		} else if (/android/.test(ua)) {
			self.platform = PLATFORM.ANDROID;
			self.platformVersion = "" + (ua.match(/.+(?:android)[\/: ]([\d.]+)/) || [0, 0])[1];
		} else if (/windows\ phone/.test(ua)) {
			self.platform = PLATFORM.WINPHONE;
			self.platformVersion = "" + (ua.match(/.+(?:windows\ phone\ os)[\/: ]([\d_]+)/) || [0, 0])[1];
		} else if (/macintosh/.test(ua)) {
			self.platform = PLATFORM.MAC;
		} else if (/windows/.test(ua)) {
			self.platform = PLATFORM.WIN;
		} else if (/linux/.test(ua)) {
			self.platform = PLATFORM.LINUX;
		} else if (/cros/.test(ua)) {
			self.platform = PLATFORM.CHROMEOS;
		}

		// Read device based on platform if empty
		if (self.device === null) {
			self.device = self.platform === "mac" || self.platform === "win" || self.platform === "linux" || self.platform === "chromeos" ? "desktop" : "n.a.";
		}

		// Read engine
		if (/[^like]{4} gecko/.test(ua)) {
			self.engine = ENGINE.GECKO;
		} else if (/mozilla/.test(ua) && !/(compatible|webkit)/.test(ua)) {
			self.engine = ENGINE.MOZILLA;
		} else if (/presto/.test(ua)) {
			self.engine = ENGINE.PRESTO;
		} else if (/webkit/.test(ua)) {
			self.engine = ENGINE.WEBKIT;
		}
	}

	/**
	 * Check if mobile webkit browser.
	 *
	 * @return {boolean} true if mobile webkit, false if not
	 * @since 1.2.0
	 */
	function isMobileWebkit() {
		return self.engine === ENGINE.WEBKIT && (self.PLATFORM === PLATFORM.ANDROID || self.PLATFORM === PLATFORM.IOS);
	}

	/**
	 * Check if mobile browser.
	 *
	 * @return true if mobile, false if not
	 * @since 1.2.0
	 */
	function isMobile() {
		return self.android || self.iphone || self.ipad || self.winPhone;
	}

	/**
	 * Check browser.
	 * @param browser Browser contant
	 * @returns {boolean} true if browser, false if not
	 * @since 1.3.0
	 */
	function isBrowser(browser) {
		return self.browser === browser;
	}

	/**
	 * Check engine.
	 * @param engine Engine constant
	 * @returns {boolean} true if engine, false if not
	 * @since 1.3.0
	 */
	function isEngine(engine) {
		return self.engine === engine;
	}

	/**
	 * Check platform.
	 * @param platform Platform constant
	 * @returns {boolean} true if platform, false if not
	 * @since 1.3.0
	 */
	function isPlatform(platform) {
		return self.platform === platform;
	}

	/**
	 * Check device.
	 * @param device Device constant
	 * @returns {boolean} true if device, false if not
	 * @since 1.3.0
	 */
	function isDevice(device) {
		return self.device === device;
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}());
