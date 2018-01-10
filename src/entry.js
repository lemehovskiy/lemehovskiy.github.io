require("./sass/style.scss");

require ("jquery");

require ("gsap");

require("../../wp_nav/build/wp_nav.js");


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

})(jQuery);
