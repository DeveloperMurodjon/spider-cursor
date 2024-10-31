const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Oyna o'lchami o'zgarganda canvas o'lchamini yangilash
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Yulduzlarni yaratish funksiyasi
const stars = createStars(200); // 200 ta yulduz

function createStars(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    });
  }
  return arr;
}

// O'rgimchak klassi
class Spider {
  constructor(speed) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 2; // O'rgimchak o'lchami
    this.speed = speed; // O'rgimchakning tezligi
  }

  update(targetX, targetY) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const angle = Math.atan2(dy, dx); // Kursor tomoni burchakini hisoblash

    // O'rgimchakni harakatlantirish
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // O'rgimchakning tanasi
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2); // Oq simbiot ko'rinishi
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Oq rang
    ctx.fill();
    ctx.strokeStyle = "white"; // O'rgimchakning qirralari oq rangda
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

// O'rgimchaklarni yaratish uchun funksiya
const spiders = createSpiders(2); // 2 ta o'rgimchak yaratiladi

function createSpiders(count) {
  const arr = [];
  // Har bir o'rgimchak uchun tezlikni belgilash
  arr.push(new Spider(1.5)); // 1.5 tezlikda birinchi o'rgimchak
  arr.push(new Spider(2.5)); // 2.5 tezlikda ikkinchi o'rgimchak
  return arr;
}

// Yulduzlarni chizish funksiyasi
function drawStars() {
  stars.forEach((star) => {
    ctx.fillStyle = "white";
    ctx.fillRect(star.x, star.y, 2, 2); // Yulduz o'lchami
  });
}

// Kursor harakati bilan o'rgimchaklarni kuzatish
let cursorX = canvas.width / 2; // Kursorning boshlang'ich X koordinatasi
let cursorY = canvas.height / 2; // Kursorning boshlang'ich Y koordinatasi

document.addEventListener("pointermove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

// Animatsiya funksiyasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars(); // Yulduzlarni chizish
  spiders.forEach((spider) => {
    spider.update(cursorX, cursorY); // Harakat qilish
    spider.draw(); // Chizish
  });

  requestAnimationFrame(animate);
}

animate();
