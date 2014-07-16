/* floatz CSS Framework v1.2.0
   Copyright (c) 1998-2013 by :humml:design
   Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0 */

window.floatz=(function(){"use strict";var self={LOGLEVEL:{ERROR:0,WARN:1,INFO:2,DEBUG:3},loadedModules:[],module:{name:"floatz",version:"1.2.0"},start:start,log:log,string:{lpad:lpad,rpad:rpad}};var LOGLEVEL=self.LOGLEVEL;var loadedModules=self.loadedModules;var module=self.module;var config={debug:false,logLevel:LOGLEVEL.DEBUG};function start(options){var i,j;$.extend(config,options);log(LOGLEVEL.INFO,"Module "+module.name+" started",module.name);for(i=0;i<loadedModules.length;i++){var canStart=config.modules===undefined;if(!canStart){for(j=0;j<config.modules.length;j++){if(loadedModules[i].name===config.modules[j]){canStart=true;break;}}}
if(canStart){loadedModules[i].start();}}
for(i=0;i<config.modules.length;i++){var found=false;for(j=0;j<loadedModules.length;j++){if(config.modules[i]===loadedModules[j].name){found=true;}}
if(!found){log(LOGLEVEL.ERROR,"Module "+config.modules[i]+" is invalid or not loaded",module.name);}}
if(config.onStarted!==undefined){config.onStarted();}}
function log(level,msg,context){if(window.console!==undefined&&level<=config.logLevel){console.log(rpad(context," ",20)+" | "+module.version+" | "+
rpad(logLevelName(level)," ",6)+" | "+msg);}}
function logLevelName(level){return level===LOGLEVEL.ERROR?"ERROR":level===LOGLEVEL.WARN?"WARN":level===LOGLEVEL.INFO?"INFO":level===LOGLEVEL.DEBUG?"DEBUG":"UNKOWN";}
function rpad(str,c,len){if(!str||!c||str.length>=len){return str;}
var pstr=str;var max=(len-str.length)/c.length;for(var i=0;i<max;i++){pstr+=c;}
return pstr;}
function lpad(str,c,len){if(!str||!c||str.length>=len){return str;}
var pstr=str;var max=(len-str.length)/c.length;for(var i=0;i<max;i++){pstr=c+pstr;}
return pstr;}
log(LOGLEVEL.INFO,"Module "+module.name+" loaded",module.name);return self;}());