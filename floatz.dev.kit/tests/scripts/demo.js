// Load jquery, less and floatz in correct order
$LAB.script("../src/scripts/jquery-1.11.1.min.js")
	 .script("../src/scripts/floatz.js").wait()
	 .script("../src/scripts/floatz.browser.js").wait()
	 .script("../src/scripts/floatz.mobile.js")
	 .script("../src/scripts/floatz.skiplink.js")
	 .script("scripts/custom.js")
	 .wait(function() {
		$(document).ready(function() {
			floatz.start({
				debug : true,
				logLevel : floatz.LOGLEVEL.DEBUG,
				modules : ["floatz.browser",
				           "floatz.mobile",
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
		html +="<h2>User agent</h2>";
		html += navigator.userAgent.toLowerCase();

		html += "<h2>Browser</h2>";
		html += "<p style=color:" + (floatz.browser.chrome ? "red;" : "inherit") + ">Chrome: " + floatz.browser.chrome + ", Version: " + (floatz.browser.chrome ? floatz.browser.version : "0") + "</p>";
		html += "<p style=color:" + (floatz.browser.firefox ? "red;" : "inherit") + ">Firefox: " + floatz.browser.firefox + ", Version: " + (floatz.browser.firefox ? floatz.browser.version : "0") + "</p>";
		html += "<p style=color:" + (floatz.browser.msie ? "red;" : "inherit") + ">IE: " + floatz.browser.msie + ", Version: " + (floatz.browser.msie ? floatz.browser.version : "0") + "</p>";
		html += "<p style=color:" + (floatz.browser.opera ? "red;" : "inherit") + ">Opera: " + floatz.browser.opera + ", Version: " + (floatz.browser.opera ? floatz.browser.version : "0") + "</p>";
		html += "<p style=color:" + (floatz.browser.safari ? "red;" : "inherit") + ">Safari: " + floatz.browser.safari + ", Version: " + (floatz.browser.safari ? floatz.browser.version : "0") + "</p>";

		html += "<h2>Platform</h2>";
		html += "<p style=color:" + (floatz.browser.android ? "red;" : "inherit") + ">Android: " + floatz.browser.android + ", Version: " + floatz.browser.androidVersion + "</p>";
		html += "<p style=color:" + (floatz.browser.ios ? "red;" : "inherit") + ">iOS: " + floatz.browser.ios + ", Version: " + floatz.browser.iosVersion + "</p>";

		html += "<h2>Engine</h2>";
		html += "<p style=color:" + (floatz.browser.gecko ? "red;" : "inherit") + ">Gecko: " + floatz.browser.gecko + "</p>";
		html += "<p style=color:" + (floatz.browser.mozilla ? "red;" : "inherit") + ">Mozilla: " + floatz.browser.mozilla + "</p>";
		html += "<p style=color:" + (floatz.browser.presto ? "red;" : "inherit") + ">Presto: " + floatz.browser.presto + "</p>";
		html += "<p style=color:" + (floatz.browser.webkit ? "red;" : "inherit") + ">Webkit: " + floatz.browser.webkit + "</p>";
		html += "<p style=color:" + (floatz.browser.isMobileWebkit() ? "red;" : "inherit") + ">Webkit (mobile): " + floatz.browser.isMobileWebkit() + ", Version: " + (floatz.browser.isMobileWebkit() ? floatz.browser.version : "0") + "</p>";

		html += "<h2>Device</h2>";
		html += "<p style=color:" + (floatz.browser.ipad ? "red;" : "inherit") + ">Mobile: " + floatz.browser.isMobile() + "</p>";
		html += "<p style=color:" + (floatz.browser.iphone ? "red;" : "inherit") + ">iPhone: " + floatz.browser.iphone + ", Version: " + floatz.browser.iphoneVersion + "</p>";
		html += "<p style=color:" + (floatz.browser.ipad ? "red;" : "inherit") + ">iPad: " + floatz.browser.ipad + ", Version: " + floatz.browser.ipadVersion + "</p>";
		html += "<p style=color:" + (floatz.browser.winPhone ? "red;" : "inherit") + ">Windows Phone: " + floatz.browser.winPhone + ", Version: " + floatz.browser.winPhoneVersion + "</p>";

		panel.append(html);
	}
}