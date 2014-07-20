floatz
======

**floatz is a flexible and easy to use CSS framework.** It provides a set of reusable CSS classes, Javascript modules and HTML code snippets that support web designers and developers to create state-of-the-art web sites, web applications as well as HTML based mobile apps that work on all browsers, platforms and devices.

##Version history
* September, 2014 - Version 1.3.0 currently under construction
* July 29th, 2013 - Version 1.2.0 released
* July 17th, 2012 - Version 1.1.2 released
* October 26th, 2010 - Version 1.1.1 released
* April 5th, 2010 - Version 1.1.0 released
* January 5th, 2010 - Version 1.0.1 released

##Basic concepts

###Boxes
The basic layout class is the left floating box.

```
<div class="flz_box">
   ...
</div>
```
See it live: http://codepen.io/floatz/pen/BoiLj/

It can be customized easily via CSS.

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
By default each box gets 100% of the width from its parent element. Use layouters to give them specific widths. You have to take care that you use the correct depending on the box position (l=left, m=mid, r=right).

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

Usually the sum of all layouters in a row should be 100%. If not you have to clear the float by attaching *flz_clear* to the first box of the next row.

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

Alternatively you can surround each row with an additional box.
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
   <div class="flz_box flz_l25 flz_clear">
      ...
   </div>
   <div class="flz_box flz_r75">
      ...
   </div>
</div>
```
See it live: http://codepen.io/floatz/pen/foBvy

The following layouters are provided out-of-the-box:

| Layouter                | Widths                                          |
| ----------------------- | ----------------------------------------------- |
| flz_l&lt;percentage&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80, 90      |
| flz_m&lt;percentage&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80          |
| flz_r&lt;percentage&gt; | 10, 20, 25, 33, 40, 50, 60, 66, 75, 80, 90, 100 |


###Spacers
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




