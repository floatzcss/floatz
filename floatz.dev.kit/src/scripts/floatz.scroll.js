/**
 * floatz.scroll.js
 *
 * ...
 *
 * Depends on: floatz.js
 *
 * @project       floatz CSS Framework
 * @version       2.0.0
 * @since         2.0.0
 * @see           https://github.com/floatzcss/floatz
 * @author        Harald Humml
 * @copyright     Copyright (c) 1998-2016 by :hummldesign
 * @link          http://www.floatzcss.com
 * @license       Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0
 * @lastmodified  2015-12-22
 */
window.floatz.scroll = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Enumarations */
		Orientation: {
			VERTICAL: 0,
			HORIZONTAL: 1
		},

		/* Fields */
		module: {
			name: "floatz.scroll",
			version: "2.0.0",
			start: start
		},
		init: init,
		scrollTo: scrollTo,
		scrollToTop: scrollToTop,
		scrollToBottom: scrollToBottom
	};

	////////////////////////////////////////////////////
	// Private variables

	var Orientation = self.Orientation;
	var module = self.module;
	var sections = [];
	var SCROLLABLE = "flz_scrollable";
	var HSCROLLABLE = "flz_hscrollable";
	var SCROLLANCHOR = "flz_scrollAnchor";

	////////////////////////////////////////////////////
	// Private functions

	/**
	 * Start module.
	 *
	 * @since 2.0.0
	 */
	function start() {

		// Check if dependent modules are loaded
		if (!$) {
			floatz.log(floatz.LOGLEVEL.ERROR, "Module " + module.name + " depends on jquery.js which is not loaded",
				module.name);
			return;
		}

		// Initialize scrolling
		init();

		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	/**
	 * Initialize scrolling by reading scroll sections.
	 *
	 * @param panel Scroll panel
	 * @since 2.0.0
	 */
	function init(panel) {
		floatz.log(floatz.LOGLEVEL.DEBUG, "Reading scroll sections", module.name);
		panel = panel ? $(panel) : $("body");
		var section;

		// Read scroll sections
		sections = [];
		$("." + SCROLLABLE + ", ." + HSCROLLABLE, panel).each(function () {
			section = {
				id: "#" + $(this).attr("id"),
				offsetTop: $(this).offset().top,
				offsetLeft: $(this).offset().left,
				orientation: $(this).hasClass(SCROLLABLE) ? Orientation.VERTICAL : Orientation.HORIZONTAL
			};
			sections.push(section);
			floatz.log(floatz.LOGLEVEL.DEBUG, "> Scroll section " + section.id + " with offset top " + section.offsetTop
				+ " left " + section.offsetLeft + " found", module.name);

		});

		// Read scroll anchors
		floatz.log(floatz.LOGLEVEL.DEBUG, "Preparing scroll anchors", module.name);
		$("." + SCROLLANCHOR, panel).each(function () {

			// Navigate to scroll section when anchor is clicked
			$(this).click(function (e) {
				scrollTo(panel, $(this).attr("href"));
				e.preventDefault();
			});
			floatz.log(floatz.LOGLEVEL.DEBUG, "> Scroll anchor for section " + $(this).attr("href") + " found",
				module.name);
		});
	}

	/**
	 * Scroll to section.
	 *
	 * Syntax: floatz.scroll.scrollTo(<sectionId>);
	 *
	 * @param panel Scroll panel
	 * @param sectionId Section Id
	 * @since 2.0.0
	 */
	function scrollTo(panel, sectionId) {
		var found = false;
		for (var i = 0; i < sections.length; i++) {
			if (sections[i].id === sectionId) {
				found = true;
				if (sections[i].orientation === Orientation.VERTICAL) {
					$(panel).animate({
						scrollTop: sections[i].offsetTop
					}, 'slow');

				} else {
					$(panel).animate({
						scrollLeft: sections[i].offsetLeft
					}, 'slow');
				}
				break;
			}
		}
		if (!found) {
			floatz.log(floatz.LOGLEVEL.WARN, "Scroll section " + sectionId + " not found", module.name);
		}
	}

	/**
	 * Scroll to topmost / leftmost section.
	 *
	 * @param panel Scroll panel
	 * @since 2.0.0
	 */
	function scrollToTop(panel) {
		scrollTo(panel, sections[0].id);
	}

	/**
	 * Scroll to bottommost / rightmost section.
	 *
	 * @param panel Scroll panel
	 * @since 2.0.0
	 */
	function scrollToBottom(panel) {
		scrollTo(panel, sections[sections.length - 1].id);
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, window.jQuery || null));
