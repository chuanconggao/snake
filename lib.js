var direction;
// 0: left
// 1: up
// 2: right
// 3: down

var snake;
var size;

var food;
var poison;

var timer;

$(document).keydown(e => {
    if (!gameStarted) {
        return;
    }

    // only lateral turns are allowed
    // (that is, no u-turns)
    newDirection = e.keyCode - 37;
    if (newDirection != direction && newDirection != direction + 2 && newDirection != direction - 2) {
        direction = newDirection;
    }

    e.preventDefault();
});

function init() {
    createSnake();
    createItems();

    direction = 0;

    timer = setInterval(() => {
        if (moveSnake()) {
            draw();
        }
        else {
            clearInterval(timer);

            gameStarted = false;
            showConclusion(size - 1);
        }
    }, 100);
}

function createSnake() {
    var head = Array();
    head.x = width / 2;
    head.y = height / 2;

    snake = Array();
    snake.push(head);
    size = 1;
}

function createItem() {
    item = Array();
    item.x = Math.floor(Math.random() * width / dx) * dx;
    item.y = Math.floor(Math.random() * height / dy) * dy;

    return item;
}

function createItems() {
    food = createItem();

    do {
        poison = createItem();
    } while (food.x == poison.x && food.y == poison.y);
}

function isCollision(n) {
    // are we out of the playground?
    if (n.x < 0 || n.x > width - 1 || n.y < 0 || n.y > height - 1) {
        return true;
    }

    // are we eating ourselves?
    return snake.some(p => p.x == n.x && p.y == n.y);
}

function moveSnake() {
    head = snake[0]; // peek head

    // create new head relative to current head
    var n = Array();
    switch (direction) {
        case 0: // left
            n.x = head.x - dx;
            n.y = head.y;
            break;
        case 1: // up
            n.x = head.x;
            n.y = head.y - dy;
            break;
        case 2: // right
            n.x = head.x + dx;
            n.y = head.y;
            break;
        case 3: // down
            n.x = head.x;
            n.y = head.y + dy;
            break;
    }

    // if out of box or collision with ourselves, we die
    if (isCollision(n)) {
        return false;
    }

    // if there's poison there
    if (n.x == poison.x && n.y == poison.y) {
        return false;
    }

    snake.unshift(n);

    // if there's food there
    if (n.x == food.x && n.y == food.y) {
        size += 1;
        // we eat it and another shows up
        createItems();
    } else {
        // we only remove the tail if there wasn't food
        snake.pop();
    }

    return true;
}
