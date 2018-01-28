require("./sass/style.scss");
require("./sass/pages/canvas-confetti.scss");


require("jquery");

import Matter from 'matter-js';



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



var particles = [];
var updateParticles = function () {
    var particleOptions = {
        // count: render.canvas.width*0.05,
        count: 150,
        size: {min: render.canvas.width * 0.003, max: render.canvas.width * 0.012},
        restitution: 2,
        // frictionAir: ,
        color: '#ff357a'
    };

    for (var i = 0; i < particleOptions.count; i++) {
        var x = Matter.Common.random(15, render.canvas.width);
        var y = Matter.Common.random(-render.canvas.height, render.canvas.height / 3);
        var size = Matter.Common.random(particleOptions.size.min, particleOptions.size.max);
        var p = Bodies.circle(x, y, size, {
            restitution: particleOptions.restitution,
            render: {
                fillStyle: '#' + Math.floor(Common.random(0, 16777215)).toString(16)
            },
            frictionAir: Common.random(0.1, 0.1)
        });
        // Matter.Body.setVelocity(p, { x: 0, y: Matter.Common.random(1, 10) });
        particles.push(p);
    }
};


var letters = [];
var updateLetters = function () {


    $('.test-text .word').each(function(){
        let $this = $(this);

        let width = $this.outerWidth();
        let height = $this.outerHeight();


        let left = $this.position().left;
        let top = $this.position().top;


        console.log(top);


        var letter = Bodies.rectangle(left + width / 2, top + height / 2, width, height, {
            friction: 0,
            isStatic: true,
            render: {
                fillStyle: "#FFFF00",
                visible: false
            }
        });

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

Matter.Events.on(render, "afterRender", function (e) {
    particles.forEach(function (p) {
        if (p.position.y > render.canvas.height || p.position.x < 0 || p.position.x > render.canvas.width) {
            // Matter.Body.setVelocity(p, { x: 0, y: Matter.Common.random(1, 30) });
            var x = Matter.Common.random(15, render.canvas.width);
            var y = Matter.Common.random(-render.canvas.height, 0);
            Matter.Body.setPosition(p, {x: x, y: y});
        }
    });
});
