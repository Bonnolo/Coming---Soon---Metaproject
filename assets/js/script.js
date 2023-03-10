/*
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// mouse
let mouse = {
  x: null,
  y: null,
  radius: 100,
};
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x + canvas.clientLeft / 2;
  mouse.y = event.y + canvas.clientTop / 2;
});
function drawImage() {
  let imageWidth = png.width;
  let imageHeight = png.height;
  const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  class Particle {
    constructor(x, y, color, size) {
      (this.x = x + canvas.width / 2 - png.width * 2),
        (this.y = y + canvas.height / 2 - png.height * 2),
        (this.color = color),
        (this.size = 2),
        (this.baseX = x + canvas.width / 2 - png.width * 2),
        (this.baseY = y + canvas.height / 2 - png.height * 2),
        (this.density = Math.random() * 10 + 2);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    update() {
      ctx.fillStyle = this.color;

      // collision detection
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx * dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;

      // max distance, past that the force will be 0
      const maxDistance = 100;
      let force = (maxDistance - distance) / maxDistance;
      if (force < 0) force = 0;

      let directionX = forceDirectionX * force * this.density * 0.6;
      let directionY = forceDirectionY * force * this.density * 0.6;

      if (distance < mouse.radius + this.size) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y = dy / 20;
        }
      }
      this.draw();
    }
  }
  function init() {
    particleArray = [];

    for (let y = 0, y2 = data.height; y < y2; y++) {
      for (let x = 0, x2 = data.width; x < x2; x++) {
        if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
          let positionX = x;
          let positionY = y;
          let color =
            "rgb(" +
            data.data[y * 4 * data.width + x * 4] +
            "," +
            data.data[y * 4 * data.width + x * 4 + 1] +
            "," +
            data.data[y * 4 * data.width + x * 4 + 1] +
            ")";
          particleArray.push(new Particle(positionX * 4, positionY * 4, color));
        }
      }
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
    }
  }
  init();
  animate();

  window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });
}

const png = new Image();
png.src =
  "data:image/png;base64,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";

window.addEventListener("load", (event) => {
  console.log("page has loaded");
  ctx.drawImage(png, 0, 0);
  drawImage();
}); */
// -------------------------------- fine testing ------------------------------------------

// in use

let leaf = document.querySelector("#foglia");
let social = document.querySelector(".social-container");
let container = document.querySelector(".container");
let logo = document.querySelector(".logo img");
let p = document.querySelector(".logo p");

leaf.addEventListener("click", function () {
  social.classList.toggle("active");
  logo.classList.toggle("invis");
  p.classList.toggle("invis");
  container.classList.toggle("hide");
});
