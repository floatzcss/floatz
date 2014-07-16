/* floatz CSS Framework v1.2.0
   Copyright (c) 1998-2013 by :humml:design
   Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0 */

var floatz=(function(){var self={LOGLEVEL:{ERROR:0,WARN:1,INFO:2,DEBUG:3},loadedModules:new Array(),module:{name:"floatz",version:"1.2.0"},start:start,log:log,string:{lpad:lpad,rpad:rpad}};var LOGLEVEL=self.LOGLEVEL;var loadedModules=self.loadedModules;var module=self.module;var config={debug:false,logLevel:LOGLEVEL.DEBUG,};function start(options){$.extend(config,options);log(LOGLEVEL.INFO,"Module "+module.name+" started",module.name);for(var i in loadedModules){var start=config.modules===undefined;if(!start){for(var j in config.modules){if(loadedModules[i].name===config.modules[j]){start=true;break;}}}
if(start){loadedModules[i].start();}}
for(var i in config.modules){var found=false;for(var j in loadedModules){if(config.modules[i]===loadedModules[j].name){found=true;}}
if(!found){log(LOGLEVEL.ERROR,"Module "+config.modules[i]+" is invalid or not loaded",module.name);}}}
function log(level,msg,context){if(window.console!==undefined&&level<=config.logLevel){console.log(rpad(context," ",20)+" | "+module.version+" | "+
rpad(logLevelName(level)," ",6)+" | "+msg);}}
function logLevelName(level){return level===LOGLEVEL.ERROR?"ERROR":level===LOGLEVEL.WARN?"WARN":level===LOGLEVEL.INFO?"INFO":level===LOGLEVEL.DEBUG?"DEBUG":"UNKOWN";}
function rpad(str,char,len){if(!str||!char||str.length>=len){return str;}
var pstr=str;var max=(len-str.length)/char.length;for(var i=0;i<max;i++){pstr+=char;}
return pstr;}
function lpad(str,char,len){if(!str||!char||str.length>=len){return str;}
var pstr=str;var max=(len-str.length)/char.length;for(var i=0;i<max;i++){pstr=char+pstr;}
return pstr;}
log(LOGLEVEL.INFO,"Module "+module.name+" loaded",module.name);return self;}());