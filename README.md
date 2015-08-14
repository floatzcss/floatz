![](https://github.com/floatzcss/floatz/blob/master/wiki/logo.png) floatz
======

**floatz is a flexible and easy to use CSS framework.** It provides a set of reusable CSS classes, Javascript modules and HTML code snippets that support web designers and developers to create state-of-the-art web sites, web applications and HTML based mobile apps - on all browsers, platforms and devices.

##Table of content
* [Version history](#version-history)
* [Browser support](#browser-support)
* [Basic concepts](#basic-concepts)
* [Layouting pages](#layouting-pages)
* [Layouting navigation](#layouting-navigation)
* [Layouting forms](#layouting-forms)
* [Responsive layouts](#responsive-layouts)

##Version history
* 22th February, 2015 - Version 1.3.0 released
* 2nd December, 2014 - [Hotfix](https://github.com/floatzcss/floatz.gwt/blob/master/download/floatz.gwt-1.2.0hotfix01.jar) for GWT 2.7.0 
* July 29th, 2013 - Version 1.2.0 released
* July 17th, 2012 - Version 1.1.2 released
* October 26th, 2010 - Version 1.1.1 released
* April 5th, 2010 - Version 1.1.0 released
* January 5th, 2010 - Version 1.0.1 released

##Browser support
![](https://github.com/floatzcss/floatz/blob/master/wiki/browsersupport.png)

> Please note: since **version 1.3.0** IE specific CSS hacks have moved into own stylesheets to reduce CSS size for modern browsers. Thus if you want to support older browsers you have to use the conditional statements within HTML to load IE specific stylesheets (see example below). Take care that these styles are loaded AFTER the used stylesheets.

```
<head>
...
<link rel="stylesheet" type="text/css" href="styles/project.css" />
<!--[if lte IE 6]>
<link rel="stylesheet" type="text/css" href="styles/floatz-1.3.0/floatz.liquid.ie-lte6.css" />
<![endif]-->
<!--[if IE 7]>
<link rel="stylesheet" type="text/css" href="styles/floatz-1.3.0/floatz.liquid.ie-7.css" />
<![endif]-->
<!--[if IE 8]>
<link rel="stylesheet" type="text/css" href="styles/floatz-1.3.0/floatz.liquid.ie-8.css" />
<![endif]-->
<!--[if IE 9]>
<link rel="stylesheet" type="text/css" href="styles/floatz-1.3.0/floatz.liquid.ie-9.css" />
<![endif]-->
...
</head>
```

##Basic concepts

* [Boxes](#boxes)
* [Layouters](#layouters)
 * [Clearing the float](#clearing-the-float)
* [Spacers](#spacers)
 * [Stacking spacers](#stacking-spacers)
 * [Nesting spacers](#nesting-spacers)
 * [Using spacers in modern browsers](#using-spacers-in-modern-browsers)

###Boxes
The basic layout class is a *box*. Each *box* floats left (this is where the name **floatz** comes from) and gets by default a width of 100% of its surrounding parent element.

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
See it in action: http://codepen.io/floatz/pen/KLakm

###Layouters

*Layouters* are used to give *boxes* specific widths. It is important to use the correct *layouter* according to the horizontal orientation of the *box* (l=left, m=mid, r=right) to make them work properly in all browsers.
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
See it in action: http://codepen.io/floatz/pen/lzAew

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
See it in action: http://codepen.io/floatz/pen/kLaeC

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
See it in action: http://codepen.io/floatz/pen/foBvy

###Spacers
*Spacers* are used to add whitespace to *boxes*. According to *layouters* it is necessary to follow the same (l=left, m=mid, r=right) semantic depending on the horizontal orientation of the surrounding *box* to make them work accordingly. The following example shows *spacers* in a *single row / multiple column scenario*.
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
See it in action: http://codepen.io/floatz/pen/HzIrA

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
See it in action: http://codepen.io/floatz/pen/aHscp

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

See it in action: http://codepen.io/floatz/pen/FgJIC

*Subspacers* can of course be used in nested scenarios too and it is possible to create any imanginable combination of stacked and nested *boxes* just by combining the provided *layouters* and *spacers*.

See it in action: http://codepen.io/floatz/pen/aHscp<br />
See it in action: http://codepen.io/floatz/pen/KjzIm

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

####Using spacers in modern browsers

Since **floatz 1.3.0** *boxes* are using *box-sizing: border-box* by default. Thus it is not necessary to add extra *divs* for creating whitespace in such cases. The *spacers* can simply be added to the *boxes* side by side with *layouters*.

> Please note: if legacy browsers have to be supported it is still necessary to use the 'old' method with separate *divs* for each *spacer*, otherwise the layout will collapse. See http://caniuse.com/css3-boxsizing for information about which browsers do / do not support *box-sizing*.

```
<div class="flz_box flz_l25 flz_lspacer">
   ...
</div>
<div class="flz_box flz_m50 flz_mspacer">
   ...
</div>
<div class="flz_box flz_r25 flz_rspacer">
   ...
</div>
```
See it in action: http://codepen.io/floatz/pen/boiAx<br />
See it in action: http://codepen.io/floatz/pen/FqJgl<br />
See it in action: http://codepen.io/floatz/pen/ntpBw

##Layouting pages

* [Layouting pages with boxes](#layouting-pages-with-boxes)
 * [Combining liquid and fixed layout](#combining-liquid-and-fixed-layout) 
 * [Combining liquid and centered layout](#combining-liquid-and-centered-layout)
* [Layouting pages with panels](#layouting-pages-with-panels)

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
See it in action: http://codepen.io/floatz/pen/eJbjr
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
See it in action: http://codepen.io/floatz/pen/ayAmd

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
See it in action: http://codepen.io/floatz/pen/JfAlp (Liquid, 1 fixed column)<br />
See it in action: http://codepen.io/floatz/pen/tHzsB (Liquid, 2 fixed columns)

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
See it in action: http://codepen.io/floatz/pen/zraiL (Centered liquid)<br />
See it in action: http://codepen.io/floatz/pen/vtnwC (Centered liquid, 1 fixed column)<br />
See it in action: http://codepen.io/floatz/pen/uybke (Centered liquid, 2 fixed columns)

### Layouting pages with panels
Since version 1.2.0 **floatz** provides a layouting mechanism called *panel layout*. With this mechanism, which has been inspired by [Google Web Toolkits layout panels](http://www.gwtproject.org/doc/latest/DevGuideUiPanels.html), it is possible to create modern desktop like layouts that are utilizing the whole browser view port, which can also be interesing for developing HTML based mobile apps.

> Please note that panel based layouts are supported for all browsers, but in Internet Explorer only starting at version 7+.

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
$LAB.script("http://design.humml.eu/toolbox/floatz/latest/scripts/jquery-1.11.2.min.js")
    .script("http://design.humml.eu/toolbox/floatz/latest/scripts/ua-parser-0.7.3.min.js").wait()
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
See it in action: http://codepen.io/floatz/pen/pyqeJ<br />
See it in action: http://codepen.io/floatz/pen/khgBI

##Layouting navigation
Easing the layout of navigational elements is one of the key purposes of **floatz** from the very beginning. Thus it provides a comprehensive set of reusable CSS classes for different navigation scenarios. The underlying markup is based on simple lists.

* [List navigations](#list-navigations)
* [Menus](#menus)
* [Skip links](#skip-links)
* [Workflow indicators](#workflow-indicators)
* [Tab panels](#tab-panels)

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
See it in action: http://codepen.io/floatz/pen/zkegd<br />
See it in action: http://codepen.io/floatz/pen/mpiHa

This simple principle is inherent to all other navigation elements. The next example shows how the list navigation can be extended to a top navigation element (usually used for secondary navigation items at the top of the page - e.g. for contact, sitemap, search, language selectors, etc.) just by adding **flz_topnav**.
```
<ul class="flz_listnav flz_topnav">
   <li><a href="#">Menu 6</a> |</li>
   <li><a href="#">Menu 7</a> |</li>
   <li><a href="#">Menu 8</a></li>
</ul>
```
See it in action: http://codepen.io/floatz/pen/mpiHa

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
See it in action: http://codepen.io/floatz/pen/mpiHa

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
See it in action: http://codepen.io/floatz/pen/GAvlE<br />
See it in action: http://codepen.io/floatz/pen/mpiHa

The next example shows a vertical menu using **flz_vmenu**. Vertical menus can also be used for hierarchical menus. The example also shows the use of **flz_disabled** for indicating disabled menu items.
```      
<div class="flz_vmenu">
   <ul>
      <li class="flz_selected"><a href="#">Menu 1</a></li>
      <li><a href="#">Menu 2</a>
         <ul>
            <li><a href="#">Submenu 2.1</a></li>
            <li class="flz_disabled"><a>Submenu 2.2</a></li>
            <li><a href="#">Submenu 2.3</a>
               <ul>
                  <li><a href="#">Submenu 2.3.1</a></li>
                  <li><a href="#">Submenu 2.3.2</a></li>
                  <li><a href="#">Submenu 2.3.3</a></li>
               </ul>
            </li>              
         </ul>
      </li>
      <li><a href="#">Menu 3</a></li>
      <li><a href="#">Menu 4</a></li>
      <li><a href="#">Menu 5</a></li>
   </ul>
</div>
```
See it in action: http://codepen.io/floatz/pen/mpiHa

###Skip links
To increase accessibility for users that are dependent on screen readers **floatz** offers a skip link navigation that allows users to use the tab keys and to jump directly to sections within the page without the necessity to let screen readers repeatedly read everything each time a page is loaded again (see http://webaim.org/techniques/skipnav/ for more details on this topic).

To support this it is neccessary to place a skip link navigation as the first element in the *page* so that this links are the first that is shown when the user tabs from the browsers address bar into the page.
```
<div id="flz_page">
   <!-- Skiplink navigation -->
   <div class="flz_skipnav">
      <a class="flz_skiplink" href="#menu">Skip to menu</a>
      <a class="flz_skiplink" href="#submenu">Skip to submenu</a>
      <a class="flz_skiplink" href="#content">Skip to content</a>
   </div>
   ...
</div>
```
Next the relevant skip link targets must be defined within the page using **a** tags marked with **flz_anchor**.
```
<div class="flz_box flz_r75 content">
   <a id="content" class="flz_anchor"></a>
   ...
</div>  
...
```
At least it is also necessary to load the skiplink javascript module to add support for all browsers.
```
// Load jquery, ua-parser and floatz in correct order
$LAB.script("http://design.humml.eu/toolbox/floatz/latest/scripts/jquery-1.11.2.min.js")
   .script("http://design.humml.eu/toolbox/floatz/latest/scripts/ua-parser-0.7.3.min.js").wait()
   .script("http://design.humml.eu/toolbox/floatz/latest/scripts/floatz.js")
   .script("http://design.humml.eu/toolbox/floatz/latest/scripts/floatz.skiplink.js")
   .wait(function() {
      $(document).ready(function() {
			
         // Start floatz modules
         floatz.start({
            debug : true,
            logLevel : floatz.LOGLEVEL.DEBUG,
            modules : ["floatz.skiplink"]
         });
      });
   });
```
See it in action: http://codepen.io/floatz/pen/mpiHa

###Workflow indicators
When dealing with workflows it makes sense to visualy indicate the current workflow state. Thus **floatz** offers the CSS class **flz_workflow** which can be used for exactly that kind of use case.
```
<ul class="flz_workflow">
   <li class="flz_passed"><a href="#">First</a></li>
   <li class="flz_passed"><a href="#">Second</a></li>
   <li class="flz_selected"><a href="#">The third</a></li>
   <li><a>Forth and last</a></li>
</ul>
```
See it in action: http://codepen.io/floatz/pen/vIkEg?editors=100

###Tab panels

Creating tab panels is just as simple as creating list navigations or menus. 

```
<div class="flz_htabmenu">
	<ul>
		<li class="flz_selected"><a href="#">Tab 1</a></li>
		<li><a href="#">Tab 2</a></li>
		<li><a href="#">Tab 3</a></li>
		<li class="flz_disabled"><a>Disabled Tab</a></li>
		<li><a href="#">Tab 4</a></li>
	</ul>
</div>
```
See it in action: http://codepen.io/floatz/pen/KqEot<br />

For a bottom aligned tab panel the class simply must be changed to **flz_htabmenu_bottom**.
```
<div class="flz_htabmenu_bottom">
	<ul>
		<li class="flz_selected"><a href="#">Tab 1</a></li>
		<li><a href="#">Tab 2</a></li>
		<li><a href="#">Tab 3</a></li>
		<li class="flz_disabled"><a>Disabled Tab</a></li>
		<li><a href="#">Tab 4</a></li>
	</ul>
</div>
```
See it in action: http://codepen.io/floatz/pen/wrxsj

The default tab panel implementation uses sprite images to support round corners in all browsers (until IE6). For customization the styles simply have to be overridden with or without sprite images if used only in newer browsers.

##Layouting forms

* [Form basics](#form-basics)
 * [Checkboxes and radio buttons](#checkboxes-and-radio-buttons)
 * [Comboboxes](#comboboxes)
* [Complex forms](#complex-forms)
 * [Layouting with spacers](#layouting-with-spacers)
 * [Layouting with fieldsets](#layouting-with-fieldsets)
* [Forms in modern browsers](#forms-in-modern-browsers)

### Form basics

Easing the layout of forms is one of the greatest strengths and initial purposes of **floatz**. By adding **flz_form** to the *form* tag or any other block level HTML tag each form field spans the whole width of its parent container by default. 
> To support older browsers that do not support attribute selectors (like IE6) it is necessary to annotate each *input* type with the corresponding floatz style: **flz_textbox**, **flz_checkbox**, **flz_radio**, **flz_button**. These styles can be left in modern browsers.

```
<form class="flz_form">
	<label for="field1">Text Field</label>
	<input type="text" class="flz_textbox" id="field1" />
	<label for="field2">Password Field</label>
	<input type="password" class="flz_textbox" id="field2" />
	<label for="dropdown1">Dropdown 1</label>
	<select id="dropdown1">
		<option>Option 1</option>
		<option>Option 2</option>
		<option>Option 3</option>
		<option>Option 4</option>
	</select>    
	<label for="textarea1">Textarea 1</label>
	<textarea id="textarea1"></textarea>
	
	...
	
	<div class="flz_box">
		<input type="submit" class="flz_button" value="Save" />
		<input type="button" class="flz_button" value="Cancel" />
		<input type="reset" class="flz_button" value="Reset" />
		<button>Help</button>
	</div>
</form>
```
See it in action: http://codepen.io/floatz/pen/Fdqse

#### Checkboxes and radio buttons

Usually labels should be in the same row like checkboxes and radio buttons. To acchieve this the corresponding labels must be annotated with **flz_inline**.
```
<input type="checkbox" class="flz_checkbox" id="checkbox1" />
<label for="checkbox1" class="flz_inline">Checkbox 1</label>
<input type="checkbox" class="flz_checkbox" id="checkbox2" />
<label for="checkbox2" class="flz_inline">Checkbox 2</label>
<input type="checkbox" class="flz_checkbox" id="checkbox3" />
<label for="checkbox3" class="flz_inline">Checkbox 3</label>

<input type="radio" class="flz_radio" id="radio1" name="radioGroup1" />
<label for="radio1" class="flz_inline">Radio 1</label>
<input type="radio" class="flz_radio" id="radio2" name="radioGroup1" />
<label for="radio2" class="flz_inline">Radio 2</label>
<input type="radio" class="flz_radio" id="radio3" name="radioGroup1" />
<label for="radio3" class="flz_inline">Radio 3</label>
```
See it in action: http://codepen.io/floatz/pen/Fdqse

#### Comboboxes

**floatz** also supports combinations of input fields and images.

```
<div class="flz_combobox">
	<input type="text" class="flz_textbox" id="combobox1" />
	<!-- Image must be in next line - otherwise unnecessary whitespace in IE -->
	<a href="#">
		<span class="icon-cog"></span>
	</a>
</div>
```
See it in action: http://codepen.io/floatz/pen/Fdqse

###Complex forms

Layouting complex forms is as easy as layouting pages. It´s just necessary to use *boxes*, *layouters* and *spacers* to create any imaginable form grid.

####Layouting with spacers

The following sample uses *spacers* to add white space to the input form.
```
<form class="flz_form">
  <div class="flz_box flz_l50">
    <div class="flz_lsubspacer_mrmc_top ">
      <label for="field1">Text Field</label>
      <input type="text" class="flz_textbox" id="field1" />
    </div>
  </div>
  <div class="flz_box flz_r50">
    <div class="flz_rsubspacer_mrmc_top">
      <label for="field2">Password Field</label>
      <input type="password" class="flz_textbox" id="field2" />
    </div>
  </div>
  ...
</form>
```
See it in action: http://codepen.io/floatz/pen/AeFnD

####Layouting with fieldsets
It is also possible to combine *spacers* and fieldsets for grouping input fields visually into logical units.
```
<form class="flz_form">
  <fieldset>
    <legend>Fieldset 1</legend>
    <div class="flz_box flz_l50">
      <div class="flz_lsubspacer">
        <label for="field1">Text Field</label>
        <input type="text" class="flz_textbox" id="field1" />
      </div>
    </div>
    <div class="flz_box flz_r50">
      <div class="flz_rsubspacer">
        <label for="field2">Password Field</label>
        <input type="password" class="flz_textbox" id="field2" />
      </div>
    </div>
  </fieldset>
  ...
</form>
```
See it in action: http://codepen.io/floatz/pen/DsBev

###Forms in modern browsers

As already [mentioned](#using-spacers-in-modern-browsers) **floatz** supports a wide range of browsers even legacy browsers like IE6 and 7. If it is assured that a website or application is only used in modern browsers the necessary elements and classes for layouting web forms can be reduced to a minimum.

The following example shows how a form can be layouted in modern browsers.

See it in action: http://codepen.io/floatz/pen/Cqcaj

#Responsive layouts

Since version 1.3.0 floatz provides out of the box support for [responsive design](http://en.wikipedia.org/wiki/Responsive_web_design).

##Device sizes

The following *breakpoints* are used within media queries to determine devices.

| Target device   | Orientiation | Size | min-width | max-width |
| --------------- | ------------ | :--: | --------: | --------: |
| Smartphone      | Portrait     | XS   | 0 px      | 480 px    |
| Smartphone      | Landscape    | S    | 481 px    | 767 px    |
| Tablet          | Portrait     | M    | 768 px    | 979 px    |
| Tablet, Desktop | Landscape    | L    | 980 px    | 1199 px   |
| Large Desktop   | Landscape    | XL   | 1200 px   | ...       |

##Responsive layouters

As described under [Basic concepts](#layouters) *layouters* are used to give *boxes* a specific width. Using *responsive layouters*, which are simply *layouters* extended with a device size specific postfix, you can define how each box should behave on different devices. 

The code example below creates the following layout:

* 4 columns for desktops and tablets in landscape mode (XL, L)
* 2 columns for tablets in portrait mode (M)
* 1 column for smartphones portrait and landscape mode (S, XS)

```
<div class="flz_box flz_l25 flz_l50_m flz_r100_s flz_r100_xs">
   ...
</div>
<div class="flz_box flz_m25 flz_r50_m flz_r100_s flz_r100_xs">
   ...
</div>
<div class="flz_box flz_m25 flz_l50_m flz_r100_s flz_r100_xs">
   ...
</div>
<div class="flz_box flz_r25 flz_r50_m flz_r100_s flz_r100_xs">
   ...
</div>
```
See it in action: http://codepen.io/floatz/pen/ZYQaza

The following *responsive layouters* are provided out of the box:

| Layouter                             | Widths                                          |
| ------------------------------------ | ----------------------------------------------- |
| flz_l&lt;percentage&gt;_&lt;size&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80, 90      |
| flz_m&lt;percentage&gt;_&lt;size&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80          |
| flz_r&lt;percentage&gt;_&lt;size&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80, 90, 100 |

##Responsive spacers

As explained under [Basic concepts](#spacers) *spacers* and *subspacers* are used to add whitespace to *boxes*. Similar to *responsive layouters* it is possible to adjust whitespace to the desired device size by simply adding a device size specific postfix to the given styles.

The code example below creates the following layout:

* 3 columns for desktops and tablets in landscape mode (XL, L)
* 2+1 columns for tablets in portrait mode (M)
* 1 column for smartphones portrait and landscape mode (S, XS)

```
<div class="flz_box flz_l25 flz_l50_m flz_r100_s flz_r100_xs">
  <div class="flz_lspacer flz_lspacer_mrmc_top_m flz_spacer_mrsc_top_s flz_spacer_mrsc_top_xs">
    ...
  </div>
</div>
<div class="flz_box flz_m50 flz_r50_m flz_r100_s flz_r100_xs">
  <div class="flz_mspacer flz_rspacer_mrmc_mid_m flz_spacer_mrsc_mid_s flz_spacer_mrsc_mid_xs">
    ...
  </div>
</div>
<div class="flz_box flz_r25 flz_r100_m flz_r100_s flz_r100_xs">
  <div class="flz_rspacer flz_spacer_mrsc_bottom_m flz_spacer_mrsc_bottom_s flz_spacer_mrsc_bottom_xs">
    ...
  </div>
</div>
```
See it in action: http://codepen.io/floatz/pen/QwyOWd

Following this principles any layout based on *layouters* and *spacers* can be made responsive.

See it in action: http://codepen.io/collection/XkOQVX

The following *responsive spacers* are provided out of the box:

| Spacer                  | Subspacer                  | Scenario                   | Description         |
| ----------------------- | -------------------------- | -------------------------- | ------------------- |
| flz_spacer_&lt;size&gt;              | flz_subspacer_&lt;size&gt;              | Single row / Single column | Basic spacer        |
| flz_lspacer_&lt;size&gt;             | flz_lsubspacer_&lt;size&gt;             | Single row / Multi column  | Left spacer         |
| flz_mspacer_&lt;size&gt;             | flz_msubspacer_&lt;size&gt;             | Single row / Multi column  | Mid spacer          |
| flz_rspacer_&lt;size&gt;             | flz_rsubspacer_&lt;size&gt;             | Single row / Multi column  | Right spacer        |
| flz_spacer_mrsc_top_&lt;size&gt;     | flz_subspacer_mrsc_top_&lt;size&gt;     | Multi row / Single column  | Top spacer          |
| flz_spacer_mrsc_mid_&lt;size&gt;     | flz_subspacer_mrsc_mid_&lt;size&gt;     | Multi row / Single column  | Mid spacer          |
| flz_spacer_mrsc_bottom_&lt;size&gt;  | flz_subspacer_mrsc_bottom_&lt;size&gt;  | Multi row / Single column  | Bottom spacer       |
| flz_lspacer_mrmc_top_&lt;size&gt;    | flz_lsubspacer_mrmc_top_&lt;size&gt;    | Multi row / Multi column   | Top left spacer     |
| flz_lspacer_mrmc_mid_&lt;size&gt;    | flz_lsubspacer_mrmc_mid_&lt;size&gt;    | Multi row / Multi column   | Mid left spacer     |
| flz_lspacer_mrmc_bottom_&lt;size&gt; | flz_lsubspacer_mrmc_bottom_&lt;size&gt; | Multi row / Multi column   | Bottom left spacer  |
| flz_mspacer_mrmc_top_&lt;size&gt;    | flz_msubspacer_mrmc_top_&lt;size&gt;    | Multi row / Multi column   | Top mid spacer      |
| flz_mspacer_mrmc_mid_&lt;size&gt;    | flz_msubspacer_mrmc_mid_&lt;size&gt;    | Multi row / Multi column   | Mid mid spacer      |
| flz_mspacer_mrmc_bottom_&lt;size&gt; | flz_mspacer_mrmc_bottom_&lt;size&gt;    | Multi row / Multi column   | Bottom mid spacer   |
| flz_rspacer_mrmc_top_&lt;size&gt;    | flz_rspacer_mrmc_top_&lt;size&gt;       | Multi row / Multi column   | Top right spacer    |
| flz_rspacer_mrmc_mid_&lt;size&gt;    | flz_rspacer_mrmc_mid_&lt;size&gt;       | Multi row / Multi column   | Mid right spacer    |
| flz_rspacer_mrmc_bottom_&lt;size&gt; | flz_rspacer_mrmc_bottom_&lt;size&gt;    | Multi row / Multi column   | Bottom right spacer |


