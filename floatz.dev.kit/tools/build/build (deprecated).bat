@echo off
set floatz_version=1.1.2
set floatz_jquery_version=1.7.2

cd ..\shrink

echo.
echo Building floatz.fixed ...
shrink /p:../build/floatz.fixed.profile /o:../../../floatz/floatz.fixed.css

echo.
echo Building floatz.liquid ...
shrink /p:../build/floatz.liquid.profile /o:../../../floatz/floatz.liquid.css

echo.
echo Building floatz.fixed ...
shrink /p:../build/floatz.center.profile /o:../../../floatz/floatz.center.css

echo.
echo Build floatz.js ...
echo tbd

echo.
echo Updating templates ...
echo floatz.fixed.css
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.010.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.011.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.111.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.110.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.010.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.011.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.111.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.110.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.010.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.011.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.111.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.110.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.fixed.css ..\..\templates\layout.empty\styles\floatz-%floatz_version%\ > nul

echo floatz.liquid.css
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.010.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.011.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.111.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.110.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.010.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.011.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.111.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.110.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.010.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.011.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.111.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.110.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.liquid.css ..\..\templates\layout.empty\styles\floatz-%floatz_version%\ > nul

echo floatz.center.css
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.010.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.011.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.111.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.110.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.010.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.011.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.111.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.110.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.010.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.011.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.111.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.110.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\..\floatz\floatz.center.css ..\..\templates\layout.empty\styles\floatz-%floatz_version%\ > nul

echo floatz.js
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.010.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.011.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.111.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.110.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.010.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.011.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.111.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.110.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.010.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.011.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.111.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.110.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\floatz.js ..\..\templates\layout.empty\styles\floatz-%floatz_version%\scripts\ > nul

echo jquery-%floatz_jquery_version%.js
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.010.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.011.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.111.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.110.fixed\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.010.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.011.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.111.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.110.liquid\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.010.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.011.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.111.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.110.center\styles\floatz-%floatz_version%\scripts\ > nul
copy ..\..\..\floatz\scripts\jquery-%floatz_jquery_version%.min.js ..\..\templates\layout.empty\styles\floatz-%floatz_version%\scripts\ > nul

echo NOTICE.txt
copy ..\..\NOTICE.txt ..\..\templates\layout.010.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.011.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.111.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.110.fixed\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.010.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.011.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.111.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.110.liquid\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.010.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.011.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.111.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.110.center\styles\floatz-%floatz_version%\ > nul
copy ..\..\NOTICE.txt ..\..\templates\layout.empty\styles\floatz-%floatz_version%\ > nul

echo.
echo Creating floatz.dev.kit-%floatz_version%.zip ...
xcopy ..\..\*.* ..\..\..\floatz.dev.kit-%floatz_version% /s /e /i /v > nul
rd ..\..\..\floatz.dev.kit-%floatz_version%\sandbox /s /q
del "..\..\..\floatz.dev.kit-%floatz_version%\.project" > nul
del "..\..\..\floatz.dev.kit-%floatz_version%\samples\Basic Concepts\images\Basic_Concepts*.jpg" > nul
rem del "..\..\..\floatz.dev.kit-%floatz_version%\samples\Layouting Content\images\Layouting*.jpg" > nul
del "..\..\..\floatz.dev.kit-%floatz_version%\samples\Layouting Forms\images\Layouting*.jpg" > nul
del "..\..\..\floatz.dev.kit-%floatz_version%\samples\Layouting Navigation\images\Layouting*.jpg" > nul
del "..\..\..\floatz.dev.kit-%floatz_version%\samples\Layouting Pages\images\Layouting*.jpg" > nul
cd ..\..\..
zip floatz.dev.kit-%floatz_version%.zip floatz.dev.kit-%floatz_version% -r -q
rd floatz.dev.kit-1.1.2 /s /q
cd floatz.dev.kit/tools/shrink

echo Creating floatz-%floatz_version%.zip ...
xcopy ..\..\..\floatz ..\..\..\floatz-%floatz_version% /s /e /i /v > nul
del "..\..\..\floatz-%floatz_version%\.project" > nul
cd ..\..\..
zip floatz-%floatz_version%.zip floatz-%floatz_version% -r -q
rd floatz-1.1.2 /s /q
cd floatz.dev.kit/tools/shrink

cd ../build
set floatz_version=
set floatz_jquery_version=