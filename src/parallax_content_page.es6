require("parallax_content");


$(document).ready(function () {

  $('.parallax-content-demo-1 .title').parallaxContent({
    shift: 20
  });

  $('.parallax-content-demo-1').parallaxContent({
    shift: -20,
    duration: 3
  });


  $('.parallax-content-demo-2 .title').parallaxContent();
  $('.parallax-content-demo-2 .desc').parallaxContent();


});