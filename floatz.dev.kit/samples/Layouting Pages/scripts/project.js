// Load jquery, less and floatz in correct order
$LAB.script("./styles/floatz-1.2.0/scripts/jquery-1.11.3.min.js")
	.script("./styles/floatz-1.2.0/scripts/floatz.js").wait()
	.script("./styles/floatz-1.2.0/scripts/floatz.useragent.js").wait()
	// .script("./styles/floatz-1.2.0/scripts/less-1.3.3.min.js")
	.script("./styles/floatz-1.2.0/scripts/floatz.mobile.js")
	.script("./styles/floatz-1.2.0/scripts/floatz.skiplink.js")
	.wait(function() {
		$(document).ready(function() {
			
			// Start floatz modules
			floatz.start({
				debug : true,
				logLevel : floatz.LOGLEVEL.DEBUG,
				modules : ["floatz.browser", 
						   "floatz.mobile", 
						   "floatz.skiplink"]
			});
		});
	 });