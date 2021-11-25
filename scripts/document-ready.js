// JavaScript Document
// end of page events

// Cookie Law
window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#00aa00",
                "text": "#ffdddd"
            },
            "button": {
                "background": "#00ff00"
            }
        },
        "content": {
            "message": "This website needs to store functional cookies only, on your device: we care about your privacy."
        }
    })

    if($.cookie('banner') == undefined) {
        $.cookie('banner') = 'visible';
        $('#overlay-banner').trigger("click");
    }
});

//"message": "COOKIES FREE! This website does NOT use cookies to ensure you get the best experience on our website. To manage cookies preferences, please use your browser settings."


(function ($) {
    $(document).ready(function () {

        // $('#overlay-banner.overlay').hide().

        $('a[data-rel^=lightcase]').lightcase();

        // lasciamo spazio per il footer sticky
        $('body').css('margin-bottom', $('footer').outerHeight());

        // Scroll to top
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $('#back-to-top').tooltip('show');

        // Barra capitoli affixata
        // if($('#capitoli').length) {
        //     var menu = $('#capitoli');
        //     var origOffsetY = menu.offset().top;
        //     var outerHeight = menu.outerHeight();
        //     menu.affix({offset: {top: origOffsetY} });
        // }
        if ($('#capitoli').length) {
            $('#capitoli').stick_in_parent();
        }

        // For performance reasons, the Tooltip and Popover data-apis are opt-in, meaning you must initialize them yourself.
        $('[data-toggle="tooltip"]').tooltip()

        meta = '.flexslider .slides li.flex-active-slide div.meta';

        function setMetaTopLeft(meta, all) {
            $meta = $(meta)
            $allmeta = meta.replace(".flex-active-slide", "");
            $parent = $($meta).siblings('img.img-responsive');
            $($meta).css({
                "top": (0.5 * ($($parent).outerHeight() - $($meta).outerHeight())).toString() + "px"
            });
            if (all)
                $($allmeta).css({
                    "top": (0.5 * ($($parent).outerHeight() - $($meta).outerHeight())).toString() + "px",
                    "left": "50%",
                    "margin-left": (-0.5 * $($meta).outerWidth()).toString() + "px"
                });
        }


        setMetaTopLeft(meta, true);

        $('.flexslider').flexslider({
            animationLoop: true,
            slideshow: true,
            controlNav: false,
            animation: "fade",
            slideshowSpeed: 7000,
            pauseOnAction: true,
            after: function (slider) {
                /* auto-restart player if paused after action */
                if (!slider.playing) {
                    slider.play();
                }

                setMetaTopLeft(meta, false);
            }
        });

        window.addEventListener("resize", function () {
            // Get screen size (inner/outerWidth, inner/outerHeight)
            setMetaTopLeft(meta, true);
            $('flex-direction-nav a').removeClass("small-screen-orient ");
            if (window.innerWidth < 1000)
                $('flex-direction-nav a').addClass("small-screen-orient ");
        }, false);


        //legacy seelake v3
        //email "non spammabile"
        var user1 = 'info';
        var domain1 = 'seelake';
        var domain2 = 'artmusicgroup';
        if ($('#mseelake'))
            $('#mseelake').html('<a href="' + 'mail' + 'to:' + user1 + '@' + domain1 + '.' + 'it' + '">' + user1 + '@' + domain1 + '.' + 'it' + '</a>');

        if ($('#martmusic'))
            $('#martmusic').html('<a href="' + 'mail' + 'to:' + user1 + '@' + domain2 + '.' + 'com' + '">' + user1 + '@' + domain2 + '.' + 'com' + '</a>');

        if ($('#contactfooter'))
            $('#contactfooter').attr("href", 'mail' + 'to:' + user1 + '@' + domain1 + '.' + 'it');
    })
})(jQuery)


