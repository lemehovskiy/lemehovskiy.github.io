require("../../lem_youtube/build/lem_youtube.js");


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