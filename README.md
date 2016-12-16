# AnalogWatch

## This is a purely JavaScript plugin which will work with any Javascript framework

## Getting Started

First link the AnalogWatch.js file in the html <head> tag.After that in your HTML file create a div like shown below.Please note that the parent's <div> of this <div> should have "width" and "height" property explicitly defined.If the parent <div> of this <div> is <body>  ,make sure body has width and height defined.


```
<div id="analogWatch"></div>

```


Now inside your <script> add the following file as shown below.Make sure to call the function on document load.


```
document.addEventListener("DOMContentLoaded", function(event) { 
        var watch = new Watch('analogWatch',{
                                color:'#2483c5',
                                'handColor':'#fff'
                                });
        });

```


##Options

You can give your own colors to your watch by changing the 'color' and 'handColor' options.

'color' : '#000000' //by default        (background color of your watch)
'handColor' : '#ffffff' //by default    (background color of the hands)
