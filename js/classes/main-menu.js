// js/main-menu.js
"use strict";

// Musik & SFX
let mainMusic = new Audio("bgm/main-menu.mp3");
mainMusic.loop = true;
mainMusic.volume = 0.3;

let buttonSound = new Audio("sfx/button-click.mp3");

// State screen
function showScreen(screenId) {
  $(".screen").addClass("hidden").removeClass("active");
  $(screenId).removeClass("hidden").addClass("active");
}

// Lock landscape
function checkOrientation() {
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  if (winW < winH) {
    alert("Please rotate to landscape mode");
  }
}

$(function () {
  // Cek orientasi tiap 500ms
  setInterval(checkOrientation, 500);

  // Loader
  setTimeout(() => {
    $(".loaderContainer").fadeOut(500);
  }, 1500);

  // --- Home Screen ---
  $("#start-game").click(() => {
    buttonSound.play();
    showScreen("#game-screen");
    // Reset counter saat mulai
    $("#waveCounter").text("Wave: 0/5");
    $("#coinCounter").text("Coins: 0");
  });

  $("#info-button").click(() => {
    $(".info-container").removeClass("hidden");
    return false;
  });

  $(".info-close").click(() => {
    $(".info-container").addClass("hidden");
  });

  $("#feedback-button").click(() => {
    $(".feedback-container").removeClass("hidden");
    return false;
  });

  $(".feedback-close").click(() => {
    $(".feedback-container").addClass("hidden");
  });

  $(".feedback-submit").click(() => {
    const feedback = $(".feedback-input").val();
    if (feedback.trim() !== "") {
      alert("Terima kasih atas feedback-mu!");
      $(".feedback-input").val("");
      $(".feedback-container").addClass("hidden");
    } else {
      alert("Silakan tulis feedback sebelum mengirim.");
    }
  });

  // --- Music Toggle ---
  let playingMusic = false;
  $("#musicButton").click(() => {
    mainMusic.play();
    playingMusic = true;
    $("#musicButton").hide();
    $("#musicPause").show();
  });

  $("#musicPause").click(() => {
    mainMusic.pause();
    playingMusic = false;
    $("#musicPause").hide();
    $("#musicButton").show();
  });

  // --- Game Screen ---
  $("#quit-button").click(() => {
    buttonSound.play();
    showScreen("#end-screen");
    $("#end-message").text("Game Over");
  });

  // --- End Screen ---
  $("#retry-button").click(() => {
    buttonSound.play();
    showScreen("#game-screen");
    $("#waveCounter").text("Wave: 0/5");
    $("#coinCounter").text("Coins: 0");
  });

  $("#home-button").click(() => {
    buttonSound.play();
    showScreen("#home-screen");
  });

  // Efek klik untuk semua tombol
  $("button").click(() => {
    buttonSound.play();
  });
});
