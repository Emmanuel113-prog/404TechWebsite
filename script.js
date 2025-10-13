/* MATRIX RAIN ------------------------------------------------ */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initMatrix();
}
window.addEventListener("resize", resizeCanvas);

let fontSize = 14;
let columns = 0;
let drops = [];

function initMatrix(){
  fontSize = Math.max(12, Math.floor(window.innerWidth / 80));
  columns = Math.floor(window.innerWidth / fontSize);
  drops = new Array(columns).fill(1);
}
resizeCanvas();

const letters = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ0123456789@#$%^&*";
function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00ff9d";
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){
    const text = letters.charAt(Math.floor(Math.random()*letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }
    drops[i]++;
  }
}
let matrixInterval = setInterval(drawMatrix, 55);

/* MUSIC CONTROL ------------------------------------------------ */
const audio = document.getElementById("bgAudio");
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;

// Attempt autoplay (many browsers block autoplay with sound).
function tryAutoplay() {
  audio.volume = 0.7;
  audio.play().then(()=> {
    musicPlaying = true;
    setMusicIcon();
  }).catch(()=> {
    // autoplay blocked - stay paused until user interacts
    musicPlaying = false;
    setMusicIcon();
  });
}

// set button icon / tooltip
function setMusicIcon(){
  musicToggle.textContent = musicPlaying ? "⏸" : "🔊";
}

musicToggle.addEventListener("click", () => {
  if(!musicPlaying){
    audio.play().then(()=> {
      musicPlaying = true;
      setMusicIcon();
    }).catch(()=> {
      // still blocked
      musicPlaying = false;
      setMusicIcon();
      alert("Autoplay blocked — tap the button again to allow playback.");
    });
  } else {
    audio.pause();
    musicPlaying = false;
    setMusicIcon();
  }
});

// try autoplay once page loads
window.addEventListener("load", () => {
  // Small delay to let mobile browsers settle
  setTimeout(tryAutoplay, 400);
});

/* SMOOTH SCROLL (for nav anchors) */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

/* OPTIONAL: small interactive sparkle on gallery hover */
document.querySelectorAll('.gallery-item img').forEach(img=>{
  img.addEventListener('mouseenter', ()=>{ img.style.filter = 'contrast(1.05) saturate(1.05)'; });
  img.addEventListener('mouseleave', ()=>{ img.style.filter = 'none'; });
});