const canvas = document.getElementById("map");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");
const scaleX = 10;
const scaleY = 10;
var gameSpeed = 150; //lower the faster
var foodFrequency = 0.02; // higher the higher



var KEYS = []
var ARROW_KEY = { up: 87, down: 83, right: 68, left: 65 };

var FoodCollection = [];

var snake = new Snake(10, canvas.width / scaleX, canvas.height / scaleY, 0, 0);
var snakeFillStyle;
var offset = 0;

var pixel = context.createImageData(1, 1);
pixel.data[0] = 0;
pixel.data[1] = 0;
pixel.data[2] = 0;
pixel.data[3] = 0xff;


function clearCanvas() {
    context.beginPath();
    var old = context.fillStyle;
    context.fillStyle = "palegreen";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = old;
}

function draw() {
    console.log('clearing...');
    console.log("w,h: ", canvas.width, canvas.height);

    clearCanvas();

    context.fillStyle = snakeFillStyle;
    context.rect(snake.head.x + offset, snake.head.y + offset, 1, 1);

    for (let i = 0; i < snake.body.length; i++) {
        console.log(snake.head.x);
        //console.log(pixel, snake.body[i].x + offset, snake.body[i].y + offset);
        context.rect(snake.body[i].x + offset, snake.body[i].y + offset, 1, 1);
    }
    context.fill();
    context.beginPath();

    context.fillStyle = "black";
    for (let i = 0; i < FoodCollection.length; i++) {
        context.rect(FoodCollection[i].x, FoodCollection[i].y, 1, 1);
    }

    context.fill();

}






var previousLen = 10;
var gameOver = false;

function gameLoop() {
    console.log("tick");
    console.log(snake);

    if (Math.random() < foodFrequency) {
        FoodCollection.push({
            x: Math.round(Math.round(Math.random() * 1000 % canvas.width) / scaleX),
            y: Math.round(Math.round(Math.random() * 1000 % canvas.height) / scaleY)
        });
    }
    if (snake.tick() == false || gameOver == true) {
        console.log("game over");
        gameOver = true;
        context.font = "10px Comic Sans MS";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("GAME OVER", 50, 50);

        return;
    }


    if (FoodCollection.some((f) => doCoexist(f, snake.head))) {
        snake.grow();
        FoodCollection.splice(FoodCollection.findIndex(f => doCoexist(f, snake.head)), 1);
    }
    if (snake.body.length % 10 == 0 && snake.body.length != previousLen) {
        setSnakeLook();
        previousLen = snake.body.length;
    }
    document.getElementById("len-bdg").innerHTML = snake.body.length;

    draw();


    gameSpeed = KEYS[32] ? 40 : 150; // if space then game speeds up
    setTimeout(gameLoop, gameSpeed);
}




$(document).on("keydown", function(e) {
    console.log("keycode:" + e.which);
    console.log(String.fromCharCode(e.which));
    if (String.fromCharCode(e.which) == 'W') {
        snake.turnUp();
    } else if (String.fromCharCode(e.which) == 'S') {
        snake.turnDown();
    } else if (String.fromCharCode(e.which) == 'D') {
        snake.turnRight();
    } else if (String.fromCharCode(e.which) == 'A') {
        snake.turnLeft();
    }
});


function setSnakeLook() {
    //gradient - rainbow
    snakeFillStyle = context.createRadialGradient(50, 20, 1, 90, 60, 100);
    snakeFillStyle.addColorStop(0, randomColor());
    for (let i in range(100)) {
        snakeFillStyle.addColorStop(0.01 * i, randomColor());
    }
    snakeFillStyle.addColorStop(1, randomColor());

    // shadow
    context.shadowColor = 'grey';
    context.shadowOffsetX = 7;
    context.shadowOffsetY = 5;
    context.shadowBlur = 9;


}



setSnakeLook();
context.scale(scaleX, scaleY);

setTimeout(gameLoop, gameSpeed);
document.addEventListener("keydown", e => KEYS[e.keyCode] = true, false);
document.addEventListener("keyup", e => KEYS[e.keyCode] = false, false);