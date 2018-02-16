require("../../lem_counter/build/lem_counter.js");


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