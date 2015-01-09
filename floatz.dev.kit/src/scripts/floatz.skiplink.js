/**
 * skiplink.js
 *
 * Skiplink module that adds some fixes that are necessary for providing accessible
 * skip link functionality.
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
 * @copyright     Copyright (c) 1998-2015 by :hummldesign
 * @link          http://www.floatzcss.com
 * @license       Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0
 * @lastmodified  2014-07-17
 */
window.floatz.skiplink = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Fields */
		module: {
			name: "floatz.skiplink",
			version: "1.2.0",
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
		fixSkipLinks();
		fixSkipLinkAnchors();
		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	/**
	 * Initialize skip links.
	 *
	 * Adds click event handlers to all skip links within flz_skipnav. The click event
	 * handler sets the focus on skip link anchors when user clicks on skip link. This
	 * works only if every skip link anchor also has tabindex set to -1.
	 *
	 * @affected Chrome, Safari (Webkit), Opera
	 * @since 1.1.0
	 */
	function fixSkipLinks() {
		if (!floatz.isMobile() && (floatz.userAgent.engine.name === "WebKit" || floatz.userAgent.browser.name === "Opera")) {
			floatz.log(floatz.LOGLEVEL.DEBUG, "Adding click handler that sets focus to all flz_skipnav a", module.name);
			$(".flz_skipnav a").click(function () {
				$(this.href.substring(this.href.indexOf("#"), this.href.length)).focus();
			});
		}
	}

	/**
	 * Initialize skip link anchors.
	 *
	 * Automatically adds tabindex attribute to every skip link anchor that is
	 * annotated with class flz_anchor. This is mandatory for setting focus on
	 * skip link anchors (IE without javascript, Webkit & Opera only javascript)
	 *
	 * @affected IE, Chrome, Safari (Webkit), Opera
	 * @since 1.1.0
	 */
	function fixSkipLinkAnchors() {
		if (!floatz.isMobile() && (floatz.userAgent.engine.name === "WebKit" || floatz.userAgent.browser.name === "Opera" || floatz.userAgent.browser.name === "IE")) {
			floatz.log(floatz.LOGLEVEL.DEBUG, "Adding tabindex: -1 to all a:flz_anchor", module.name);
			$("a.flz_anchor").attr("tabindex", "-1");
		}
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, jQuery));
