// Load jquery, less and floatz in correct order
$LAB.script("../src/scripts/jquery-1.11.1.min.js")
	.script("../src/scripts/ua-parser-v0.7.0.min.js").wait()
	.script("../src/scripts/floatz.js").wait()
	.script("../src/scripts/floatz.mobile.js")
	.script("../src/scripts/floatz.skiplink.js")
	.script("scripts/custom.js")
	.wait(function () {
		$(document).ready(function () {
			floatz.start({
				debug: true,
				logLevel: floatz.LOGLEVEL.DEBUG,
				modules: ["floatz.mobile",
					"floatz.skiplink",
					"custom"],
				onStarted: function () {
					start();
				}
			});
		});
	});

function start() {
	var panel = $("#browserList");
	if (panel.length > 0) {
		var html = "";
		html += "<b>User agent:</b> " + floatz.userAgent.ua + "<br />"
		html += "<b>Browser:</b> " + floatz.userAgent.browser.name + "<br />";
		html += "<b>Browser Version:</b> " + floatz.userAgent.browser.version + "<br />";
		html += "<b>Browser Major:</b> " + floatz.userAgent.browser.major + "<br />";
		html += "<b>OS:</b> " + floatz.userAgent.os.name + "<br />";
		html += "<b>OS Version:</b> " + floatz.userAgent.os.version + "<br />";
		html += "<b>Engine:</b> " + floatz.userAgent.engine.name + "<br />";
		html += "<b>Engine Version:</b> " + floatz.userAgent.engine.version + "<br />";
		html += "<b>Device Model:</b> " + floatz.userAgent.device.model + "<br />";
		html += "<b>Device Type:</b> " + floatz.userAgent.device.type + "<br />";
		html += "<b>Device Vendor:</b> " + floatz.userAgent.device.vendor + "<br />";
		html += "<b>CPU:</b> " + floatz.userAgent.cpu.architecture + "<br />";
		html += "<br />"
		html += "<b>isMobileWebKit: </b>" + floatz.isMobileWebkit() + "<br />";
		html += "<b>isMobile: </b>" + floatz.isMobile() + "<br />";
		panel.append(html);
	}
}
