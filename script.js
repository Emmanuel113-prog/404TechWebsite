// Enhanced Matrix Animation
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = "01010101010101010101010101010101010101010101010101";
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#0ff";
    ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
    
    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#0ff";
        
        ctx.fillText(text, x, y * fontSize);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

// Smoother animation
let matrixInterval = setInterval(drawMatrix, 33);

// Enhanced Music Toggle
const audio = document.getElementById("bgAudio");
const toggle = document.getElementById("musicToggle");
let playing = false;

// Add click effect
toggle.addEventListener('click', function() {
    // Ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.left + rect.width/2 - size/2) + 'px';
    ripple.style.top = (rect.top + rect.height/2 - size/2) + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    // Toggle music
    playing = !playing;
    if (playing) {
        audio.play().catch(e => console.log('Audio play failed:', e));
        toggle.textContent = "🔊";
        toggle.style.background = "#0ff";
        toggle.style.color = "#000";
    } else {
        audio.pause();
        toggle.textContent = "🔈";
        toggle.style.background = "transparent";
        toggle.style.color = "#0ff";
    }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced TV 404 with better animations
const tvBtn = document.getElementById("tvBtn");
const tvOutput = document.getElementById("tvOutput");
const tvFrameContainer = document.getElementById("tvFrameContainer");
const tvFrame = document.getElementById("tvFrame");
const fullscreenBtn = document.getElementById("fullscreenBtn");

tvBtn.addEventListener("click", () => {
    // Add click animation
    tvBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
        tvBtn.style.transform = "scale(1)";
    }, 150);
    
    // Show TV output with animation
    tvOutput.classList.remove("hidden");
    tvOutput.style.opacity = "0";
    tvOutput.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        tvOutput.style.transition = "all 0.5s ease";
        tvOutput.style.opacity = "1";
        tvOutput.style.transform = "translateY(0)";
    }, 50);
    
    // Show loading animation
    document.querySelector(".loading-dots").style.display = "flex";
    document.querySelector(".coming-text").style.display = "block";
    tvFrameContainer.classList.add("hidden");
    
    // Simulate loading with better UX
    setTimeout(() => {
        document.querySelector(".loading-dots").style.display = "none";
        document.querySelector(".coming-text").style.display = "none";
        tvFrameContainer.classList.remove("hidden");
        
        // Add fade-in effect for iframe
        tvFrameContainer.style.opacity = "0";
        tvFrameContainer.style.transform = "scale(0.9)";
        
        setTimeout(() => {
            tvFrameContainer.style.transition = "all 0.5s ease";
            tvFrameContainer.style.opacity = "1";
            tvFrameContainer.style.transform = "scale(1)";
        }, 50);
        
        // Load the TV content
        tvFrame.src = "https://kenyalivetv.co.ke";
    }, 3000); // Reduced from 5s to 3s for better UX
});

// Enhanced fullscreen functionality
fullscreenBtn.addEventListener("click", () => {
    if (tvFrame.requestFullscreen) {
        tvFrame.requestFullscreen();
    } else if (tvFrame.webkitRequestFullscreen) {
        tvFrame.webkitRequestFullscreen();
    } else if (tvFrame.msRequestFullscreen) {
        tvFrame.msRequestFullscreen();
    }
    
    // Add fullscreen feedback
    fullscreenBtn.textContent = "🎥 Fullscreen";
    setTimeout(() => {
        fullscreenBtn.textContent = "📺 Fullscreen";
    }, 1000);
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.6s ease";
    observer.observe(section);
});

// Enhanced bot card hover effects
document.querySelectorAll('.bot, .tool-card, .group-btn').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Console welcome message
console.log(`%c
╔══════════════════════════════╗
║    Welcome to 404 Tech!      ║
║    Digital Freedom Hub       ║
║    👨‍💻 Owned by Nuch & Owen   ║
╚══════════════════════════════╝
`, 'color: #0ff; font-family: monospace; font-size: 12px;');