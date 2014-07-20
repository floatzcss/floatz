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
```
<div class="flz_box flz_r25">
   ...
</div>
<div class="flz_box flz_m50">
   ...
</div>
<div class="flz_box flz_r25">
   ...
</div>
```

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




