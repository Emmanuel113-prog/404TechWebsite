/* === Canvas Matrix + Neon Orbs === */
const matrix = document.getElementById('matrix');
const orbs = document.getElementById('neonOrbs');
const dpr = Math.max(1, window.devicePixelRatio || 1);
[ matrix, orbs ].forEach(c => {
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  c.style.width = innerWidth + 'px';
  c.style.height = innerHeight + 'px';
  c.getContext('2d').scale(dpr, dpr);
});

const mCtx = matrix.getContext('2d');
const oCtx = orbs.getContext('2d');

/* Matrix rain */
const cols = Math.floor(innerWidth / 14);
const drops = Array(cols).fill(0);
const chars = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ¥$%&*';
function drawMatrix(){
  mCtx.fillStyle = 'rgba(0,0,0,0.12)';
  mCtx.fillRect(0,0,innerWidth,innerHeight);
  mCtx.font = '14px monospace';
  for(let i=0;i<cols;i++){
    const text = chars.charAt(Math.floor(Math.random()*chars.length));
    mCtx.fillStyle = 'rgba(0,255,200,0.12)';
    mCtx.fillText(text, i*14, drops[i]*14);
    if(drops[i]*14 > innerHeight && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
}

/* Neon orbs floating */
const orbCount = Math.max(6, Math.floor(innerWidth/220));
const orbsArr = [];
for(let i=0;i<orbCount;i++){
  orbsArr.push({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: 30 + Math.random()*70,
    vx: (Math.random()-0.5)*0.3,
    vy: (Math.random()-0.5)*0.3,
    hue: 160 + Math.random()*200
  });
}
function drawOrbs(){
  oCtx.clearRect(0,0,innerWidth,innerHeight);
  orbsArr.forEach(o=>{
    o.x += o.vx; o.y += o.vy;
    if(o.x< -200) o.x = innerWidth + 200;
    if(o.x>innerWidth + 200) o.x = -200;
    if(o.y< -200) o.y = innerHeight + 200;
    if(o.y>innerHeight + 200) o.y = -200;
    const grad = oCtx.createRadialGradient(o.x, o.y, o.r*0.1, o.x, o.y, o.r);
    grad.addColorStop(0, `hsla(${o.hue},90%,60%,0.28)`);
    grad.addColorStop(0.4, `hsla(${o.hue+40},80%,50%,0.10)`);
    grad.addColorStop(1, `rgba(0,0,0,0)`);
    oCtx.fillStyle = grad;
    oCtx.beginPath();
    oCtx.arc(o.x, o.y, o.r, 0, Math.PI*2);
    oCtx.fill();
  });
}

/* loop */
function loop(){
  drawMatrix();
  drawOrbs();
  requestAnimationFrame(loop);
}
loop();

/* handle resize */
window.addEventListener('resize', ()=>{
  [ matrix, orbs ].forEach(c=>{
    c.width = innerWidth * dpr;
    c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    c.getContext('2d').scale(dpr, dpr);
  });
});

/* === Music toggle & auto-play attempt === */
const audio = document.getElementById('bgAudio');
const musicToggle = document.getElementById('musicToggle');
let musicOn = false;

function setMusicUI(){
  musicToggle.textContent = musicOn ? '🔊' : '🔈';
  musicToggle.style.filter = musicOn ? 'drop-shadow(0 6px 14px rgba(56,189,248,0.35))' : 'none';
}

musicToggle.addEventListener('click', async ()=>{
  if(!musicOn){
    try {
      await audio.play();
      musicOn = true;
    } catch(e){
      // if autoplay blocked, unmute only when first user interaction
      musicOn = false;
      alert('Autoplay blocked — press play on the music control to start audio.');
    }
  } else {
    audio.pause();
    musicOn = false;
  }
  setMusicUI();
});

// try an initial autoplay (will usually be blocked until user gesture)
audio.volume = 0.7;
audio.muted = false;
audio.play().then(()=>{ musicOn = true; setMusicUI(); }).catch(()=>{ musicOn = false; setMusicUI(); });

/* === TV 404 logic === */
const tvBtn = document.getElementById("tvBtn");
const tvOutput = document.getElementById("tvOutput");
const tvFrameContainer = document.getElementById("tvFrameContainer");
const tvFrame = document.getElementById("tvFrame");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const closeTv = document.getElementById("closeTv");

tvBtn.addEventListener("click", () => {
  tvOutput.classList.remove("hidden");
  document.querySelector(".loading-dots").style.display = "flex";
  document.querySelector(".coming-text").style.display = "block";
  tvFrameContainer.classList.add("hidden");

  setTimeout(() => {
    document.querySelector(".loading-dots").style.display = "none";
    document.querySelector(".coming-text").style.display = "none";
    tvFrameContainer.classList.remove("hidden");
    // keep the site embedded (not open new tab)
    tvFrame.src = "https://kenyalivetv.co.ke";
  }, 4000);
});

document.getElementById('tv404open')?.addEventListener('click', ()=> tvBtn.click());
closeTv?.addEventListener('click', ()=>{
  tvOutput.classList.add('hidden');
  tvFrame.src = '';
});

fullscreenBtn.addEventListener("click", () => {
  if (tvFrame.requestFullscreen) tvFrame.requestFullscreen();
});

/* small accessibility: keyboard close */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ tvOutput.classList.add('hidden'); tvFrame.src = ''; }
});

/* === small UX: make links open safely on mobile === */
document.querySelectorAll('a[target="_blank"]').forEach(a=>{
  a.rel = a.rel.split(' ').concat(['noopener','noreferrer']).join(' ');
});