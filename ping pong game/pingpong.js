const canvas = document.getElementById("table");
const ctx = canvas.getContext("2d");

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 5,
    dy: 5,
    speed: 5,
    color: "green"
};

const redBase = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "red",
    speed: 10 
};

const bridge = {
    x: canvas.width / 2,
    y: 0,
    width: 2,
    height: canvas.height,
    color: "white",
    dashWidth: 10, 
    gapWidth: 5 
};

let userScore = 0;
let aiScore = 0;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(userScore, 50, 50);
    ctx.fillText(aiScore, canvas.width - 50, 50);
}

function drawBridge() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.setLineDash([bridge.dashWidth, bridge.gapWidth]);
    ctx.moveTo(bridge.x, bridge.y);
    ctx.lineTo(bridge.x, bridge.y + bridge.height);
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBridge();

    drawRect(redBase.x, redBase.y, redBase.width, redBase.height, redBase.color);

    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    drawScore();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < redBase.y + redBase.height / 2) {
        redBase.y -= redBase.speed;
    } else if (ball.y > redBase.y + redBase.height / 2) {
        redBase.y += redBase.speed;
    }

    if (ball.x + ball.radius >= redBase.x && 
        ball.y >= redBase.y && 
        ball.y <= redBase.y + redBase.height) {
        ball.dx = -ball.dx;
    }

    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy = -ball.dy;
    }

    if (ball.x - ball.radius <= 0) {
        aiScore++;
        reset();
    } else if (ball.x + ball.radius >= canvas.width) {
        userScore++;
        reset();
    }
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = Math.random() < 0.5 ? -ball.speed : ball.speed;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
