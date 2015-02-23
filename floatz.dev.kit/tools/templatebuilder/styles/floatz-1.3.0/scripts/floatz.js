/* floatz CSS Framework v1.3.0
   Copyright (c) 1998-2015 by :hummldesign
   Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0 */

window.floatz=(function(floatz,$){"use strict";var self={LOGLEVEL:{ERROR:0,WARN:1,INFO:2,DEBUG:3},loadedModules:[],module:{name:"floatz",version:"1.3.0"},start:start,log:log,string:{lpad:lpad,rpad:rpad},userAgent:window.UAParser?new UAParser().getResult():{},isMobileWebkit:isMobileWebkit,isMobile:isMobile};var LOGLEVEL=self.LOGLEVEL;var loadedModules=self.loadedModules;var ua=self.userAgent;var module=self.module;var config={debug:false,logLevel:LOGLEVEL.DEBUG};function start(options){var i,j;updateConfig(options);log(LOGLEVEL.INFO,self.userAgent.ua,module.name);log(LOGLEVEL.INFO,"Module "+module.name+" started",module.name);for(i=0;i<loadedModules.length;i++){var canStart=config.modules===undefined;if(!canStart){for(j=0;j<config.modules.length;j++){if(loadedModules[i].name===config.modules[j]){canStart=true;break;}}}
if(canStart){loadedModules[i].start();}}
if(config.modules!==undefined&&config.modules!==null){for(i=0;i<config.modules.length;i++){var found=false;for(j=0;j<loadedModules.length;j++){if(config.modules[i]===loadedModules[j].name){found=true;}}
if(!found){log(LOGLEVEL.ERROR,"Module "+config.modules[i]+" is invalid or not loaded",module.name);}}}
if(config.onStarted!==undefined){config.onStarted();}}
function updateConfig(options){if(options.debug!==null){config.debug=options.debug;}
if(options.logLevel!=null){config.logLevel=options.logLevel;}
if(options.modules!=null){config["modules"]=options.modules;}
if(options.onStarted!=null){config["onStarted"]=options.onStarted;}}
function log(level,msg,context){if(window.console!==undefined&&level<=config.logLevel){console.log(rpad(context," ",20)+" | "+module.version+" | "+
rpad(logLevelName(level)," ",6)+" | "+msg);}}
function logLevelName(level){return level===LOGLEVEL.ERROR?"ERROR":level===LOGLEVEL.WARN?"WARN":level===LOGLEVEL.INFO?"INFO":level===LOGLEVEL.DEBUG?"DEBUG":"UNKOWN";}
function rpad(str,c,len){if(!str||!c||str.length>=len){return str;}
var pstr=str;var max=(len-str.length)/c.length;for(var i=0;i<max;i++){pstr+=c;}
return pstr;}
function lpad(str,c,len){if(!str||!c||str.length>=len){return str;}
var pstr=str;var max=(len-str.length)/c.length;for(var i=0;i<max;i++){pstr=c+pstr;}
return pstr;}
function isMobileWebkit(){return ua.engine.name==="WebKit"&&(ua.os.name==="Android"||ua.os.name==="iOS");}
function isMobile(){return ua.os.name==="Android"||ua.os.name==="iOS"||ua.os.name==="Windows Phone"||ua.os.name==="BlackBerry";}
if(!window.UAParser){log(LOGLEVEL.ERROR,"Module "+module.name+" depends on ua-parser.js which is not loaded",module.name);return;}
log(LOGLEVEL.INFO,"Module "+module.name+" loaded",module.name);return self;}(window.floatz,window.jQuery||null));