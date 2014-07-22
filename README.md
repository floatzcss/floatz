floatz
======

**floatz is a flexible and easy to use CSS framework.** It provides a set of reusable CSS classes, Javascript modules and HTML code snippets that support web designers and developers to create state-of-the-art web sites, web applications and HTML based mobile apps - on all browsers, platforms and devices.

##Version history
* September, 2014 - Version 1.3.0 currently under construction
* July 29th, 2013 - Version 1.2.0 released
* July 17th, 2012 - Version 1.1.2 released
* October 26th, 2010 - Version 1.1.1 released
* April 5th, 2010 - Version 1.1.0 released
* January 5th, 2010 - Version 1.0.1 released

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

To be continued ...
