require("./sass/style.scss");
require("./sass/pages/canvas-confetti.scss");


require("jquery");

import Matter from 'matter-js';

// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Common = Matter.Common,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    SVG = Matter.Svg;


// create an engine
var engine = Engine.create();
engine.world.gravity.scale = 0.0009;
var world = engine.world;

var canvasContainer = document.getElementById('demo-popup');

// create a renderer
var render = Render.create({
    element: canvasContainer,
    engine: engine,
    options: {
        width: canvasContainer.clientWidth,
        height: canvasContainer.clientHeight,
        wireframes: false,
        background: ''
    }
});

// engine.world.gravity.x = -.2;

var colors = [
    'B99E62', 'ECECDB', 'E3A43B'
]

var particles = [];
var updateParticles = function () {
    var particleOptions = {
        // count: render.canvas.width*0.05,
        count: 150,
        size_width: {min: 3, max: 10},
        size_height: {min: 10, max: 20},
        restitution: 0.3,
        color: '#ff357a'
    };

    for (var i = 0; i < particleOptions.count; i++) {
        var x = Matter.Common.random(15, render.canvas.width);
        var y = Matter.Common.random(-render.canvas.height, render.canvas.height / 3);
        var size_width = Matter.Common.random(particleOptions.size_width.min, particleOptions.size_width.max);
        var size_height = Matter.Common.random(particleOptions.size_height.min, particleOptions.size_height.max);
        var p = Bodies.rectangle(x, y, size_width, size_height, {
            restitution: particleOptions.restitution,
            inertia: 0,
            friction: 0,
            render: {
                fillStyle: '#' + colors[Math.floor(Math.random() * colors.length)]
            },
            frictionAir: Common.random(0.1, 0.1)
        });
        // Matter.Body.setVelocity(p, { x: 0, y: Matter.Common.random(1, 10) });
        particles.push(p);
    }
};


var letters = [];
var updateLetters = function () {


    $('.area-1, .area-2').each(function () {
        let $this = $(this);

        let wrap_left = $('.interactive-text .inner-wrap').position().left;
        let wrap_top = $('.interactive-text').position().top;

        console.log(wrap_top);

        let width = $this.outerWidth();
        let height = $this.outerHeight();


        let left = $this.position().left + wrap_left;
        let top = $this.position().top + wrap_top;


        // console.log(top);
        // console.log($this.position().left);


        var letter = Bodies.rectangle(left + width / 2, top + height / 2, width, height, {
            friction: 0,
            isStatic: true,
            label: "Area",
            render: {
                fillStyle: "#FFFF00",
                visible: false
            }
        });

        Body.rotate(letter, Math.radians(-7));

        letters.push(letter);

    })

};


var addToWorld = function () {
    if (!canvasContainer.clientWidth || !canvasContainer.clientHeight) return;

    // add all of the bodies to the world
    particles.length = 0;
    letters.length = 0;

    updateParticles();
    World.add(world, particles);

    updateLetters();
    World.add(world, letters);

    // updateMouse();
};
addToWorld();

var clearWorld = function () {
    World.clear(world);
};

var reset = function () {
    clearWorld();
    addToWorld();
};

window.addEventListener('resize', function () {
    render.options.width = render.canvas.width = canvasContainer.clientWidth,
        render.options.height = render.canvas.height = canvasContainer.clientHeight;

    reset();
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);


var rotate_clockwise = true;

Matter.Events.on(render, "afterRender", function (e) {
    particles.forEach(function (p) {

        if (rotate_clockwise) {
            Matter.Body.rotate(p, Math.radians(Matter.Common.random(1, 4)));

            rotate_clockwise = false;
        }
        else {
            Matter.Body.rotate(p, Math.radians(Matter.Common.random(-1, -4)));

            rotate_clockwise = true;
        }

        if (p.position.y > render.canvas.height || p.position.x < 0 || p.position.x > render.canvas.width) {
            // Matter.Body.setVelocity(p, { x: 0, y: Matter.Common.random(1, 30) });
            var x = Matter.Common.random(15, render.canvas.width);
            var y = Matter.Common.random(-render.canvas.height, 0);
            Matter.Body.setPosition(p, {x: x, y: y});
        }
    });
});

Matter.Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;


    // console.log(pairs);

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        // console.log(pair);


        if (pair.bodyA.label == 'Area') {

            var x = Matter.Common.random(15, render.canvas.width);
            var y = Matter.Common.random(-render.canvas.height, 0);
            Matter.Body.setPosition(p, {x: x, y: y});

            pair.bodyB.render.strokeStyle = '#C44D58';
        }
        else if (pair.bodyB.label == 'Area') {


            setTimeout(function () {
                var x = Matter.Common.random(15, render.canvas.width);
                var y = Matter.Common.random(-render.canvas.height, 0);

                Matter.Body.setPosition(pair.bodyA, {x: x, y: y});
            }, 100);

        }

    }
});
