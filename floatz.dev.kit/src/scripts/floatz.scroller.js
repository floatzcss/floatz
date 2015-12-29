/**
 * floatz.scroller.js
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
 * @lastmodified  2015-12-29
 */

// TODO Add full page support
// TODO Add active menu item support
// TODO Add scroll animation configuration support
// TODO Add configuration support
// FIXME Only read sections immediately below the container to avoid reading sections of other containers!

window.floatz.scroller = (function (floatz, $) {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {

		/* Enumerations */
		Orientation: {
			VERTICAL: 0,
			HORIZONTAL: 1
		},

		Direction: {
			FORWARD: 1,
			BACKWARD: 2
		},

		/* Fields */
		module: {
			name: "floatz.scroll",
			version: "2.0.0",
			start: start
		},

		config: config,
		scroll: scroll,
		scrollIn: scrollIn,
		scrollOut: scrollOut,
		scrollTo: scrollTo,
		scrollToTop: scrollToTop,
		scrollToBottom: scrollToBottom,
		init: init
	};

	////////////////////////////////////////////////////
	// Private variables

	var Orientation = self.Orientation;
	var Direction = self.Direction;
	var module = self.module;
	var sections = [];
	var SCROLLABLE = "flz_scrollable";
	var HSCROLLABLE = "flz_hscrollable";
	var SCROLLANCHOR = "flz_scrollAnchor";
	var DEFAULTCONTAINER = "body";
	var scrollInfo = {

		/**
		 * Fields
		 */
		container: null,
		direction: Direction.FORWARD,
		eventData: null,
		lastScrollLeft: 0,
		lastScrollTop: 0,
		scrollLeft: 0,
		scrollTop: 0,
		orientation: Orientation.VERTICAL,

		/**
		 * Convenience functions
		 */
		isVertical: function () {
			return this.orientation === Orientation.VERTICAL;
		},
		isHorizontal: function () {
			return this.orientation === Orientation.HORIZONTAL;
		},
		isForward: function () {
			return this.direction === Direction.FORWARD;
		},
		isBackward: function () {
			return this.direction === Direction.BACKWARD;
		}
	};

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
		init(DEFAULTCONTAINER);

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

		if ($.isFunction(container)) {
			handler = container;
			container = DEFAULTCONTAINER;
		} else if (!$.isFunction(handler)) {
			floatz.log(floatz.LOGLEVEL.ERROR, "Scroll handler is not set or not a function", module.name);
		}

		var scrollContainer = $(container);
		if (scrollContainer.is(DEFAULTCONTAINER)) {
			scrollContainer = $(window);
		}

		$(scrollContainer).scroll(function (e) {
			var hPos = scrollContainer.scrollLeft();
			var vPos = scrollContainer.scrollTop();

			// Determine scroll direction
			if (hPos > scrollInfo.scrollLeft) {
				scrollInfo.direction = Direction.FORWARD;
				scrollInfo.orientation = Orientation.HORIZONTAL;
			} else if (hPos < scrollInfo.scrollLeft) {
				scrollInfo.direction = Direction.BACKWARD;
				scrollInfo.orientation = Orientation.HORIZONTAL;
			} else if (vPos > scrollInfo.scrollTop) {
				scrollInfo.direction = Direction.FORWARD;
				scrollInfo.orientation = Orientation.VERTICAL;
			} else if (vPos < scrollInfo.scrollTop) {
				scrollInfo.direction = Direction.BACKWARD;
				scrollInfo.orientation = Orientation.VERTICAL;
			}

			// Determine scroll positions
			scrollInfo.lastScrollLeft = scrollInfo.scrollLeft;
			scrollInfo.lastScrollTop = scrollInfo.scrollTop;
			scrollInfo.scrollLeft = hPos;
			scrollInfo.scrollTop = vPos;

			// Determine scroll data
			scrollInfo.container = scrollContainer;
			scrollInfo.eventData = e;

			// Execute scroll handler
			handler(scrollInfo);
		});
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

		if(! container) {
			if(sectionId) {
				container = DEFAULTCONTAINER;
			}
		} else {
			if(! sectionId) {
				sectionId = container;
				container = DEFAULTCONTAINER;
			}
		}

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
			floatz.log(floatz.LOGLEVEL.WARN, "Scroll section '" + sectionId + "' not found", module.name);
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
		return scrollTo(container, sections[0].id, completeHandler);
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
		return scrollTo(container, sections[sections.length - 1].id, completeHandler);
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
		container = $(container);
		var section;

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