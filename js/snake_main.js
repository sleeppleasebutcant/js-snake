

import { Snake, DIRECTION } from "./snake_logic.js";
var KEYS = []
var ARROW_KEY = { up: 87, down: 83, right: 68, left: 65 };

var snake = new Snake(30);
var offset = 0;


const canvas = document.getElementById("map");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");



var pixel = context.createI
mageData(1, 1);
pixel.data[0] = 0xff; pixel.data[1] = 0; pixel.data[2] = 0; pixel.data[3] = 0xff;

function draw() {
    console.log('clearing...');
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.body.length; i++) {
        console.log(snake.head);
        console.log(pixel, snake.body[i].x + offset, snake.body[i].y + offset);
        context.putImageData(pixel, snake.head.x + offset, snake.head.y + offset);
        context.putImageData(pixel, snake.body[i].x + offset, snake.body[i].y + offset);
    }
}

function handleUserInput() {
    if (KEYS[ARROW_KEY.up]) {
        snake.turnUp();
        KEYS[ARROW_KEY.up]=false;

    } else if (KEYS[ARROW_KEY.down]) {
        snake.turnDown();
        KEYS[ARROW_KEY.down]=false;

    }
    else if (KEYS[ARROW_KEY.right]) {
        snake.turnRight();
        KEYS[ARROW_KEY.right]=false;

    }
    else if (KEYS[ARROW_KEY.left]) {
        snake.turnLeft();
        KEYS[ARROW_KEY.left]=false;

    }

}


function gameLoop() {
    handleUserInput();
    draw();
    snake.tick();
}

setInterval(gameLoop, 100);
document.addEventListener("keydown", e => KEYS[e.keyCode] = true, false);