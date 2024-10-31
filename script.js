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
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.angle = 0;
    this.size = 2; // O'rgimchak o'lchamini 2 ga kamaytirdik
  }

  follow(targetX, targetY) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    this.angle = Math.atan2(dy, dx);
    this.x += Math.cos(this.angle) * 1.5; // Harakat tezligini o'zgartirish
    this.y += Math.sin(this.angle) * 1.5;

    // Yulduzlarga tirmashish effektini qo'shamiz
    this.y += Math.sin(this.x * 0.1) * 0.5; // X harakati bo'yicha tirmashadi
    this.x += Math.cos(this.angle) * 0.2; // Harakatni moslashtirish
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // O'rgimchakning tanasi - oq simbiot ko'rinishi
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2); // Simbiot ko'rinishi uchun doira
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Oq rang, biroz shaffof
    ctx.fill();
    ctx.strokeStyle = "white"; // O'rgimchakning qirralari oq rangda
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

// O'rgimchaklarni yaratish uchun funksiya
const spiders = createSpiders(5); // 5 ta o'rgimchak yaratiladi

function createSpiders(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(new Spider());
  }
  return arr;
}

// Kursorni kuzatish uchun harakatlarni ishlovchi funksiya
document.addEventListener("pointermove", (e) => {
  spiders.forEach((spider) => spider.follow(e.clientX, e.clientY));
});

// Yulduzlarni chizish funksiyasi
function drawStars() {
  stars.forEach((star) => {
    ctx.fillStyle = "white";
    ctx.fillRect(star.x, star.y, 2, 2); // Yulduz o'lchamini o'zgartiring
  });
}

// Animatsiya funksiyasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars(); // Yulduzlarni chizish
  spiders.forEach((spider) => spider.draw());

  requestAnimationFrame(animate);
}

animate();
