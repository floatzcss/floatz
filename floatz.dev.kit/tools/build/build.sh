#!/bin/bash

# --------------------- Function definitions ---------------------
cleanup() {

	echo "Finished with return code" $?

	if [ -f *.css.tmp ]
	then 
		rm *.css.tmp
	fi
	if [ -f *.js.tmp ] 
	then 
		rm *.js.tmp
	fi
	if [ -d ../../../floatz.dev.kit-$FLOATZ_VERSION ]
	then
		rm -rf ../../../floatz.dev.kit-$FLOATZ_VERSION
	fi
	if [ -d ../../../floatz-$FLOATZ_VERSION ]
	then
		rm -rf ../../../floatz-$FLOATZ_VERSION
	fi
}

function updateTemplate() {
	
	if [ -z $1 ]
	then
		echo "floatz.build | INFO  | Updating template layout.$2" 
		template="layout.$2"
	else
		echo "floatz.build | INFO  | Updating template layout.$2.$1"
		template="layout.$2.$1"
	fi
	
	rm -rf ../../templates/$template/styles/floatz*
	mkdir ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
	mkdir ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts
	
	if [ -z $1 ]
	then
		cp ../../../floatz/floatz.center.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.center.ie-lte6.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.center.ie-7.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.center.ie-8.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/

		cp ../../../floatz/floatz.fixed.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.fixed.ie-lte6.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.fixed.ie-7.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.fixed.ie-8.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/

		cp ../../../floatz/floatz.liquid.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.liquid.ie-lte6.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.liquid.ie-7.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.liquid.ie-8.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
	else
		cp ../../../floatz/floatz.$1.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.$1.ie-lte6.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.$1.ie-7.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
		cp ../../../floatz/floatz.$1.ie-8.css ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
	fi
	
	cp ../../../floatz/scripts/floatz.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../../floatz/scripts/floatz.skiplink.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../../floatz/scripts/floatz.mobile.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../src/scripts/jquery-$JQUERY_VERSION.min.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../src/scripts/LAB-$LAB_VERSION.min.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../src/scripts/less-$LESS_VERSION.min.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../src/scripts/ua-parser-$UA_VERSION.min.js ../../templates/$template/styles/floatz-$FLOATZ_VERSION/scripts/
	cp ../../NOTICE.txt ../../templates/$template/styles/floatz-$FLOATZ_VERSION/
}

function createFile() {
	echo "/* floatz CSS Framework v$FLOATZ_VERSION" > $1
	echo "   Copyright (c) 1998-2015 by :hummldesign" >> $1
	echo "   Apache License 2.0 http://www.apache.org/licenses/LICENSE-2.0 */" >> $1
}

# -------------------------- Script body -------------------------
#stop on first error 
set -e 

#define cleanup function on interrupt / termination / exit
trap "cleanup" INT TERM EXIT

#Set variables for later user
FLOATZ_VERSION=1.3.0
FLOATZ_RELEASE=
JQUERY_VERSION=1.11.2
LAB_VERSION=2.0.3
LESS_VERSION=2.2.0
UA_VERSION=0.7.3

LESSC=/usr/local/bin/lessc
JSMIN="../jsmin/jsmin"

