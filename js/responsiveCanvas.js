"use strict";

(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    let winW = window.innerWidth;
    let winH = window.innerHeight;

    // Lock ke landscape
    if (winH > winW) {
      alert("Silakan putar perangkatmu ke mode landscape untuk bermain");
    }

    // Supaya canvas selalu isi layar
    canvas.width = winW;
    canvas.height = winH;
  }

  // Jalankan pertama kali
  resizeCanvas();

  // Update jika layar berubah
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("orientationchange", resizeCanvas);

  // Expose ctx ke global biar bisa dipakai di file lain
  window.ctx = ctx;
})();
