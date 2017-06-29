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

**Create a container such as:**
    
```
#!html

<section id="gallery"></section>
```

*You can use any class or id, but remember that if you have several galleries, you need to create them one at a time.*

**Fire plugin using jQuery selector**

This is a basic use case (mostly default settings):
    
```
#!javascript

$('#gallery').gordImpressiveGallery({
    sourceURL        : "https://gordievskiy.com/lab/gordImpressiveGallery/arrayOfObjects",
    initHeight       : 200,
    imagesBackground : 'lightgrey',
    margin           : 2,
    minContainerWidth: 0,
    maxContainerWidth: 1200
});
```

**You must set the following settings:**

* **sourceURL**

    Type: String

    A reference to the JSON array of objects, each of which looks like this:

```
#!javascript

var arrayOfObjects = `[
    { "filename": "beautiful-img.jpg", "height": "500", "width": "700" },
    { "filename": "beautiful-img.jpg", "height": "500", "width": "700" },
    ...
]`;
```

**Optional settings:**

* **initHeight**

    Type: Number

    *Default: 200*

    Minimum image height.

* **imagesBackground**

    Type: String

    *Default: null*

    Any valid css color-coding. Sets background for image containers. They are loaded earlier than the pictures and line up in the grid (noticeably with a slow internet connection).

* **margin**

    Type: Number

    *Default: 2*

    Sets the distance between images (margin: 2).

* **minContainerWidth**

    Type: Number

    *Default: 1000*

    Sets the minimum size of the gallery container.

* **maxContainerWidth**

    Type: Number

    *Default: 1600*

    Sets the maximum size of the gallery container.

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