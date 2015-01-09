// Load jquery, less and floatz in correct order
$LAB.script("../../src/scripts/jquery-1.11.2.min.js")
	 .script("../../src/scripts/floatz.js").wait()
	 .script("../../src/scripts/floatz.useragent.js").wait()
	 // .script("../../src/scripts/less-1.3.1.min.js")
	 .script("../../src/scripts/floatz.mobile.js")
	 .script("../../src/scripts/floatz.skiplink.js")
	 .wait(function() {
		$(document).ready(function() {
			floatz.start({
				debug : true,
				logLevel : floatz.LOGLEVEL.DEBUG,
				modules : ["floatz.browser", 
						   "floatz.mobile", 
						   "floatz.skiplink"]
			});

			test();		
		});
	 });


function test() {
	
	$(".flz_hmenu > ul > li > a ").click(function() {

		var popup = $(this).parent().find(".popupMenu");
		if($(popup).is(":hidden")) {
			$(popup).show();
		} else {
			$(popup).hide();			
		}
	});
}