// Load jquery, less and floatz in correct order
$LAB.script("../src/scripts/jquery-1.11.3.min.js")
	.script("../src/scripts/ua-parser-0.7.9.min.js").wait()
	.script("../src/scripts/floatz.js").wait()
	.script("../src/scripts/floatz.scroller.js")
	.script("../src/scripts/floatz.mobile.js")
	.script("../src/scripts/floatz.skiplink.js")
	.script("scripts/custom.js")
	.wait(function () {
		$(document).ready(function () {
			floatz.start({
				debug: true,
				logLevel: floatz.LOGLEVEL.DEBUG,
				modules: ["floatz.mobile",
					"floatz.scroller"],
				onStarted: function () {
					handleStarted();
				}
			});
		});
	});

function handleStarted() {

	floatz.scroller.context
		.scroll(handleScroll)/*
		.scrollIn("#section1", handleScrollInSection)
		.scrollOut("#section1", handleScrollOutSection)
		.scrollIn("#section2", handleScrollInSection)
		.scrollOut("#section2", handleScrollOutSection)
		.scrollIn("#section3", handleScrollInSection)
		.scrollOut("#section3", handleScrollOutSection)
		.scrollIn("#section4", handleScrollInSection)
		.scrollOut("#section4", handleScrollOutSection)
		.scrollIn("#section5", handleScrollInSection)
		.scrollOut("#section5", handleScrollOutSection)*/
		.scrollIn("#section3", handleScrollInSection, handleScrollInBreakPoint)
		.scrollIn("#section4", handleScrollInSection, handleScrollInBreakPoint)
	;
}

function handleScroll(scrollInfo) {
/*	var msg =
		"Scroll position: " + scrollInfo.scrollTop + "/" + scrollInfo.scrollLeft +
		", Direction: " + (scrollInfo.isForward() ? "FORWARD" : "BACKWARD" ) +
		", Orientation: " + ( scrollInfo.isHorizontal() ? "HORIZONTAL" : "VERTICAL") +
		", Container: " + (scrollInfo.container.nodeName === undefined ? "Window" : scrollInfo.container.nodeName );

	msg += ", Visible sections: ";
	for(var i=0; i < scrollInfo.visibleSections.length; i++) {
		msg += scrollInfo.visibleSections[i].id;
		msg += " (" + (scrollInfo.isVertical() ? scrollInfo.visibleSections[i].visibility.vertical : scrollInfo.visibleSections[i].visibility.horizontal) + ") ";
	}

	console.log(msg); */
}

function handleScrollInSection(scrollInfo, section) {
	console.log("Scrolled into " + section.id);
}

function handleScrollOutSection(scrollInfo, section) {
	console.log("Scrolled out of " + section.id);
}

function handleScrollInBreakPoint(scrollInfo, section) {

	// Percentage value can´t be exact because of jumps due to fast scrolling
	if(section.visibility.vertical >= 15) {
		var article = $("article", section.jQuery);
		if(article.is(":hidden")) {
			article.fadeIn();
			console.log("Section 4 visible at " + section.visibility.vertical+ "%");
		}
	}
}
