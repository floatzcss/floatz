window.floatz.custom = (function() {
	"use strict";

	////////////////////////////////////////////////////
	// Public interface

	var self = {
			
		/* Fields */
		module : {
			name : "custom",
			version : "1.0.0",
			start : start
		}			
	};
	
	////////////////////////////////////////////////////
	// Private variables

	var floatz = window.floatz;
	var module = self.module;
	
	////////////////////////////////////////////////////
	// Private functions
	
  /**
	* Start module.
	*
    * @since 1.1.0
	*/
	function start() {

        floatz.panels.onResize(".flz_panel, .flz_scrollpanel", function(e) {
            floatz.log(floatz.LOGLEVEL.INFO, "Panel has been resized", module.name);
        });

		floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " started", module.name);
	}
			
	////////////////////////////////////////////////////
	// Init code
	
	floatz.loadedModules.push(module);
	floatz.log(floatz.LOGLEVEL.INFO, "Module " + module.name + " loaded", module.name);
	
	// Return public interface
	return self;
}());
