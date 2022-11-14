import p5 from "p5";


const myP5 = new p5(createSketch);

function createSketch(p: p5) {


    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;

    //called once at startup
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
    }


    //called every 1/60th of a second
    function draw() {
        p.circle(300, 50, 50);
    }

};
