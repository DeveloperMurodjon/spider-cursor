const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const spiders = createSpiders(2); // 2 ta o'rgimchak yaratiladi

// Kursorni kuzatish uchun harakatlarni ishlovchi funksiya
document.addEventListener("pointermove", (e) => {
  spiders.forEach((spider) => spider.follow(e.clientX, e.clientY));
});

// O'rgimchaklarni yaratish uchun funksiya
function createSpiders(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(new Spider());
  }
  return arr;
}

// O'rgimchak klassi
class Spider {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.angle = 0;
  }

  follow(targetX, targetY) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    this.angle = Math.atan2(dy, dx);
    this.x += Math.cos(this.angle) * 2;
    this.y += Math.sin(this.angle) * 2;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // O'rgimchakning tanasi
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(10, 10);
    ctx.moveTo(-10, 10);
    ctx.lineTo(10, -10);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

// Animatsiya funksiyasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spiders.forEach((spider) => spider.draw());

  requestAnimationFrame(animate);
}

animate();
