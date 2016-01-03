/**
 * floatz.scroller.js
 *
 * Scroll management module
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
 * @lastmodified  2015-12-31
 */

window.floatz.scroller = (function (container) {
	"use strict";

	////////////////////////////////////////////////////
	// Private modules

	/**
	 * Scroll context module.
	 */
	var ScrollContext = function (_container) {

		////////////////////////////////////////////////////
		// Constants

		var SCROLLABLE = "flz_scrollable";
		var HSCROLLABLE = "flz_hscrollable";
		var SCROLLANCHOR = "flz_scrollAnchor";
		var DEFAULTCONTAINER = "body";

		////////////////////////////////////////////////////
		// Private variables

		var viewport = $(_container);
		var container = $.isWindow(viewport[0]) ? $(DEFAULTCONTAINER) : $(viewport);
		var sections = [];
		var scrollInHandlers = [];
		var scrollOutHandlers = [];
		var scrollInfo = {

			/* Fields */
			viewport: null,
			container: null,
			direction: Direction.FORWARD,
			eventData: null,
			scrollLeft: 0,
			scrollTop: 0,
			orientation: Orientation.VERTICAL,
			sections: [],
			visibleSections: [],

			/* Convenience functions */
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
		 * Initialize the scroll context.
		 *
		 * @returns Scroll context
		 */
		function init() {
			floatz.log(floatz.LOGLEVEL.DEBUG, "Reading scroll sections of '" + container[0].tagName + "'", module.name);
			var section;

			// TODO Determine initial visibility of sections

			// Read scroll sections
			sections = [];
			$("." + SCROLLABLE + ", ." + HSCROLLABLE, container).each(function () {
				section = {
					id: "#" + $(this).attr("id"),
					offsetTop: $(this).offset().top,
					offsetBottom: $(this).offset().top + $(this).outerHeight(true),
					offsetLeft: $(this).offset().left,
					offsetRight: $(this).offset().left + $(this).outerWidth(true),
					orientation: $(this).hasClass(SCROLLABLE) ? Orientation.VERTICAL : Orientation.HORIZONTAL,
					visible: false
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
					scrollTo($(this).attr("href"));
					e.preventDefault();
				});
				floatz.log(floatz.LOGLEVEL.DEBUG, "> Scroll anchor for section " + $(this).attr("href") + " found",
					module.name);
			});

			return this;
		}

		/**
		 * Add scroll event handler.
		 *
		 * Syntax:
		 *
		 *    scroll(<handler>)
		 *
		 * @param handler Scroll event handler
		 * @returns Scroll context
		 */
		function scroll(handler) {


			// Handle scroll event
			$(viewport).scroll(function (e) {
				var hPos = viewport.scrollLeft();
				var vPos = viewport.scrollTop();

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

				// Determine visible sections
				var scrollTop = $(viewport).scrollTop();
				var scrollBottom = scrollTop + $(viewport).outerHeight(true);
				var scrollLeft = $(viewport).scrollLeft();
				var scrollRight = scrollLeft + $(viewport).outerWidth(true);
				var scrolledIn = [];
				var scrolledOut = [];

				for (var i = 0; i < sections.length; i++) {
					if ((sections[i].orientation === Orientation.VERTICAL &&
						((sections[i].offsetTop >= scrollTop && sections[i].offsetTop <= scrollBottom) ||
						(sections[i].offsetBottom <= scrollBottom && sections[i].offsetBottom >= scrollTop)))
						||
						(sections[i].orientation === Orientation.HORIZONTAL &&
						((sections[i].offsetLeft >= scrollLeft && sections[i].offsetLeft <= scrollRight) ||
						(sections[i].offsetRight <= scrollRight && sections[i].offsetRight >= scrollLeft)))) {

						if (!sections[i].visible) {
							sections[i].visible = true;
							scrollInfo.visibleSections.push(sections[i]);
							scrolledIn.push(sections[i]);
						}

					} else {
						if (sections[i].visible) {
							sections[i].visible = false;
							remove(scrollInfo.visibleSections, sections[i]);
							scrolledOut.push(sections[i]);
						}
					}
				}

				// Determine scroll positions
				scrollInfo.scrollLeft = hPos;
				scrollInfo.scrollTop = vPos;

				// Determine scroll data
				scrollInfo.viewport = viewport;
				scrollInfo.container = container;
				scrollInfo.sections = sections;
				scrollInfo.eventData = e;

				// Execute scroll handlers
				handler(scrollInfo);
				executeHandlers(scrollInHandlers, scrolledIn);
				executeHandlers(scrollOutHandlers, scrolledOut);
			});
			return this;
		}

		/**
		 * Add scroll event handler when a section enters the visible viewport.
		 *
		 * Syntax:
		 *
		 *    scrollIn(<section>,<handler>)
		 *
		 * @param section Section or section ID
		 * @param handler Scroll event handler
		 * @returns Scroll context
		 */
		function scrollIn(section, handler) {
			section = $(section);
			var sectionId = "#" + section.attr("id");

			scrollInHandlers.push({
				sectionId: sectionId,
				handler: function (scrollInfo, section) {
					floatz.log(floatz.LOGLEVEL.DEBUG, "Scrolled into section " + section.id, module.name);
					handler(scrollInfo, section)
				}
			});
			return this;
		}

		/**
		 * Add scroll event handler when a section leaves the visible viewport.
		 *
		 * Syntax:
		 *
		 *    scrollOut(<section>,<handler>)
		 *
		 * @param section Section or section ID
		 * @param handler Scroll event handler
		 * @returns Scroll context
		 */
		function scrollOut(section, handler) {
			section = $(section);
			var sectionId = "#" + section.attr("id");

			scrollOutHandlers.push({
				sectionId: sectionId,
				handler: function(scrollInfo, section) {
					floatz.log(floatz.LOGLEVEL.DEBUG, "Scrolled out of section " + section.id, module.name);
					handler(scrollInfo, section)
				}
			});

			return this;
		}

		/**
		 * Scroll to section.
		 *
		 * Syntax:
		 *
		 *    scrollTo(<section>|<sectionId>[,<completeHandler>])
		 *
		 * @param section Section or section ID
		 * @param completeHandler Complete handler function
		 * @returns Scroll context
		 */
		function scrollTo(section, completeHandler) {
			section = $(section);
			var sectionId = "#" + section.attr("id");

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
			return this;
		}

		/**
		 * Scroll to topmost / leftmost section.
		 *
		 * Syntax:
		 *
		 *    scrollToTop([<completeHandler>])
		 *
		 * @param completeHandler Complete handler function
		 * @returns Scroll context
		 */
		function scrollToTop(completeHandler) {
			return scrollTo(sections[0].id, completeHandler);
		}

		/**
		 * Scroll to bottommost / rightmost section.
		 *
		 * Syntax:
		 *
		 *    scrollToBottom([<completeHandler>])
		 *
		 * @param completeHandler Complete handler function
		 * @returns Scroll context
		 */
		function scrollToBottom(completeHandler) {
			return scrollTo(sections[sections.length - 1].id, completeHandler);
		}

		/**
		 * Execute scrolled in/out handlers for specific sections.
		 *
		 * @param handlers Handlers
		 * @param sections Sections
		 */
		function executeHandlers(handlers, sections) {

			// TODO Consider breakpoints (conditions) for executing scroll handlers (e.g. FORWARD, BACKWARD, PERCENTAGE OF VISIBILITY, ...)

			for (var i = 0; i < handlers.length; i++) {
				var section = $.grep(sections, function (e) {
					return handlers[i].sectionId === e.id;
				});

				if (section.length > 0) {
					handlers[i].handler(scrollInfo, section[0]);
				}
			}
		}

		/**
		 * Remove an item from an array.
		 * @param array Array
		 * @param item ite
		 */
		function remove(array, item) {
			var i = array.indexOf(item);
			if (i > -1) {
				array.splice(i, 1);
			}
		}

		////////////////////////////////////////////////////
		// Init code

		////////////////////////////////////////////////////
		// Public interface
		return {
			/* Fields */
			container: container,

			/* Methods */
			init: init,
			scroll: scroll,
			scrollIn: scrollIn,
			scrollOut: scrollOut,
			scrollTo: scrollTo,
			scrollToTop: scrollToTop,
			scrollToBottom: scrollToBottom
		};
	};

	////////////////////////////////////////////////////
	// Private variables

	var Orientation = {
		VERTICAL: 0,
		HORIZONTAL: 1
	};
	var Direction = {
		FORWARD: 1,
		BACKWARD: 2
	};
	var context = ScrollContext(container);
	var module = {
		name: "floatz.scroller",
		version: "2.0.0",
		start: start
	};


	////////////////////////////////////////////////////
	// Private functions

	function init(container) {
		return ScrollContext(container).init();
	}

	function start() {

		// Check if dependent modules are loaded
		if (!$) {
			floatz.log(floatz.LOGLEVEL.ERROR, "Module " + module.name + " depends on jquery.js which is not loaded",
				module.name);
			return;
		}

		// Initialize scrolling for the viewport
		context.init();

		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}

	////////////////////////////////////////////////////
	// Init code

	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);

	////////////////////////////////////////////////////
	// Public interface
	return {
		/* Enumerations */
		Orientation: context.Orientation,
		Direction: context.Direction,

		/* Fields */
		module: module,
		context: context,

		/* Methods */
		init: init
	};

}($(window)));
