"use strict";

// --- GLOBAL VARS ---
let canvas, ctx;
let gameState = "home"; // "home" | "game" | "end"
let currentWave = 0;
let maxWaves = 5;
let playerHealth = 20;
let gameResult = null; // "win" | "lose"

// Towers & Enemies
let towers = [];
let enemies = [];
let projectiles = [];
let coins = 100;

// Load Assets
const img = {};
const sfx = {};

window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // UI Button events
    document.getElementById("btnStart").addEventListener("click", startGame);
    document.getElementById("btnRestart").addEventListener("click", () => {
        resetGame();
        gameState = "home";
    });

    gameLoop();
};

// --- RESPONSIVE LANDSCAPE ---
function resizeCanvas() {
    if (window.innerWidth > window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        // force landscape
        canvas.width = window.innerHeight;
        canvas.height = window.innerWidth;
    }
}

// --- GAME FLOW ---
function startGame() {
    resetGame();
    gameState = "game";
    loadLevel2();
}

function resetGame() {
    towers = [];
    enemies = [];
    projectiles = [];
    coins = 100;
    playerHealth = 20;
    currentWave = 0;
    gameResult = null;
}

// --- LEVEL LOADER ---
function loadLevel2() {
    // pakai data dari data.level2.js
    if (!window.levels || !window.levels[1]) {
        console.error("Level 2 data not found!");
        return;
    }
    const levelData = window.levels[1];
    window.levelParam = 2;

    // trigger wave start
    spawnWave();
}

function spawnWave() {
    if (currentWave >= maxWaves) {
        endGame("win");
        return;
    }
    currentWave++;

    // contoh spawn enemy sederhana (virus)
    for (let i = 0; i < 5 + currentWave * 2; i++) {
        setTimeout(() => {
            enemies.push(new Enemy({
                position: { x: window.levels[1].waypoints[0].x, y: window.levels[1].waypoints[0].y },
                type: "common",
                waypoints: window.levels[1].waypoints
            }));
        }, i * 1000);
    }

    // auto next wave setelah 15 detik
    setTimeout(() => {
        spawnWave();
    }, 15000);
}

// --- GAME END ---
function endGame(result) {
    gameState = "end";
    gameResult = result;
}

// --- MAIN LOOP ---
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "home") {
        drawHome();
    } else if (gameState === "game") {
        updateGame();
        drawGame();
    } else if (gameState === "end") {
        drawEnd();
    }

    requestAnimationFrame(gameLoop);
}

// --- DRAW FUNCTIONS ---
function drawHome() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = "bold 60px Arial";
    ctx.fillText("Tower Defense Circuit", canvas.width / 2 - 300, canvas.height / 2 - 50);

    document.getElementById("uiHome").style.display = "block";
    document.getElementById("uiEnd").style.display = "none";
}

function drawGame() {
    document.getElementById("uiHome").style.display = "none";
    document.getElementById("uiEnd").style.display = "none";

    // render towers
    towers.forEach(t => t.update());
    // render enemies
    enemies.forEach(e => e.update());
    // render projectiles
    projectiles.forEach(p => p.update());

    // HUD
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText("Wave: " + currentWave + "/" + maxWaves, 20, 40);
    ctx.fillText("HP: " + playerHealth, 20, 70);
    ctx.fillText("Coins: " + coins, 20, 100);

    // check lose condition
    if (playerHealth <= 0) {
        endGame("lose");
    }
}

function drawEnd() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = gameResult === "win" ? "#0f0" : "#f00";
    ctx.font = "bold 70px Arial";
    ctx.fillText(gameResult === "win" ? "YOU WIN!" : "YOU LOSE!", canvas.width / 2 - 200, canvas.height / 2 - 50);

    document.getElementById("uiEnd").style.display = "block";
    document.getElementById("uiHome").style.display = "none";
}
