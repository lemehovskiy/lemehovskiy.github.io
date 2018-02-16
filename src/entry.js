require("./sass/style.scss");

require("jquery");

require("gsap");

require("../../lem_nav/build/lem_nav.js");

require("../../lem_youtube/build/lem_youtube.js");

require("../../videoBackground/build/videoBackground.js");


var Prism = require('prismjs');
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
require('prismjs/themes/prism.css');


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




})(jQuery);
