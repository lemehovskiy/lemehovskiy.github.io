require("./sass/style.scss");

require("jquery");

require("gsap");

require("../../lem_nav/build/lem_nav.js");

require("../../lem_gmaps/build/lem_gmaps.js");

require("../../lem_youtube/build/lem_youtube.js");

require("../../videoBackground/build/videoBackground.js");

require("../../lem_counter/build/lem_counter.js");


(function ($) {

    $('.wp-navbar-collapse').lemNav({
        collapse_duration: 0.6,
        trigger: 'hover',
        navbar_toggle: '.wp-navbar-toggle',
        on_dropdown_shown: function () {
            TweenLite.to('.dropdown-caption', 0.5, {autoAlpha: 1})
        },
        on_dropdown_hide: function () {
            TweenLite.to('.dropdown-caption', 0.2, {autoAlpha: 0})
        }
    });


    //INTRO BACKGROUND VIDEO
    $(window).on('ytApiReady.ly', function () {
        $('.section-intro .youtube-video').lemYoutube();
        $('.background-video').videoBackground();
    });

    $('.section-intro .youtube-video').on('onReady.ly', function () {
        $(this).lemYoutube('ytPlayer', 'playVideo');
        $(this).lemYoutube('ytPlayer', 'mute');
    });


    $('.section-intro .youtube-video').on('onStateChange.ly', function (event, data) {
        if (data == 0) {
            $(this).lemYoutube('ytPlayer', 'playVideo');
        }
    });


    //DEMO 1
    $(window).on('ytApiReady.ly', function () {
        $('.demo-item-1 .youtube-video').lemYoutube();
    });


    //DEMO 2
    $(window).on('ytApiReady.ly', function () {
        $('.demo-item-2 .youtube-video').lemYoutube();
    });

    $('.demo-item-2 .youtube-video').on('onReady.ly', function () {
        $(this).lemYoutube('ytPlayer', 'playVideo');
        $(this).lemYoutube('ytPlayer', 'mute');
    });


    //DEMO 3
    $(window).on('ytApiReady.ly', function () {
        $('.demo-item-3 .youtube-video').lemYoutube();
    });

    $('.play-btn').on('click', function () {
        $('.demo-item-3 .youtube-video').lemYoutube('ytPlayer', 'playVideo');
    })

    $('.pause-btn').on('click', function () {
        $('.demo-item-3 .youtube-video').lemYoutube('ytPlayer', 'pauseVideo');
    })


    $(window).on('apiReady.ly', function () {
        $('.youtube-video').lemYoutube({
            videoId: "yu_bA7jzX5Y",
            playerVars: {
                'rel': 1,
                'showinfo': 1,
                'autoplay': 1
            }
        });
    });


    //COUNTER DEMO 1
    $('.counter-demo-1').lemCounter({
        value_to: 100
    });

    //COUNTER DEMO 2
    $('.counter-demo-2').lemCounter({
        value_to: 100,
        value_from: 200
    });

    //COUNTER DEMO 3
    $('.counter-demo-3').lemCounter({
        value_to_from_content: true
    });

    //COUNTER DEMO 4
    $('.counter-demo-4').lemCounter();


    //COUNTER EVENT DEMO 1
    $('.counter-event-demo-1').lemCounter({
        value_to: 100
    });

    $('.counter-event-demo-1').on('onComplete.lc', function () {
        $(this).css('color', 'red');
    });




})(jQuery);
