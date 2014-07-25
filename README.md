![](https://github.com/floatzcss/floatz/blob/master/wiki/logo.png) floatz
======

**floatz is a flexible and easy to use CSS framework.** It provides a set of reusable CSS classes, Javascript modules and HTML code snippets that support web designers and developers to create state-of-the-art web sites, web applications and HTML based mobile apps - on all browsers, platforms and devices.

##Version history
* September, 2014 - Version 1.3.0 currently under construction
* July 29th, 2013 - Version 1.2.0 released
* July 17th, 2012 - Version 1.1.2 released
* October 26th, 2010 - Version 1.1.1 released
* April 5th, 2010 - Version 1.1.0 released
* January 5th, 2010 - Version 1.0.1 released

##Browser Support
![](https://github.com/floatzcss/floatz/blob/master/wiki/browsersupport.png)

##Basic concepts

###Boxes
The basic layout class is a *box*. Each *box* floats left (this is where the name **floatz** comes from) and gets by default a width of 100% of its surrounding parent element.
```
<div class="flz_box">
   ...
</div>
```
See it live: http://codepen.io/floatz/pen/BoiLj/

####Customizing boxes
*Boxes* can be easily customized via CSS.
```
.header {
  background-color: #444;
  color: #fff;
}
...
<div class="flz_box header">
   ...
</div>
```
See it live: http://codepen.io/floatz/pen/KLakm

###Layouters
*Layouters* are used to give *boxes* specific widths. It is important to use the correct *layouter* according to the position of the *box* (l=left, m=mid, r=right) to make it work properly in all browsers.
```
<div class="flz_box flz_l25">
   ...
</div>
<div class="flz_box flz_m25">
   ...
</div>
<div class="flz_box flz_m25">
   ...
</div>
<div class="flz_box flz_r25">
   ...
</div>
```
See it live: http://codepen.io/floatz/pen/lzAew

The following *layouters* are provided out of the box:

| Layouter                | Widths                                          |
| ----------------------- | ----------------------------------------------- |
| flz_l&lt;percentage&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80, 90      |
| flz_m&lt;percentage&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80          |
| flz_r&lt;percentage&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80, 90, 100 |

####Clearing the float
In best cases the sum of all *layouters* in a row gets 100%. If not, clear the float by attaching **flz_clear** to the first *box* of the next row.
```
<!-- First row -->
<div class="flz_box flz_l25">
   ...
</div>
<div class="flz_box flz_r50">
   ...
</div>
<!-- Second row -->
<div class="flz_box flz_l25 flz_clear">
   ...
</div>
<div class="flz_box flz_r75">
   ...
</div>
```
See it live: http://codepen.io/floatz/pen/kLaeC

Alternatively the *boxes* of each row can be surrounded with an additional *box* which is the most stable solution especially when dealing with *boxes* of different heights.
```
<!-- First row -->
<div class="flz_box">
   <div class="flz_box flz_l25">
      ...
   </div>
   <div class="flz_box flz_r50">
      ...
   </div>
</div>
<!-- Second row -->
<div class="flz_box">
   <div class="flz_box flz_l25">
      ...
   </div>
   <div class="flz_box flz_r75">
      ...
   </div>
</div>
```
See it live: http://codepen.io/floatz/pen/foBvy

###Spacers
*Spacers* are used to add whitespace to *boxes*. According to *layouters* it is necessary to follow the same (l=left, m=mid, r=right) semantic depending on the position of the surrounding *box* to make them work accordingly. The following example shows *spacers* in a *single row / multiple column scenario*.
```
<div class="flz_box flz_r25">
   <div class="flz_lspacer">
   ...
   </div>
</div>
<div class="flz_box flz_m50">
   <div class="flz_mspacer">
      ...
   </div>
</div>
<div class="flz_box flz_r25">
   <div class="flz_rspacer">
      ...
   </div>
</div>
```
See it live: http://codepen.io/floatz/pen/HzIrA

####Stacking spacers

It is also possible to stack *boxes* and *spacers* (e.g. in form layouts). **floatz** provides the necessary classes and takes care that each row / column gets its appropriate whitespace. The following example shows such a *multiple row / multiple column* scenario.
```
<div class="flz_box flz_l33">
   <div class="flz_lspacer_mrmc_top">
      ...
   </div>
</div>
<div class="flz_box flz_m33">
   <div class="flz_mspacer_mrmc_top">
      ...
   </div>
</div>
<div class="flz_box flz_r33">
   <div class="flz_rspacer_mrmc_top">
      ...
   </div>
</div>
<div class="flz_box flz_l33">
   <div class="flz_lspacer_mrmc_mid">
      ...
   </div>
</div>
<div class="flz_box flz_m33">
   <div class="flz_mspacer_mrmc_mid">
      ...
   </div>
</div>
<div class="flz_box flz_r33">
   <div class="flz_rspacer_mrmc_mid">
      ...
   </div>
</div>
<div class="flz_box flz_l33">
   <div class="flz_lspacer_mrmc_bottom">
      ...
   </div>
</div>
<div class="flz_box flz_m33">
   <div class="flz_mspacer_mrmc_bottom">
      ...
   </div>
</div>
<div class="flz_box flz_r33">
   <div class="flz_rspacer_mrmc_bottom">
      ...
   </div>
</div>
```
See it live: http://codepen.io/floatz/pen/aHscp

####Nesting spacers
In real world scenarios it is often the case that *boxes* and *spacers* must be nested. To handle such situations **floatz** provides *subspacers*.
```
<div class="flz_box">
  <div class="flz_spacer">
      <div class="flz_box flz_l25">
        <div class="flz_lsubspacer">
          ...
        </div>
      </div>
      <div class="flz_box flz_m50">
        <div class="flz_msubspacer">
           ...
        </div>
      </div>
      <div class="flz_box flz_r25">
        <div class="flz_rsubspacer">
           ...
		</div>
	</div>
</div>
```

See it live: http://codepen.io/floatz/pen/FgJIC

*Subspacers* can of course be used in nested scenarios too and it is possible to create any imanginable combination of stacked and nested *boxes* just by combining the provided *layouters* and *spacers*.

See it live: http://codepen.io/floatz/pen/aHscp<br />
See it live: http://codepen.io/floatz/pen/KjzIm

The following *spacers* are provided out of the box:

| Spacer                  | Subspacer                  | Scenario                   | Description         |
| ----------------------- | -------------------------- | -------------------------- | ------------------- |
| flz_spacer              | flz_subspacer              | Single row / Single column | Basic spacer        |
| flz_lspacer             | flz_lsubspacer             | Single row / Multi column  | Left spacer         |
| flz_mspacer             | flz_msubspacer             | Single row / Multi column  | Mid spacer          |
| flz_rspacer             | flz_rsubspacer             | Single row / Multi column  | Right spacer        |
| flz_spacer_mrsc_top     | flz_subspacer_mrsc_top     | Multi row / Single column  | Top spacer          |
| flz_spacer_mrsc_mid     | flz_subspacer_mrsc_mid     | Multi row / Single column  | Mid spacer          |
| flz_spacer_mrsc_bottom  | flz_subspacer_mrsc_bottom  | Multi row / Single column  | Bottom spacer       |
| flz_lspacer_mrmc_top    | flz_lsubspacer_mrmc_top    | Multi row / Multi column   | Top left spacer     |
| flz_lspacer_mrmc_mid    | flz_lsubspacer_mrmc_mid    | Multi row / Multi column   | Mid left spacer     |
| flz_lspacer_mrmc_bottom | flz_lsubspacer_mrmc_bottom | Multi row / Multi column   | Bottom left spacer  |
| flz_mspacer_mrmc_top    | flz_msubspacer_mrmc_top    | Multi row / Multi column   | Top mid spacer      |
| flz_mspacer_mrmc_mid    | flz_msubspacer_mrmc_mid    | Multi row / Multi column   | Mid mid spacer      |
| flz_mspacer_mrmc_bottom | flz_mspacer_mrmc_bottom    | Multi row / Multi column   | Bottom mid spacer   |
| flz_rspacer_mrmc_top    | flz_rspacer_mrmc_top       | Multi row / Multi column   | Top right spacer    |
| flz_rspacer_mrmc_mid    | flz_rspacer_mrmc_mid       | Multi row / Multi column   | Mid right spacer    |
| flz_rspacer_mrmc_bottom | flz_rspacer_mrmc_bottom    | Multi row / Multi column   | Bottom right spacer |

##Layouting pages
###Layouting pages with boxes
The root element for a *page* is the **flz_page** id.
```
<body>
  <div id="flz_page">
     ...
  </div>
</body>
```
Depending on the kind of *page* layout that should be used, the according *layout module* must be imported into the websites stylesheet.
```
/* Loads floatz CSS framework */
@import url(http://design.humml.eu/toolbox/floatz/latest/floatz.liquid.css);
...
```
See it live: http://codepen.io/floatz/pen/eJbjr
```
/* Loads floatz CSS framework */
@import url(http://design.humml.eu/toolbox/floatz/latest/floatz.fixed.css);
...
```
See it live: http://codepen.io/floatz/pen/wugzl
```
/* Loads floatz CSS framework */
@import url(http://design.humml.eu/toolbox/floatz/latest/floatz.center.css);
...
```
See it live: http://codepen.io/floatz/pen/ayAmd

####Combining liquid and fixed layout

When using the *liquid layout module* each *box* increases its width according to the given percentage of the used *layouter*. For situations where only one of the *boxes* should increase dynamically but the others should always have a fixed width, the markup and CSS must be changed as follows.

First the *layouter* must be removed from the fixed *box* and **flz_box** must be removed from the liquid *box*.
```
<div id="flz_page">
   ...
   <div class="flz_box nav">
      ...
   </div>
   <div class="content">
      ...
   </div>
</div>
```
Next the liquid *box* must get a margin and the fixed *box* an according width.
```
/* Loads floatz CSS framework */
@import url(http://design.humml.eu/toolbox/floatz/latest/floatz.liquid.css);

.nav {
  width: 25em;
}

.content {
  margin-left: 25em;
}
...
```
See it live: http://codepen.io/floatz/pen/JfAlp (Liquid, 1 fixed column)<br />
See it live: http://codepen.io/floatz/pen/tHzsB (Liquid, 2 fixed columns)

####Combining liquid and centered layout

For a liquid and centered *page* layout the *liquid layout module* is required and the body element must get the desired left and right margins.
```
/* Loads floatz CSS framework */
@import url(http://design.humml.eu/toolbox/floatz/latest/floatz.liquid.css);
...
body {
  margin: 0 10%;
}
```
See it live: http://codepen.io/floatz/pen/zraiL (Centered liquid)<br />
See it live: http://codepen.io/floatz/pen/vtnwC (Centered liquid, 1 fixed column)<br />
See it live: http://codepen.io/floatz/pen/uybke (Centered liquid, 2 fixed columns)

TODO: One page layout example<br />
TODO: Examples with equal heights

### Layouting pages with panels
Since version 1.2.0 **floatz** provides a layouting mechanism called *panel layout*. With this mechanism, which has been inspired by [Google Web Toolkits layout panels](http://www.gwtproject.org/doc/latest/DevGuideUiPanels.html), it is possible to create modern desktop like layouts that are utilizing the whole browser view port, which can also be interesing for developing HTML based mobile apps.

*Panel layouts* make use of the CSS classes *flz_panel* and *flz_scrollpanel* instead of *flz_box*.

```
<div class="flz_panel header">
   ...
</div>
<div class="flz_panel nav">
   ...
</div>
<div class="flz_scrollpanel content">
   ...
</div>
<div class="flz_panel footer">
   ...
</div>
```
The dimensions of the panels are provided via CSS.
```
.header {
  bottom: auto;
  height: 3.5em;
  margin: 1em 1em 0.5em 1em;
}

.nav {
  bottom: 3em;
  padding: 0.5em 0.5em 0.5em 1em;
  top: 5em;
  right: auto;
  width: 23.5em;
}

.content {
  bottom: 3em;
  left: 25em;
  padding: 0.5em 1em 0.5em 0.5em;
  top: 5em;
}

.footer {
  height: 1.5em;
  padding: 0.5em 1em 1em 1em;
  top: auto;
}
```
For smooth scrolling within scroll panels on mobile Webkit based browsers the following mobile javascript module must be additionally loaded during startup.
```
// Load jquery, ua-parser and floatz in correct order
$LAB.script("http://design.humml.eu/toolbox/floatz/latest/scripts/jquery-1.11.1.min.js")
    .script("http://design.humml.eu/toolbox/floatz/latest/scripts/ua-parser-0.7.0.min.js").wait()
    .script("http://design.humml.eu/toolbox/floatz/latest/scripts/floatz.js")
    .script("http://design.humml.eu/toolbox/floatz/latest/scripts/floatz.mobile.js")
    .wait(function() {
	$(document).ready(function() {
       
	// Start floatz modules
	floatz.start({
	      debug : true,
	      logLevel : floatz.LOGLEVEL.DEBUG,
	      modules : ["floatz.mobile"]
		});
	});
});
```

See it live: http://codepen.io/floatz/pen/pyqeJ

##Layouting Navigation
Easing the layout of navigational elements is one of the key purposes of **floatz** from the very beginning. Thus it provides a comprehensive set of reusable CSS classes for different navigation scenarios. The underlying markup is based on simple lists.

###List navigations
They easiest form of navigation is a simple horizontal list navigation using **flz_listnav**.

The following example shows such a list navigation. Each navigation item is separated using a separator character(which could have also been defined within CSS instead). The active item is marked with **flz_selected**.
```
<ul class="flz_listnav">
   <li class="flz_selected"><a href="#">Menu 1</a> |</li>
   <li><a href="#">Menu 2</a> |</li>
   <li><a href="#">Menu 3</a> |</li>
   <li><a href="#">Menu 4</a> |</li>
   <li><a href="#">Menu 5</a> |</li>
   <li><a href="#">Menu 6</a> |</li>
   <li><a href="#">Menu 7</a> |</li>
   <li><a href="#">Menu 8</a></li>
</ul>
```
See it live: http://codepen.io/floatz/pen/mpiHa

This simple principle is inherent to all other navigation elements. The next example shows how the list navigation can be extended to a top navigation element (usually used for secondary navigation items at the top of the page - e.g. for contact, sitemap, search, language selectors, etc.) just by adding **flz_topnav**.
```
<ul class="flz_listnav flz_topnav">
   <li><a href="#">Menu 6</a> |</li>
   <li><a href="#">Menu 7</a> |</li>
   <li><a href="#">Menu 8</a></li>
</ul>
```
See it live: http://codepen.io/floatz/pen/mpiHa

These are the provided CSS classes that can be used for list based navigation:

| Class                   | Purpose                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- |
| flz_breadcrumb          | Used for breadcrumb navigation, must be combined with flz_listnav                       |
| flz_listnav             | Base list navigation, can be used alone                                                 |
| flz_toolbar             | Used for toolbars, must be combined with flz_listnav                                    |
| flz_topnav              | Used for secondary navigation at the top of the page, must be combined with flz_listnav |

All listed navigation classes instead **flz_listnav** are absolute positioned. Thus they need a surrounding *box* that uses **flz_relative** or **position:relative** within CSS. If no relative *box* is defined, the navigation elements are positioned in the context of **flz_page** or the HTML **body**.

The following example shows **flz_toolbar** which positions in the context of its surrounding *box*.
```
<div class="flz_box flz_relative">
   <ul class="flz_listnav flz_toolbar">
      <li class="flz_selected"><a href="#"><span class="icon-camera"></span></a></li>
      <li><a href="#"><span class="icon-cog"></span></a></li>
      <li><a href="#"><span class="icon-star"></span></a></li>
      <li><a href="#"><span class="icon-share"></span></a></li>
   </ul>
   <h1>Header</h1>
   <p>
      ...
   </p>
</div>
```
See it live: http://codepen.io/floatz/pen/mpiHa

###Menus
Menus are also simple list elements but visually richer (means you have more possibilities to style them individually). One major difference is that menus must use a **div** element as container which gets the CSS class instead of the **ul** element as for list navigations.

The example shows a horizontal menu using **flz_hmenu**.
```
<div class="flz_hmenu">
   <ul>
      <li class="flz_selected"><a href="#">Menu 1</a></li>
      <li><a href="#">Menu 2</a></li>
      <li><a href="#">Menu 3</a></li>
      <li><a href="#">Menu 4</a></li>
      <li><a href="#">Menu 5</a></li>
   </ul>
</div>
```





See it live: http://codepen.io/floatz/pen/mpiHa

##Layouting Forms

To be continued ...
