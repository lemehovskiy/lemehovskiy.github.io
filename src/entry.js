require("./sass/style.scss");

require("jquery");

require("gsap");

require("../../wp_nav/build/wp_nav.js");

require("../../lem_gmaps/build/lem_gmaps.js");

require("../../lem_youtube/build/lem_youtube.js");

require("../../videoBackground/build/videoBackground.js");

var Prism = require('prismjs');


(function ($) {

    $('.wp-navbar-collapse').wpNav({
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

    $('.play-btn').on('click', function(){
        $('.demo-item-3 .youtube-video').lemYoutube('ytPlayer', 'playVideo');
    })

    $('.pause-btn').on('click', function(){
        $('.demo-item-3 .youtube-video').lemYoutube('ytPlayer', 'pauseVideo');
    })



})(jQuery);
