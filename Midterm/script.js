const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];
const starCount = 1000; // Increased number of stars
const shootingStarCount = 3; // Number of shooting stars

// Create stars with a bit more spread
function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.05 + 0.02,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }
}

// Create shooting stars with randomized start and end points
function createShootingStars(count) {
  for (let i = 0; i < count; i++) {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 5 + 4,
      alpha: Math.random() * 0.5 + 0.5,
      length: Math.random() * 150 + 100,
      trailLength: Math.random() * 15 + 5,
      trail: [] // Array to store the trail of shooting stars
    });
  }
}

// Draw stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw regular twinkling stars
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
  }

  // Draw shooting stars
  for (let shootingStar of shootingStars) {
    shootingStar.x += shootingStar.speed;
    shootingStar.y += shootingStar.speed;

    // Add the current position of the shooting star to its trail
    shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y });

    // Limit the trail length
    if (shootingStar.trail.length > shootingStar.trailLength) {
      shootingStar.trail.shift(); // Remove the oldest trail point
    }

    // Draw the trail
    for (let i = 0; i < shootingStar.trail.length; i++) {
      const point = shootingStar.trail[i];
      const alpha = shootingStar.alpha * (1 - i / shootingStar.trail.length); // Fade the trail
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    // Reset shooting stars when they go out of the canvas
    if (shootingStar.x > canvas.width || shootingStar.y > canvas.height || shootingStar.x < 0 || shootingStar.y < 0) {
      shootingStar.x = Math.random() * canvas.width;
      shootingStar.y = Math.random() * canvas.height;
      shootingStar.trail = []; // Reset the trail
    }
  }

  requestAnimationFrame(drawStars);
}

// Resize canvas when window is resized
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  shootingStars = [];
  createStars(starCount);
  createShootingStars(shootingStarCount);
}

// Initialize everything
window.addEventListener("resize", resizeCanvas);
createStars(starCount);
createShootingStars(shootingStarCount);
drawStars();