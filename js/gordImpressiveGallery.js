/**
 * @author   Antonio Gordievskiy
 * @module   jQuery module
 * @name     gordImpressiveGallery
 * @link     https://bitbucket.org/AntonGordievsky/gordimpressivegallery
 * @throws   If the container for component is not specified,
 *           an exception is {"ImpressiveGallery: container not defined!"}
 * @throws   If there are more than one container,
 *           an exception is {"ImpressiveGallery: container must be only one!"}
 * @throws   If you do not define a URL link for an array of objects with image information,
 *           an exception is {"ImpressiveGallery: Please specify the URL of JSON-array!"}
 */

;( function ( $ ) {

    $.fn.gordImpressiveGallery = function ( options ) {
        var settings = $.extend({
            container        : $(this),
            sourceURL        : null,
            initHeight       : 200,
            margin           : 2,
            imagesBackground : 'lightgrey',
            minContainerWidth: 1000,
            maxContainerWidth: 1600
        }, options );

        if ( settings.container.length == 0 ) {
            console.warn('ImpressiveGallery: container not defined!');
            return;
        } else if ( settings.container.length > 1 ) {
            console.warn('ImpressiveGallery: container must be only one!');
            return;
        } else if ( settings.sourceURL === null ) {
            console.warn('ImpressiveGallery: Please specify the URL of JSON-array!');
            return;
        };

        var images = [];

        $.getJSON( settings.sourceURL )
            .done( function ( data ) {
                images = data;
                createDOM();
                recalcDivs();
                badPictures();
            })
            .fail( function () {
                console.warn( "ImpressiveGallery: object JSON wasn't received from server" );
            });

        function createDOM() {
            $(settings.container).css({
                'min-width': settings.minContainerWidth,
                'max-width': settings.maxContainerWidth
            });

            $(images).each( function ( i, curImg ) {
                curImg.proportion = curImg.width / curImg.height;
            });

            var frag = document.createDocumentFragment();

            $(images).each( function ( i, curImg ) {
                var newImg = $(document.createElement('img'))
                    .attr( 'src', curImg.filename )
                    .attr( 'style', 'width: 100%; height: 100%; display: block;' );

                var div = $(document.createElement('div')).append(newImg)
                    .attr( 'style',  'width:' + images[i].width  + 'px;' +
                                    'height:' + images[i].height + 'px;' +
                                    'margin:' + settings.margin  + 'px;' +
                          'background-color:' + settings.imagesBackground + ';');

                $(frag).append(div);
            });

            $(settings.container).css({
                'display'  : 'flex',
                'flex-wrap': 'wrap',
                'width'    : '100%'
            }).append(frag);
        };

        function recalcDivs() {
            $(images).each( function ( i, curImg ) {
                curImg.width  = settings.initHeight * curImg.proportion;
                curImg.height = settings.initHeight;
            });

            var curRowWidth    = 0;
            var preSumRowWidth = 0;
            var curRowStart    = 0;
            var containerWidth = Math.floor($(settings.container).width());
            var imagesCount    = images.length;

            for (var curIndex = 0; curIndex < imagesCount; curIndex++) {
                preSumRowWidth = curRowWidth;
                curRowWidth   += images[curIndex].width + settings.margin * 2;

                if ( curRowWidth > containerWidth ) {
                    var scale = 1 / ( 1 - ( containerWidth - preSumRowWidth ) /
                                containerWidth );

                    curRowWidth = 0;

                    for (var i = curRowStart; i < curIndex; i++) {
                        images[i].height = Math.floor(images[i].height * scale);
                        images[i].width  = Math.floor(images[i].height * images[i].proportion);
                        curRowWidth += images[i].width + settings.margin * 2;
                    };

                    //When the picture remains in line one, you need to recalculate
                    // the proportions relative to the width of the container
                    if (curIndex - curRowStart <= 0) {
                        images[curIndex].width  = containerWidth;
                        images[curIndex].height = images[curIndex].width / images[curIndex].proportion;
                        curIndex++;
                    } else {
                        images[curIndex - 1].width += containerWidth - curRowWidth;
                    }

                    curRowWidth = 0;
                    curRowStart = curIndex;
                    curIndex--;
                }
            }

            $(settings.container).find('div').each( function ( i ) {
                $(this).width ( images[i].width  )
                       .height( images[i].height );
            })
        };

        window.onresize = recalcDivs;

        function badPictures() {
            $(settings.container).find('img').each( function ( index, curImg ) {
                curImg.onerror = function() {
                    $(this).parent().remove(0);
                    images.splice( index, 1 );
                    recalcDivs();
                };
            });
        };

        return this;
    }

}) ( jQuery );
