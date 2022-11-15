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
        img: p5.Image;
        diameter: number;
        letter: string;
    }

    let stars: Star[];
    let img1, img2;

    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.preload = preload;
    p.setup = setup;
    p.draw = draw;


    function preload() {
        img1 = p.loadImage("assets/police.png");
        img2 = p.loadImage("assets/firetruck.png");
    }

    //called once at startup
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        stars = createAllStars();
    }


    //called every 1/60th of a second
    function draw() {
        p.background(30)
        p.image(img1, p.mouseX, p.mouseY)
        p.image(img2, p.mouseY, p.mouseX)
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
        p.translate(star.position.x, star.position.y)
        p.image(star.img, 0, 0)
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


        return {
            position: randomPosition(),
            velocity: randomVelocity(),
            diameter: p.random(5, 30),
            img: p.random([img1, img2]),
            letter: p.random("CREATIVE".split(""))
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