if [ -x $LESSC ]
then
	#Create minified css
	echo "floatz.build | INFO  | Creating minified version of floatz.fixed.css"
	createFile floatz.fixed.css.tmp
	lessc --compress ../../src/floatz.reset.meyer.less >> floatz.fixed.css.tmp
	lessc --compress ../../src/floatz.reset.less >> floatz.fixed.css.tmp
	lessc --compress ../../src/floatz.layout.less >> floatz.fixed.css.tmp
	lessc --compress ../../src/floatz.layout.responsive.less >> floatz.fixed.css.tmp
	lessc --compress ../../src/floatz.nav.less >> floatz.fixed.css.tmp
	lessc --compress ../../src/floatz.form.less >> floatz.fixed.css.tmp
	mv floatz.fixed.css.tmp ../../../floatz/floatz.fixed.css

	echo "floatz.build | INFO  | Creating minified version of floatz.fixed.ie-lte6.css"
	createFile floatz.fixed.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.reset.ie-lte6.less >> floatz.fixed.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.layout.ie-lte6.less >> floatz.fixed.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.nav.ie-lte6.less >> floatz.fixed.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.form.ie-lte6.less >> floatz.fixed.ie-lte6.css.tmp
	mv floatz.fixed.ie-lte6.css.tmp ../../../floatz/floatz.fixed.ie-lte6.css

	echo "floatz.build | INFO  | Creating minified version of floatz.fixed.ie-7.css"
	createFile floatz.fixed.ie-7.css.tmp
	lessc --compress ../../src/floatz.reset.ie-7.less >> floatz.fixed.ie-7.css.tmp
	lessc --compress ../../src/floatz.layout.ie-7.less >> floatz.fixed.ie-7.css.tmp
	lessc --compress ../../src/floatz.nav.ie-7.less >> floatz.fixed.ie-7.css.tmp
	lessc --compress ../../src/floatz.form.ie-7.less >> floatz.fixed.ie-7.css.tmp
	mv floatz.fixed.ie-7.css.tmp ../../../floatz/floatz.fixed.ie-7.css

	echo "floatz.build | INFO  | Creating minified version of floatz.fixed.ie-8.css"
	createFile floatz.fixed.ie-8.css.tmp
	lessc --compress ../../src/floatz.form.ie-8.less >> floatz.fixed.ie-8.css.tmp
	mv floatz.fixed.ie-8.css.tmp ../../../floatz/floatz.fixed.ie-8.css

	echo "floatz.build | INFO  | Creating minified version of floatz.fixed.ie-9.css"
	createFile floatz.fixed.ie-9.css.tmp
	lessc --compress ../../src/floatz.layout.ie-9.less >> floatz.fixed.ie-9.css.tmp
	mv floatz.fixed.ie-9.css.tmp ../../../floatz/floatz.fixed.ie-9.css

	echo "floatz.build | INFO  | Creating minified version of floatz.liquid.css"
	createFile floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.reset.meyer.less >> floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.reset.less >> floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.layout.less >> floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.layout.liquid.less >> floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.layout.responsive.less >> floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.nav.less >> floatz.liquid.css.tmp
	lessc --compress ../../src/floatz.form.less >> floatz.liquid.css.tmp
	mv floatz.liquid.css.tmp ../../../floatz/floatz.liquid.css

	echo "floatz.build | INFO  | Creating minified version of floatz.liquid.ie-lte6.css"
	createFile floatz.liquid.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.reset.ie-lte6.less >> floatz.liquid.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.layout.ie-lte6.less >> floatz.liquid.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.layout.liquid.ie-lte6.less >> floatz.liquid.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.nav.ie-lte6.less >> floatz.liquid.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.form.ie-lte6.less >> floatz.liquid.ie-lte6.css.tmp
	mv floatz.liquid.ie-lte6.css.tmp ../../../floatz/floatz.liquid.ie-lte6.css

	echo "floatz.build | INFO  | Creating minified version of floatz.liquid.ie-7.css"
	createFile floatz.liquid.ie-7.css.tmp
	lessc --compress ../../src/floatz.reset.ie-7.less >> floatz.liquid.ie-7.css.tmp
	lessc --compress ../../src/floatz.layout.ie-7.less >> floatz.liquid.ie-7.css.tmp
	lessc --compress ../../src/floatz.nav.ie-7.less >> floatz.liquid.ie-7.css.tmp
	lessc --compress ../../src/floatz.form.ie-7.less >> floatz.liquid.ie-7.css.tmp
	mv floatz.liquid.ie-7.css.tmp ../../../floatz/floatz.liquid.ie-7.css

	echo "floatz.build | INFO  | Creating minified version of floatz.liquid.ie-8.css"
	createFile floatz.liquid.ie-8.css.tmp
	lessc --compress ../../src/floatz.form.ie-8.less >> floatz.liquid.ie-8.css.tmp
	mv floatz.liquid.ie-8.css.tmp ../../../floatz/floatz.liquid.ie-8.css

	echo "floatz.build | INFO  | Creating minified version of floatz.liquid.ie-9.css"
	createFile floatz.liquid.ie-9.css.tmp
	lessc --compress ../../src/floatz.layout.ie-9.less >> floatz.liquid.ie-9.css.tmp
	mv floatz.liquid.ie-9.css.tmp ../../../floatz/floatz.liquid.ie-9.css

	echo "floatz.build | INFO  | Creating minified version of floatz.center.css"
	createFile floatz.center.css.tmp
	lessc --compress ../../src/floatz.reset.meyer.less >> floatz.center.css.tmp
	lessc --compress ../../src/floatz.reset.less >> floatz.center.css.tmp
	lessc --compress ../../src/floatz.layout.less >> floatz.center.css.tmp
	lessc --compress ../../src/floatz.layout.center.less >> floatz.center.css.tmp
	lessc --compress ../../src/floatz.layout.responsive.less >> floatz.center.css.tmp
	lessc --compress ../../src/floatz.nav.less >> floatz.center.css.tmp
	lessc --compress ../../src/floatz.form.less >> floatz.center.css.tmp
	mv floatz.center.css.tmp ../../../floatz/floatz.center.css

	echo "floatz.build | INFO  | Creating minified version of floatz.center.ie-lte6.css"
	createFile floatz.center.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.reset.ie-lte6.less >> floatz.center.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.layout.ie-lte6.less >> floatz.center.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.layout.center.ie-lte6.less >> floatz.center.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.nav.ie-lte6.less >> floatz.center.ie-lte6.css.tmp
	lessc --compress ../../src/floatz.form.ie-lte6.less >> floatz.center.ie-lte6.css.tmp
	mv floatz.center.ie-lte6.css.tmp ../../../floatz/floatz.center.ie-lte6.css

	echo "floatz.build | INFO  | Creating minified version of floatz.center.ie-7.css"
	createFile floatz.center.ie-7.css.tmp
	lessc --compress ../../src/floatz.reset.ie-7.less >> floatz.center.ie-7.css.tmp
	lessc --compress ../../src/floatz.layout.ie-7.less >> floatz.center.ie-7.css.tmp
	lessc --compress ../../src/floatz.nav.ie-7.less >> floatz.center.ie-7.css.tmp
	lessc --compress ../../src/floatz.form.ie-7.less >> floatz.center.ie-7.css.tmp
	mv floatz.center.ie-7.css.tmp ../../../floatz/floatz.center.ie-7.css

	echo "floatz.build | INFO  | Creating minified version of floatz.center.ie-8.css"
	createFile floatz.center.ie-8.css.tmp
	lessc --compress ../../src/floatz.form.ie-8.less >> floatz.center.ie-8.css.tmp
	mv floatz.center.ie-8.css.tmp ../../../floatz/floatz.center.ie-8.css

	echo "floatz.build | INFO  | Creating minified version of floatz.center.ie-9.css"
	createFile floatz.center.ie-9.css.tmp
	lessc --compress ../../src/floatz.layout.ie-9.less >> floatz.center.ie-9.css.tmp
	mv floatz.center.ie-9.css.tmp ../../../floatz/floatz.center.ie-9.css
