// Load jquery, less and floatz in correct order
$LAB.script("../src/scripts/jquery-1.11.3.min.js")
	.script("../src/scripts/ua-parser-0.7.9.min.js").wait()
	.script("../src/scripts/floatz.js").wait()
	.script("../src/scripts/floatz.scroll.js")
	.script("../src/scripts/floatz.mobile.js")
	.script("../src/scripts/floatz.skiplink.js")
	.script("scripts/custom.js")
	.wait(function () {
		$(document).ready(function () {
			floatz.start({
				debug: true,
				logLevel: floatz.LOGLEVEL.DEBUG,
				modules: ["floatz.mobile",
					      "floatz.scroll"],
				onStarted: function () {
					handleStarted();
				}
			});
		});
	});

function handleStarted() {

	floatz.scroll.scroll(function(e) {
		var msg = "Scroll position: " + e.scrollTop + "/" + e.scrollLeft +
				", Direction: " + (e.direction === floatz.scroll.Direction.FORWARD ? "FORWARD" : e.direction === floatz.scroll.Direction.BACKWARD ? "BACKWARD" : "" ) +
			    ", Orientation: " + ( e.orientation === floatz.scroll.Orientation.HORIZONTAL ? "HORIZONTAL" : "VERTICAL") +
				", Container: " + (e.container.nodeName === undefined ? "Window" : e.container.nodeName );
		console.log(msg);
	});
}
