/* floatz CSS Framework v1.3.0
   Copyright (c) 1998-2015 by :hummldesign
   Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0 */

window.floatz.mobile=(function(floatz,$){"use strict";var self={module:{name:"floatz.mobile",version:"1.3.0",start:start,bind:bind},bind:bind};var module=self.module;function start(){if(!$){floatz.log(floatz.LOGLEVEL.ERROR,"Module "+module.name+" depends on jquery.js which is not loaded",module.name);return;}
if(floatz.isMobileWebkit()){if(document.styleSheets.length>0){floatz.log(floatz.LOGLEVEL.DEBUG,"Adding -webkit-text-size-adjust: none to * in mobile webkit",module.name);document.styleSheets[0].addRule("*","-webkit-text-size-adjust: none;");}else{floatz.log(floatz.LOGLEVEL.ERROR,"Adding mobile webkit specific styles failed. Please load the stylesheets before the script modules.",module.name);}
bind();}
floatz.log(floatz.LOGLEVEL.INFO,"Module "+module.name+" started",module.name);}
function bind(){floatz.log(floatz.LOGLEVEL.DEBUG,"Adding -webkit-overflow-scrolling: touch to flz_scrollbar, flz_scrollbox on mobile webkit",module.name);floatz.log(floatz.LOGLEVEL.DEBUG,"Adding overflow:scroll to flz_scrollpanel, flz_scrollbox on mobile webkit",module.name);$(".flz_scrollpanel, .flz_scrollbox").css("-webkit-overflow-scrolling","touch").css("overflow","scroll");}
floatz.loadedModules.push(module);floatz.log(floatz.LOGLEVEL.INFO,"Module "+module.name+" loaded",module.name);return self;}(window.floatz,window.jQuery||null));