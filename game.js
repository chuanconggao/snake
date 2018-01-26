var gameStarted = false;

var canvas;
var ctx;
var width;
var height;

var dx = 30;
var dy = 30;

$(document).ready(function() {
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;

    // Start game on spacebar press.
    $(this).keydown(e => {
        if (!gameStarted && e.keyCode == 32) { // 32 = Spacebar
            gameStarted = true;

            ctx.font="30px Arial";
            init();
        }

        e.preventDefault();
    });

    $("#emojis").change(function() {
        emojis = $(this).val().split(' ');

        gameStarted = false;

        showIntro();
    });
    $("#emojis").trigger("change");
});

function clear() {
    ctx.fillStyle = "#000000";
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
}

var emojis;

function draw() {
    clear();

    snake.forEach(p => ctx.fillText(emojis[0], p.x + dx / 2, p.y + dy));
    ctx.fillText(emojis[1], food.x + dx / 2, food.y + dy);
    ctx.fillText(emojis[2], poison.x + dx / 2, poison.y + dy);
}

function showIntro() {
    clear();

    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(emojis[1] + ' ' + emojis[0].repeat(5) + ' ' + emojis[2], canvas.width / 2, canvas.height / 2);

    ctx.font = "30px Arial";
    ctx.fillText("press space to start", canvas.width / 2, canvas.height / 2 + 60);
}

function showConclusion(score) {
    clear();

    ctx.font="40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("score: " + score, width / 2, height / 2 - 60);
    ctx.fillText("GAME OVER", width / 2, height / 2);

    ctx.font="30px Arial";
    ctx.fillText("press space to start", width / 2, height / 2 + 120);
}
