

import { Snake, DIRECTION } from "./snake_logic.js";
var KEYS = []
var ARROW_KEY = { up: 87, down: 83, right: 68, left: 65 };

var snake = new Snake(1000);
var offset = 0;


const canvas = document.getElementById("map");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");



var pixel = context.createImageData(1, 1);
pixel.data[0] = 0xff; pixel.data[1] = 0; pixel.data[2] = 0; pixel.data[3] = 0xff;

function draw() {
    console.log('clearing...');
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.body.length; i++) {
        console.log(snake.head.x);
        //console.log(pixel, snake.body[i].x + offset, snake.body[i].y + offset);
        context.putImageData(pixel, snake.head.x + offset, snake.head.y + offset);
        context.putImageData(pixel, snake.body[i].x + offset, snake.body[i].y + offset);
    }
}



function gameLoop() {
    console.log("tick");
    console.log(snake);
    snake.tick();   
    draw();
}

$(document).on("keydown", function (e) {
    console.log("keycode:" + e.which);
    console.log(String.fromCharCode(e.which));
    if(String.fromCharCode(e.which) == 'W')
    {
        snake.turnUp();
    } else if (String.fromCharCode(e.which) == 'S') {
        snake.turnDown();
    } else if (String.fromCharCode(e.which) == 'D') {
        snake.turnRight();
    } else if(String.fromCharCode(e.which) == 'A')
    {
        snake.turnLeft();
    }
});



setInterval(gameLoop, 100);
document.addEventListener("keydown", e => KEYS[e.keyCode] = true, false);