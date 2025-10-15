// Background matrix animation
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0ff";
  ctx.font = fontSize + "px monospace";
  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    const x = i * fontSize;
    ctx.fillText(text, x, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 50);

// Music toggle
const audio = document.getElementById("bgAudio");
const toggle = document.getElementById("musicToggle");
let playing = false;
toggle.addEventListener("click", () => {
  playing = !playing;
  if (playing) {
    audio.play();
    toggle.textContent = "🔈";
  } else {
    audio.pause();
    toggle.textContent = "🔊";
  }
});

// TV 404 animation
const tvBtn = document.getElementById("tvBtn");
const tvOutput = document.getElementById("tvOutput");

tvBtn.addEventListener("click", () => {
  tvOutput.classList.remove("hidden");
  const dots = tvOutput.querySelector(".loading-dots");
  const text = tvOutput.querySelector(".coming-text");
  const gallery = tvOutput.querySelector(".gallery-grid");
  text.style.display = "none";
  gallery.style.display = "none";
  dots.style.display = "block";
  setTimeout(() => {
    dots.style.display = "none";
    text.style.display = "block";
    setTimeout(() => {
      text.style.display = "none";
      gallery.style.display = "flex";
    }, 2000);
  }, 2000);
});