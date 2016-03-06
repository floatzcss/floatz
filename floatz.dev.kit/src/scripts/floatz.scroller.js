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
 * @lastmodified  2016-01-31
 *
 * FIXME scrollIn/Out not executed if no scroll event is attached
 * FIXME scroll handlers are not executed when section is activated immediately on page load
 *
 * TODO Test multiple handlers could be attached => grep
 * TODO Breakpoints based on CSS classes (based on default percentage) => animate css, lazy loading for images
 * TODO Complete handler for scroll easing
 * TODO Support for custom easings
 * TODO Support scroll without scrollbar (slideshow)
 * TODO Show sections in browser address bar (only real sections that are also in menu?!)
 * TODO Support full screen
 *
 * TODO Test other panels that are not sections
 * TODO Test percentage based animation
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
		var SCROLLANCHOR = "flz_scrollanchor";
		var DEFAULTCONTAINER = "body";

		////////////////////////////////////////////////////
		// Private variables

		var viewport = $(_container); // TODO Move to scrollInfo
		var container = $.isWindow(viewport[0]) ? $(DEFAULTCONTAINER) : $(viewport); // TODO Move to scrollInfo
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
			menuSelection: false,

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

		var config = {
			offsetCorrection: {
				auto: true,
				horizontal: 0,
				vertical: 0
			}
		};

		////////////////////////////////////////////////////
		// Private functions

		/**
		 * Initialize the scroll context.
		 *
		 * Syntax:
		 *
		 *    init([<config>])
		 *
		 * @params config Scroller configuration
		 * @returns Scroll context
		 */
		function init(_config) {

			// Read configuration
			$.extend(config, _config);

			// Read scroll sections
			readScrollSections();

			// Read scroll anchors
			readScrollAnchors();

			// Re-read scroll section on viewport resize
			$(viewport).resize(function () {
				readScrollSections();
			});

			return this;
		}

		/**
		 * Read scroll sections.
		 */
		function readScrollSections() {
			var section, header;
			var correction = {
				horizontal: 0,
				vertical: 0
			};

			floatz.log(floatz.LOGLEVEL.DEBUG, "Reading scroll sections of '" + container[0].tagName + "'", module.name);

			// Determine vertical offset correction based on fixed header if it is not set from outside
			if (config.offsetCorrection.auto === true) {
				header = $(container).find("header, #header, .header");
				if (header.length > 0 && $(header[0]).css("position").toLowerCase() === "fixed") {
					config.offsetCorrection.vertical = $(header[0]).outerHeight(true) * -1;
				}
			}

			sections = [];
			$("." + SCROLLABLE + ", ." + HSCROLLABLE, container).each(function () {
				// Math.round removes decimals caused by offset.top / offset.left
				section = {
					id: "#" + $(this).attr("id"),
					height: $(this).outerHeight(true),
					width: $(this).outerWidth(true),
					top: Math.round($(this).offset().top) + config.offsetCorrection.vertical,
					bottom: Math.round($(this).offset().top + config.offsetCorrection.vertical + $(this).outerHeight(true)),
					left: Math.round($(this).offset().left) + config.offsetCorrection.horizontal,
					right: Math.round($(this).offset().left + config.offsetCorrection.horizontal + $(this).outerWidth(true)),
					orientation: $(this).hasClass(SCROLLABLE) ? Orientation.VERTICAL : Orientation.HORIZONTAL,
					visibility: {
						vertical: 0,
						horizontal: 0
					},
					visible: false,
					jQuery: this
				};
				sections.push(section);
				floatz.log(floatz.LOGLEVEL.DEBUG, "> Scroll section " + section.id + " with offset top " + section.top
					+ " left " + section.left + " found", module.name);
			});
		}

		/**
		 * Read scroll anchors.
		 */
		function readScrollAnchors() {
			floatz.log(floatz.LOGLEVEL.DEBUG, "Preparing scroll anchors", module.name);
			$("." + SCROLLANCHOR, container).each(function () {
				$(this).click(function (e) {
					// Navigate to scroll section when anchor is clicked
					scrollInfo.menuSelection = true;
					scrollTo($(this).attr("href"), function (scrollInfo, section, e) {
						selectScrollAnchor(e.target);
						scrollInfo.menuSelection = false;
					}, e);
					e.preventDefault();
				});
				floatz.log(floatz.LOGLEVEL.DEBUG, "> Scroll anchor for section " + $(this).attr("href") + " found",
					module.name);
			});
		}

		/**
		 * Set selected state for given anchor.
		 * Removes selected state from previous anchor.
		 *
		 * @param anchor Anchor
		 */
		function selectScrollAnchor(anchor) {
			var ul = $(anchor).parent().parent();
			ul.find(".flz_selected").removeClass("flz_selected");
			$(anchor).parent().addClass("flz_selected");
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
				var height = $(viewport).outerHeight(true); // TODO Move to scrollInfo
				var width = $(viewport).outerWidth(true); // TODO Move to scrollInfo
				var top = $(viewport).scrollTop(); // TODO Move to scrollInfo
				var bottom = top + config.offsetCorrection.vertical + height;  // TODO Move to scrollInfo
				var left = $(viewport).scrollLeft();  // TODO Move to scrollInfo
				var right = left + config.offsetCorrection.horizontal + width;  // TODO Move to scrollInfo
				var scrolledIn = [];
				var scrolledOut = [];

				// Determine scroll direction (before setting new scroll positions!)
				if (left > scrollInfo.scrollLeft) {
					scrollInfo.direction = Direction.FORWARD;
					scrollInfo.orientation = Orientation.HORIZONTAL;
				} else if (left < scrollInfo.scrollLeft) {
					scrollInfo.direction = Direction.BACKWARD;
					scrollInfo.orientation = Orientation.HORIZONTAL;
				} else if (top > scrollInfo.scrollTop) {
					scrollInfo.direction = Direction.FORWARD;
					scrollInfo.orientation = Orientation.VERTICAL;
				} else if (top < scrollInfo.scrollTop) {
					scrollInfo.direction = Direction.BACKWARD;
					scrollInfo.orientation = Orientation.VERTICAL;
				}

				// Determine scroll positions
				scrollInfo.scrollLeft = left;
				scrollInfo.scrollTop = top;

				// Determine scroll data
				scrollInfo.viewport = viewport;
				scrollInfo.container = container;
				scrollInfo.sections = sections;
				scrollInfo.eventData = e;

				for (var i = 0; i < sections.length; i++) {

					// Determine section visibility in percentage
					if (sections[i].orientation === Orientation.VERTICAL) {
						// Clipped
						if (sections[i].top < top && sections[i].bottom > bottom) {
							sections[i].visibility.vertical = Math.round((sections[i].height - (sections[i].height - height)) * 100 / sections[i].height);
							// Above
						} else if (sections[i].top < top) {
							sections[i].visibility.vertical = Math.round((sections[i].bottom - top) * 100 / sections[i].height);
							// Below
						} else if (sections[i].bottom > bottom) {
							sections[i].visibility.vertical = Math.round((bottom - sections[i].top) * 100 / sections[i].height);
							// Between
						} else {
							sections[i].visibility.vertical = 100;
						}
					} else {
						// Clipped
						if (sections[i].left < left && sections[i].right > right) {
							sections[i].visibility.horizontal = Math.round((sections[i].width - (sections[i].width - width)) * 100 / sections[i].width);
							// Above
						} else if (sections[i].left < left) {
							sections[i].visibility.horizontal = Math.round((sections[i].right - left) * 100 / sections[i].width);
							// Below
						} else if (sections[i].right > right) {
							sections[i].visibility.horizontal = Math.round((right - sections[i].left) * 100 / sections[i].width);
							// Between
						} else {
							sections[i].visibility.horizontal = 100;
						}
					}

					// Determine visible sections
					if (sections[i].orientation === Orientation.VERTICAL && isVisible(sections[i].top, sections[i].bottom, top, bottom) ||
						sections[i].orientation === Orientation.HORIZONTAL && isVisible(sections[i].left, sections[i].right, left, right)) {

						// Remember visible sections
						if (!sections[i].visible) {
							scrollInfo.visibleSections.push(sections[i]);
						}

						// Run breakpoints to prevent execution of scrollIn handlers until breakpoints are met
						$.grep(scrollInHandlers, function (e) {

							// Consider every section or specific sections
							if ($.isEmptyObject(e.sectionId) || e.sectionId === sections[i].id) {
								if (e.breakpoint) {
									if (e.breakpoint(scrollInfo, sections[i])) {
										scrolledIn.push(sections[i]);
									}
								} else {
									if (!sections[i].visible) {
										scrolledIn.push(sections[i]);
									}
								}
							}
						});

						// Set section to visible AFTER breakpoint handling
						if (!sections[i].visible) {
							sections[i].visible = true;
						}

					} else {
						if (sections[i].visible) {
							sections[i].visible = false;
							remove(scrollInfo.visibleSections, sections[i]);
							scrolledOut.push(sections[i]);
						}
					}
				}

				// Execute scroll handlers
				handler(scrollInfo);
				executeHandlers(scrollInHandlers, scrolledIn);
				executeHandlers(scrollOutHandlers, scrolledOut);
			});
			return this;
		}

		/**
		 * Check if section is visible within viewport
		 *
		 * @param offsetTop Top or left offset position
		 * @param offsetBottom Bottom or right offset position
		 * @param scrollTop Top or left scroll position
		 * @param scrollBottom Bottom or right scroll position
		 * @returns {boolean} true if visible, false if not
		 */
		function isVisible(offsetTop, offsetBottom, scrollTop, scrollBottom) {
			return (offsetTop >= scrollTop && offsetTop <= scrollBottom) ||
				(offsetBottom <= scrollBottom && offsetBottom >= scrollTop) ||
				(offsetTop <= scrollTop && offsetBottom >= scrollBottom);
		}

		/**
		 * Add scroll event handler when a section enters the visible viewport.
		 *
		 * Syntax:
		 *
		 *    scrollIn([<section>,]<handler>[,<breakpoint>])
		 *
		 * @param section Section or section ID
		 * @param handler Scroll event handler
		 * @param breakpoint Breakpoint callback
		 * @returns Scroll context
		 */
		function scrollIn(section, handler, breakpoint) {
			var sectionId;
			if (!$.isFunction(section)) {
				section = $(section);
				sectionId = "#" + section.attr("id");
			} else {
				breakpoint = handler;
				handler = section;
			}

			scrollInHandlers.push({
				sectionId: sectionId,
				breakpoint: breakpoint,
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
		 *    scrollOut([<section>,]<handler>)
		 *
		 * @param section Section or section ID
		 * @param handler Scroll event handler
		 * @returns Scroll context
		 */
		function scrollOut(section, handler) {
			var sectionId;
			if (!$.isFunction(section)) {
				section = $(section);
				sectionId = "#" + section.attr("id");
			} else {
				handler = section;
			}

			scrollOutHandlers.push({
				sectionId: sectionId,
				handler: function (scrollInfo, section) {
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
		 *    scrollTo(<section>|<sectionId>[,<completeHandler>][,<eventParam>])
		 *
		 * @param section Section or section ID
		 * @param completeHandler Complete handler function
		 * @param data Custom event data that is passed through
		 * @returns Scroll context
		 */
		function scrollTo(section, completeHandler, data) {
			section = $(section);
			var sectionId = "#" + section.attr("id");
			var found = false;
			for (var i = 0; i < sections.length; i++) {
				if (sections[i].id === sectionId) {
					found = true;

					var handleComplete = function () {
						completeHandler(scrollInfo, sections[i], data);
					};

					if (sections[i].orientation === Orientation.VERTICAL) {
						$(container).animate({
							scrollTop: sections[i].top
						}, 'slow', 'swing', handleComplete);
					} else {
						$(container).animate({
							scrollLeft: sections[i].left
						}, 'slow', 'swing', handleComplete);
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
			var section;
			for (var i = 0; i < handlers.length; i++) {
				section = $.grep(sections, function (e) {

					// Consider every section or specific sections
					if ($.isEmptyObject(handlers[i].sectionId)) {
						return true;
					} else {
						return handlers[i].sectionId === e.id
					}
				});

				if (section.length > 0) {
					handlers[i].handler(scrollInfo, section[0]);
				}
			}
		}

		/**
		 * Remove an item from an array.
		 *
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
		Orientation: Orientation,
		Direction: Direction,

		/* Fields */
		module: module,
		context: context,

		/* Methods */
		init: init
	};

}($(window)));