else
	echo "floatz.build | ERROR | Less compiler could not be found. Please install less compiler before build."
fi

if [ -x $JSMIN ]
then
	#Create minified js
	echo "floatz.build | INFO  | Creating minified version of floatz.js"
	createFile floatz.js.tmp
	../jsmin/jsmin < ../../src/scripts/floatz.js >> floatz.js.tmp
	mv floatz.js.tmp ../../../floatz/scripts/floatz.js

	echo "floatz.build | INFO  | Creating minified version of floatz.skiplink.js"
	createFile floatz.skiplink.js.tmp
	../jsmin/jsmin < ../../src/scripts/floatz.skiplink.js >> floatz.skiplink.js.tmp
	mv floatz.skiplink.js.tmp ../../../floatz/scripts/floatz.skiplink.js

	echo "floatz.build | INFO  | Creating minified version of floatz.mobile.js"
	createFile floatz.mobile.js.tmp
	../jsmin/jsmin < ../../src/scripts/floatz.mobile.js >> floatz.mobile.js.tmp
	mv floatz.mobile.js.tmp ../../../floatz/scripts/floatz.mobile.js

	echo "floatz.build | INFO  | Updating floatz related files"
	cp ../../src/scripts/jquery-$JQUERY_VERSION.min.js ../../../floatz/scripts/
	cp ../../src/scripts/LAB-$LAB_VERSION.min.js ../../../floatz/scripts/
	cp ../../src/scripts/less-$LESS_VERSION.min.js ../../../floatz/scripts/
	cp ../../src/scripts/ua-parser-$UA_VERSION.min.js ../../../floatz/scripts/
	cp ../../src/floatz.mixins.less ../../../floatz/
	cp ../../src/floatz.constants.less ../../../floatz/
	cp ../../NOTICE.txt ../../../floatz/
	cp ../../src/images/* ../../../floatz/images	
else
	echo "floatz.build | ERROR | Jsmin compiler could not be found. Please get full floatz.dev.kit and retry."
fi

#Template empty
updateTemplate "" "empty"

#Template fixed
updateTemplate "fixed" "010"
updateTemplate "fixed" "011"
updateTemplate "fixed" "110"
updateTemplate "fixed" "111"

#Template liquid
updateTemplate "liquid" "010"
updateTemplate "liquid" "011"
updateTemplate "liquid" "110"
updateTemplate "liquid" "111"

#Template center
updateTemplate "center" "010"
updateTemplate "center" "011"
updateTemplate "center" "110"
updateTemplate "center" "111"

#Create floatz distribution packages
cd ../../../
echo "floatz.build | INFO  | Creating floatz.dev.kit-$FLOATZ_VERSION$FLOATZ_RELEASE.zip"
mkdir floatz.dev.kit-$FLOATZ_VERSION
cp -r floatz.dev.kit/* floatz.dev.kit-$FLOATZ_VERSION/
rm -rf floatz.dev.kit-$FLOATZ_VERSION/sandbox
rm -rf "floatz.dev.kit-$FLOATZ_VERSION/samples/Basic Concepts/images"
rm -rf "floatz.dev.kit-$FLOATZ_VERSION/samples/Layouting Content/images"
rm -rf "floatz.dev.kit-$FLOATZ_VERSION/samples/Layouting Forms/images"
rm -rf "floatz.dev.kit-$FLOATZ_VERSION/samples/Layouting Navigation/images"
rm -rf "floatz.dev.kit-$FLOATZ_VERSION/samples/Layouting Pages/images"
zip -rmq ./download/floatz.dev.kit-$FLOATZ_VERSION$FLOATZ_RELEASE.zip floatz.dev.kit-$FLOATZ_VERSION
#zip -d -q ./download/floatz.dev.kit-$FLOATZ_VERSION$FLOATZ_RELEASE.zip "*.DS_Store"

echo "floatz.build | INFO  | Creating floatz-$FLOATZ_VERSION$FLOATZ_RELEASE.zip"
mkdir floatz-$FLOATZ_VERSION
cp -r floatz/* floatz-$FLOATZ_VERSION/
zip -rmq ./download/floatz-$FLOATZ_VERSION$FLOATZ_RELEASE.zip floatz-$FLOATZ_VERSION
#zip -d -q ./download/floatz-$FLOATZ_VERSION$FLOATZ_RELEASE.zip "*.DS_Store"
cd floatz.dev.kit/tools/build
