var gameStarted = false;

var canvas;
var ctx;
var width;
var height;

var dx = 20;
var dy = 20;

$(document).ready(function() {
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;

    showIntro();

    // Start game on spacebar press.
    $(this).keydown(e => {
        if (!gameStarted && e.keyCode == 32) { // 32 = Spacebar
            gameStarted = true;

            ctx.font="20px Arial";
            init();
        }

        e.preventDefault();
    });
});

function clear() {
    ctx.fillStyle = "#000000";
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
}

function draw() {
    clear();

    snake.forEach(p => ctx.fillText('⛹️', p.x + dx / 2, p.y + dy));
    ctx.fillText('🏀', food.x + dx / 2, food.y + dy);
    ctx.fillText('🚧', poison.x + dx / 2, poison.y + dy);
}

function showIntro() {
    clear();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("🏀 ⛹️⛹️⛹️⛹️⛹️", canvas.width / 2, canvas.height / 2);

    ctx.font = "20px Arial";
    ctx.fillText("press space to start", canvas.width / 2, canvas.height / 2 + 40);
}

function showConclusion(score) {
    clear();

    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("score: " + score, width / 2, height / 2 - 40);
    ctx.fillText("GAME OVER", width / 2, height / 2);

    ctx.font="20px Arial";
    ctx.fillText("press space to start", width / 2, height / 2 + 80);
}
