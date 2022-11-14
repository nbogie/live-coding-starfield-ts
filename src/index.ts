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
        speed: number;
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
        p.background('white')
        drawAllStars()
        updateAllStars()
    }

    function drawAllStars() {
        for (const star of stars) {
            p.circle(star.position.x, star.position.y, 10);
        }
    }

    function updateAllStars() {
        for (const star of stars) {
            updateOneStar(star);
        }
    }

    function updateOneStar(s: Star): void {
        s.position.x += s.speed;
    }

    function createStars(): Star[] {
        const newStars: Star[] = [];
        for (let i = 0; i < 100; i++) {

            const star: Star = createOneStar()
            newStars.push(star);
        }



        return newStars;
    }

    function createOneStar(): Star {
        return {
            position: randomPosition(),
            speed: p.random(1, 3)
        };
    }

    function randomPosition(): Position {
        return {
            x: p.random(0, p.width),
            y: p.random(0, p.height)
        }
    }
};
