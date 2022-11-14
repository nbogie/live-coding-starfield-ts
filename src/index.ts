import p5 from "p5";

//p5 instance mode
const myP5 = new p5(createSketch);

function createSketch(p: p5) {

    interface Position {
        x: number;
        y: number;
    }

    interface Star {
        position: Position;
    }

    let stars: Star[];
    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;

    //called once at startup
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        stars = createStars();
    }


    //called every 1/60th of a second
    function draw() {
        //visualise all stars
        drawAllStars()

        //update (move) all stars
        updateAllStars()
        // p.circle(p.random(0, 500), 50, 50);
    }

    function drawAllStars() {
        for (const star of stars) {
            p.circle(star.position.x, star.position.y, 30);
        }
    }

    function updateAllStars() {

    }


    function createStars(): Star[] {
        const newStars: Star[] = [];
        console.log("p.width is ", p.width)
        for (let i = 0; i < 10; i++) {

            const position: Position = {
                x: p.random(0, p.width),
                y: p.random(0, p.height)
            }

            const star: Star = { position: position };
            console.log("star is: ", star)
            newStars.push(star);
        }



        return newStars;
    }
};
