/**
 * browser.js
 * 
 * Browser module that allows to check for specific browsers, versions and devices.
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

window.floatz.browser = (function() {
	"use strict";
	
	////////////////////////////////////////////////////
	// Private variables

	var userAgent = navigator.userAgent.toLowerCase();
	
	////////////////////////////////////////////////////
	// Public interface

	var self = {
			
		/* Fields */
		module : {
			name : "floatz.browser",
			version : "1.3.0",
			start : start
		},

		/* Fields to indicate browsers and devices */
		android: /android/.test(userAgent),
		androidVersion: "" + (userAgent.match(/.+(?:android)[\/: ]([\d.]+)/) || [0,0])[1],
		chrome: /chrome/.test(userAgent),
		firefox: /firefox/.test(userAgent),
		gecko: /[^like]{4} gecko/.test(userAgent),
		ipad: /ipad/.test(userAgent),
		ipadVersion: (userAgent.match( /.+(?:cpu\ os)[\/: ]([\d_]+)/) || [0,0])[1].toString().split('_').join('.'),
		iphone: /iphone|ipod/.test(userAgent),
		iphoneVersion: (userAgent.match(/.+(?:iphone\ os)[\/: ]([\d_]+)/) || [0,0])[1].toString().split('_').join('.'),
		mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
		msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
		opera: /opera/.test(userAgent),
		presto: /presto/.test(userAgent),
		safari: /webkit/.test(userAgent) && !/chrome/.test(userAgent),
		version : (userAgent.match( /.+(?:rv|it|ra|ie|me|ve)[\/: ]([\d.]+)/) || [])[1],
		webkit: $.browser.webkit === undefined ? false : $.browser.webkit,
		winPhone: /Windows\ Phone/.test(userAgent),
		winPhoneVersion: "" + (userAgent.match( /.+(?:windows\ phone\ os)[\/: ]([\d_]+)/ ) || [0,0])[1],
		isMobileWebkit : isMobileWebkit,
		isMobile : isMobile
	};
	
	////////////////////////////////////////////////////
	// Private variables

	var floatz = window.floatz;
	var module = self.module;
	
	////////////////////////////////////////////////////
	// Private functions

   /**
	* Start module.
	*
    * @since 1.2.0
	*/
	function start() {
		floatz.log(floatz.LOGLEVEL.DEBUG, userAgent, module.name);
		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}	
	
	/**
	 * Check if mobile webkit browser.
	 * 
	 * @return true if mobile webkit, false if not
	 * @since 1.2.0
	 */
	function isMobileWebkit() {
		return self.webkit && (self.android || self.iphone || self.ipad);
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
		
	////////////////////////////////////////////////////
	// Init code
	
	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);
	
	// Return public interface
	return self;
}());
