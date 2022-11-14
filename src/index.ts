import p5 from "p5";

//p5 instance mode
const myP5 = new p5(createSketch);

function createSketch(p: p5) {

    interface Position {
        x: number;
        y: number;
    }

    interface Velocity {
        x: number;
        y: number;
    }

    interface Star {
        position: Position;
        velocity: Velocity;
        colour: string;
        diameter: number;
    }

    let stars: Star[];
    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;

    //called once at startup
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        stars = createAllStars();
    }


    //called every 1/60th of a second
    function draw() {
        p.background('white')
        drawAllStars()
        updateAllStars()
    }

    function drawAllStars() {
        for (const star of stars) {
            drawOneStar(star);
        }
    }

    function drawOneStar(star: Star) {
        p.push()
        p.fill(star.colour);
        p.noStroke();
        p.circle(star.position.x, star.position.y, star.diameter);
        p.pop()
    }



    function createAllStars(): Star[] {
        const newStars: Star[] = [];
        for (let i = 0; i < 1000; i++) {

            const star: Star = createOneStar()
            newStars.push(star);
        }

        return newStars;
    }

    function createOneStar(): Star {

        const palette: string[] = [
            "#a70267",
            "#f10c49",
            "#fb6b41",
            "#f6d86b",
            "#339194"
        ]

        return {
            position: randomPosition(),
            velocity: randomVelocity(),
            colour: p.random(palette),
            diameter: p.random(5, 30)
        };
    }

    function updateAllStars() {
        for (const star of stars) {
            updateOneStar(star);
        }
    }

    function updateOneStar(s: Star): void {

        const speedMultiplier = p.map(p.mouseY, 0, p.height, 0.1, 3, true)
        s.position.x += speedMultiplier * s.velocity.x;
        s.position.y += s.velocity.y;


        //wrap if out of bounds
        if (s.position.x > p.width + 50) {

            //wrap
            s.position.x = -50;
            // consider:  s.position.y = p.random(0, p.height);
        }
    }


    function randomVelocity(): Velocity {
        return { x: p.random(1, 3), y: 0 }
    }

    function randomPosition(): Position {
        return {
            x: p.random(0, p.width),
            y: p.random(0, p.height)
        }
    }
};