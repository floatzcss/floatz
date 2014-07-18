// Load jquery, less and floatz in correct order
$LAB.script("../src/scripts/jquery-1.11.1.min.js")
	 .script("../src/scripts/floatz.js").wait()
	 .script("../src/scripts/floatz.mobile.js")
	 .script("../src/scripts/floatz.skiplink.js")
	 .script("scripts/custom.js")
	 .wait(function() {
		$(document).ready(function() {
			floatz.start({
				debug : true,
				logLevel : floatz.LOGLEVEL.DEBUG,
				modules : ["floatz.mobile",
				           "floatz.skiplink",
				           "custom"],
				onStarted: function() {
					start();
				}
			});
		});
	 });

function start() {
	var panel = $("#browserList");
	if(panel.length > 0) {
		var html = "";
		html += "<b>User agent:</b> " + navigator.userAgent + "<br />"
		html += "<b>Browser:</b> " + floatz.userAgent.browser + "<br />";
		html += "<b>Browser Version:</b> " + floatz.userAgent.browserVersion + "<br />";
		html += "<b>Platform:</b> " + floatz.userAgent.platform + "<br />";
		html += "<b>Platform Version:</b> " + floatz.userAgent.platformVersion + "<br />";
		html += "<b>Engine:</b> " + floatz.userAgent.engine + "<br />";
		html += "<b>Device:</b> " + floatz.userAgent.device + "<br />";
		panel.append(html);
	}
}