// Load jquery, less and floatz in correct order
$LAB.script("./styles/floatz-1.3.0/scripts/jquery-1.11.1.min.js")
	.script("./styles/floatz-1.3.0/scripts/ua-parser-0.7.0.min.js").wait()
	.script("./styles/floatz-1.3.0/scripts/floatz.js").wait()
	.script("./styles/floatz-1.3.0/scripts/floatz.mobile.js")
	.script("./styles/floatz-1.3.0/scripts/floatz.skiplink.js")
	.wait(function() {
		$(document).ready(function() {
			
			// Start floatz modules
			floatz.start({
				debug : true,
				logLevel : floatz.LOGLEVEL.DEBUG,
				modules : ["floatz.mobile",
						   "floatz.skiplink"]
			});
		});
	 });