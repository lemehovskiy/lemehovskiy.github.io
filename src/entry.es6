require("./fonts/fontello/css/fontello.css");

require("./sass/style.scss");

require("jquery");

require("gsap");

require("../../lem_nav/build/lem_nav.js");

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




})(jQuery);
