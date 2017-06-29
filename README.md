## gordImpressiveGallery ##

Сomponent creates a gallery of images based on the JSON array of objects, each of which contains the name, width and height of the image.
The images are set to the minimum height of their display, which can increase during the operation of the component, so that images occupy the entire available width of the container. The proportions are preserved.

[Demo](https://gordievskiy.com/lab/gordImpressiveGallery)

## How to use? ##

**First, make sure you are using valid DOCTYPE and the jQuery library.**

**Include necessary JS files:**
    
```
#!html

<script type="text/javascript" src="js/gordImpressiveGallery.js"></script>
```

**Prepare an <ul> container tag like this:**
    
```
#!html

<section id="gallery"></section>
```

*You can use any class name, the main thing is to transfer the component to the container, in which it will place the necessary DOM and perform the necessary actions.*

**Fire plugin using jQuery selector**

This is a basic use case (mostly default settings):
    
```
#!javascript

$('.horizontal-hover-effect').gordHoverEffect({
    itemsNames: [
        'item 1',
        'item 2',
        'item 3'
    ],
    itemsLinks: [
        '/item-1',
        '/item-2',
        '/item-3'
    ]
});
```

**You can set the following custom settings:**

* **itemsNames**

    Type: Array

    Names of menu items.

* **itemsLinks**

    Type: Array

    Links that should open when you click on menu items.

* **direction**

    Type: String

    *Default: 'horizontal'*

    Direction of the effect: vertical or horizontal. If your component should work vertically, don't forget to set this parameter.

**Optional settings:**

* **itemsClass**

    Type: String

    *Default: null*

    Set a class for elements created by the component.

* **onClick**

    Type: Function

    *Default: null*

    Set a handler for a click event.

**Example:**
```
#!javascript

$('.vertical-hover-effect').gordHoverEffect({
    direction : 'vertical',
    itemsNames: [
        'Clothing',
        'Electronics',
        'Shoes',
        'Watches',
        'Jewellery',
        'Sports'
    ],
    itemsLinks: [
        '/clothing',
        '/electronics',
        '/shoes',
        '/watches',
        '/jewellery',
        '/sports'
    ],
    itemsClass: "list-items",
    onClick   : handler
});

function handler ( event ) {
    console.log( $( event.target ) );
    return false;
};

```

*You can initialize instances of the effect one at a time, or you can specify settings for multiple instances at once, if they are the same.
Vertical and horizontal effects are set separately using different initial 'direction' options.*