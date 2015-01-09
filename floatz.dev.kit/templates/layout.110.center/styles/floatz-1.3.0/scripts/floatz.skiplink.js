/* floatz CSS Framework v1.3.0
   Copyright (c) 1998-2015 by :hummldesign
   Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0 */

window.floatz.skiplink=(function(floatz,$){"use strict";var self={module:{name:"floatz.skiplink",version:"1.2.0",start:start}};var module=self.module;function start(){fixSkipLinks();fixSkipLinkAnchors();floatz.log(floatz.LOGLEVEL.INFO,"Module "+module.name+" started",module.name);}
function fixSkipLinks(){if(!floatz.isMobile()&&(floatz.userAgent.engine.name==="WebKit"||floatz.userAgent.browser.name==="Opera")){floatz.log(floatz.LOGLEVEL.DEBUG,"Adding click handler that sets focus to all flz_skipnav a",module.name);$(".flz_skipnav a").click(function(){$(this.href.substring(this.href.indexOf("#"),this.href.length)).focus();});}}
function fixSkipLinkAnchors(){if(!floatz.isMobile()&&(floatz.userAgent.engine.name==="WebKit"||floatz.userAgent.browser.name==="Opera"||floatz.userAgent.browser.name==="IE")){floatz.log(floatz.LOGLEVEL.DEBUG,"Adding tabindex: -1 to all a:flz_anchor",module.name);$("a.flz_anchor").attr("tabindex","-1");}}
floatz.loadedModules.push(module);floatz.log(floatz.LOGLEVEL.INFO,"Module "+module.name+" loaded",module.name);return self;}(window.floatz,jQuery));