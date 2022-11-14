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
        p.background(30)
        drawAllStars()
        updateAllStars()
    }

    function drawAllStars() {
        for (const star of stars) {
            drawOneStar(star);
        }
    }

    function drawOneStar(star: Star) {


        const pos = star.position;
        p.stroke(255);
        const lineLength = star.velocity.x * 10 * calculateMouseSpeedMultiplier();
        p.line(pos.x, pos.y, pos.x - lineLength, pos.y);

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

    function calculateMouseSpeedMultiplier(): number {
        return p.map(p.mouseY, 0, p.height, 0.1, 3, true)
    }
    function updateOneStar(s: Star): void {

        s.position.x += calculateMouseSpeedMultiplier() * s.velocity.x;
        s.position.y += s.velocity.y;


        //wrap if out of bounds
        if (s.position.x > p.width + 50) {

            //wrap
            s.position.x = -50;
            // consider:  s.position.y = p.random(0, p.height);
        }
    }


    function randomVelocity(): Velocity {
        return { x: p.random(0.3, 3), y: 0 }
    }

    function randomPosition(): Position {
        return {
            x: p.random(-50, p.width + 50),
            y: p.random(0, p.height)
        }
    }
};