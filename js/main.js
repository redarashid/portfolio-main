//menu toggle
let menu = document.getElementById("menu-toggle");
let list = document.getElementById("list");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  list.classList.toggle("active");
});

// animation section & elements
function restartAnimation(element) {
  element.style.animation = "none";
  element.offsetHeight;
  element.style.animation = "";
}

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".animate-on-scroll");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
      if (!section.classList.contains("active")) {
        section.classList.add("active");
        const children = section.querySelectorAll(".animate-child");
        children.forEach((child) => restartAnimation(child));
      }
    }
  });
});

// Function to activate links while scrolling
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-links a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav-links a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

function filterItems(category) {
  let items = document.querySelectorAll(".project");
  items.forEach((item) => {
    if (category === "All" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  let buttons = document.querySelectorAll(".filter");
  buttons.forEach((btn) => btn.classList.remove("btn-primary"));
  const activeBtn = document.querySelector(`[data-filter="${category}"]`);
  if (activeBtn) {
    activeBtn.classList.add("btn-primary");
  }
}

//particle animation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const home = document.querySelector(".Home");

function resizeCanvas() {
  canvas.width = home.clientWidth;
  canvas.height = home.clientHeight;
}
resizeCanvas();

const mouse = {
  x: null,
  y: null,
  radius: 120,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x -= dx / 5;
      this.y -= dy / 5;
    }

    this.draw();
  }
}

let particlesArray = [];

function init() {
  particlesArray = [];
  let num = (canvas.width * canvas.height) / 9000;
  for (let i = 0; i < num; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 1.5;
    let speedY = (Math.random() - 0.5) * 1.5;
    let color = "chartreuse";
    particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particlesArray) {
    particle.update();
  }
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});
