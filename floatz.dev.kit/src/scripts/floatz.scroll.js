/**
 * floatz.scroll.js
 *
 * Module that adds scroll management support to the viewport as well as desired containers.
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
 * @lastmodified  2015-12-23
 */

// TODO Add full page support
// TODO Add active menu item support
// TODO Add scroll animation configuration support
// TODO Add configuration support
// FIXME Only read sections immediately below the container to avoid reading sections of other containers!

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

		config : config,
		scroll : scroll,
		scrollIn : scrollIn,
		scrollOut : scrollOut,
		scrollTo: scrollTo,
		scrollToTop: scrollToTop,
		scrollToBottom: scrollToBottom,
		init: init
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
	 * Add scroll configuration.
	 *
	 * The scroll configuration can be used to customize behavior during scroll initialization.
	 * Scroll initialization is conducted when the module is started, thus the configuration
	 * must be set BEFORE module.start() is executed.
	 *
	 * Syntax:
	 *
	 *    config([<container>,]<config>)
	 *
	 * @param container Scroll container (optional)
	 * @param config Scroll configuration
	 * @returns Scroll context for chaining
	 */
	function config(container, config) {
		// TODO Implement
		return self;
	}

	/**
	 * Add scroll event handler.
	 *
	 * Syntax:
	 *
	 *    scroll([<container>,]<handler>)
	 *
	 * @param container Scroll container (optional)
	 * @param handler Scroll event handler
	 * @returns Scroll context for chaining
	 */
	function scroll(container, handler) {
		// TODO Implement
		// $(panel).scroll(handler);
		return self;
	}

	/**
	 * Add scroll event handler when a section enters the visible viewport.
	 *
	 * Syntax:
	 *
	 *    scrollIn([<container>][[,]<section>,]<handler>)
	 *
	 * @param container Scroll container (optional)
	 * @param section Section (optional)
	 * @param handler Scroll event handler
	 * @returns Scroll context for chaining
	 */
	function scrollIn(container, section, handler) {
		// TODO Implement
		return self;
	}

	/**
	 * Add scroll event handler when a section leaves the visible viewport.
	 *
	 * Syntax:
	 *
	 *    scrollOut([<container>][[,]<section>,]<handler>)
	 *
	 * @param container Scroll container (optional)
	 * @param section Section (optional)
	 * @param handler Scroll event handler
	 * @returns Scroll context for chaining
	 */
	function scrollOut(container, section, handler) {
		// TODO Implement
		return self;
	}

	/**
	 * Scroll to section.
	 *
	 * Syntax:
	 *
	 *    scrollTo([<container>,]<sectionId>[,<completeHandler>])
	 *
	 * @param container Scroll container (optional)
	 * @param sectionId Section Id
	 * @param completeHandler Event handler executed after scrolling completed (optional)
	 * @returns Scroll context for chaining
	 */
	function scrollTo(container, sectionId, completeHandler) {

		// TODO Use complete handler

		var found = false;
		for (var i = 0; i < sections.length; i++) {
			if (sections[i].id === sectionId) {
				found = true;
				if (sections[i].orientation === Orientation.VERTICAL) {
					$(container).animate({
						scrollTop: sections[i].offsetTop
					}, 'slow');

				} else {
					$(container).animate({
						scrollLeft: sections[i].offsetLeft
					}, 'slow');
				}
				break;
			}
		}
		if (!found) {
			floatz.log(floatz.LOGLEVEL.WARN, "Scroll section " + sectionId + " not found", module.name);
		}
		return self;
	}

	/**
	 * Scroll to topmost / leftmost section.
	 *
	 * Syntax:
	 *
	 *    scrollToTop([<container>][,[<completeHandler>]])
	 *
	 * @param container Scroll container (optional)
	 * @param completeHandler Event handler executed after scrolling completed (optional)
	 * @returns Scroll context for chaining
	 */
	function scrollToTop(container, completeHandler) {
		scrollTo(container, sections[0].id, completeHandler);
		return self;
	}

	/**
	 * Scroll to bottommost / rightmost section.
	 *
	 * Syntax:
	 *
	 *    scrollToBottom([<container>][,[<completeHandler>]])
	 *
	 * @param container Scroll container (optional)
	 * @param completeHandler Event handler executed after scrolling completed (optional)
	 * @returns Scroll context for chaining
	 */
	function scrollToBottom(container, completeHandler) {
		scrollTo(container, sections[sections.length - 1].id, completeHandler);
		return self;
	}

	/**
	 * Initialize scrolling in container.
	 *
	 * Syntax:
	 *
	 *    init(<container>[,<config>])
	 *
	 * @param container Scroll container
	 * @param config Scroll configuration (optional)
	 * @returns Scroll context for chaining
	 */
	function init(container, config) {
		floatz.log(floatz.LOGLEVEL.DEBUG, "Reading scroll sections", module.name);
		container = container ? $(container) : $("body");
		var section;

		// Add scroll handler
		// TODO: Prevent adding the handler twice
		// TODO: Window is different from "body" container - how to add scroll handler to other panels?

//		scroll(window, function() {
//			floatz.log(floatz.LOGLEVEL.DEBUG, "Scrolled ...", module.name);
//		});

		// Read scroll sections
		sections = [];
		$("." + SCROLLABLE + ", ." + HSCROLLABLE, container).each(function () {
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
		$("." + SCROLLANCHOR, container).each(function () {

			// Navigate to scroll section when anchor is clicked
			$(this).click(function (e) {
				scrollTo(container, $(this).attr("href"));
				e.preventDefault();
			});
			floatz.log(floatz.LOGLEVEL.DEBUG, "> Scroll anchor for section " + $(this).attr("href") + " found",
				module.name);
		});

		// TODO Return container specific scroll context
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	// Return public interface
	return self;
}(window.floatz, window.jQuery || null));
