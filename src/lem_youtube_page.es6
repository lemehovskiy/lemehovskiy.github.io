require("lem_youtube");

let yt_api_ready = require('yt_api_load');


//DEMO 1
yt_api_ready().then(
    function () {
      $('.demo-item-1 .youtube-video').lemYoutube();
    }
).catch(function (error) {
  console.log(error)
});



//DEMO 2
yt_api_ready().then(
    function () {
      $('.demo-item-2 .youtube-video').lemYoutube();
    }
).catch(function (error) {
  console.log(error)
});


$('.demo-item-2 .youtube-video').on('onReady.ly', function () {
  $(this).lemYoutube('ytPlayer', 'playVideo');
  $(this).lemYoutube('ytPlayer', 'mute');
});


//DEMO 3
yt_api_ready().then(
    function () {
      $(window).on('ytApiReady.ly', function () {
        $('.demo-item-3 .youtube-video').lemYoutube();
      });
    }
).catch(function (error) {
  console.log(error)
});

$('.play-btn').on('click', function () {
  $('.demo-item-3 .youtube-video').lemYoutube('ytPlayer', 'playVideo');
})

$('.pause-btn').on('click', function () {
  $('.demo-item-3 .youtube-video').lemYoutube('ytPlayer', 'pauseVideo');
})



yt_api_ready().then(
    function () {
      $('.youtube-video').lemYoutube({
        videoId: "yu_bA7jzX5Y",
        playerVars: {
          'rel': 1,
          'showinfo': 1,
          'autoplay': 1
        }
      });
    }
).catch(function (error) {
  console.log(error)
});