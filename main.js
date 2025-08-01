// BearBelly - Cuide do Ursinho! 🧸✨
// Tudo feito com JavaScript puro (HTML, CSS e lógica no mesmo arquivo)

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.fontFamily = "Comic Sans MS, sans-serif";
document.body.style.background = "linear-gradient(to top, #f6f1ff, #d3f0ff)";

// Criar estrutura do jogo
const game = document.createElement("div");
Object.assign(game.style, {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});
document.body.appendChild(game);

// Criar urso
const bear = document.createElement("div");
Object.assign(bear.style, {
  position: "absolute",
  width: "120px",
  height: "120px",
  backgroundImage: "url('https://i.imgur.com/j8Zu1Uq.png')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  transition: "transform 0.3s ease",
});
game.appendChild(bear);

// Status
const status = document.createElement("div");
Object.assign(status.style, {
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "#fff8",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "16px",
});
game.appendChild(status);

// Variáveis do jogo
const foods = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥕", "🍰", "🧁", "🍞"];
let hunger = 50;
let happiness = 50;

function updateStatus() {
  status.innerHTML = `Fome: ${100 - hunger}%<br>Felicidade: ${happiness}%`;
}

// Criar comida
function spawnFood(x, y) {
  const food = document.createElement("div");
  food.textContent = foods[Math.floor(Math.random() * foods.length)];
  Object.assign(food.style, {
    position: "absolute",
    left: x - 20 + "px",
    top: y - 20 + "px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "40px",
    animation: "fall 2s forwards",
    cursor: "pointer",
    transition: "transform 0.2s",
  });
  game.appendChild(food);

  // Remover após cair e verificar distância
  setTimeout(() => {
    const bearRect = bear.getBoundingClientRect();
    const bearX = bearRect.left + bearRect.width / 2;
    const bearY = bearRect.top + bearRect.height / 2;
    const dist = Math.hypot(x - bearX, y - bearY);

    if (dist < 100) {
      hunger = Math.min(100, hunger + 10);
      happiness = Math.min(100, happiness + 5);
      bear.style.transform = "translate(-50%, -50%) scale(1.1)";
      setTimeout(() => {
        bear.style.transform = "translate(-50%, -50%) scale(1)";
      }, 200);
    }

    food.remove();
    updateStatus();
  }, 2000);
}

// Mostrar coração de carinho
function showHeart(x, y) {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  Object.assign(heart.style, {
    position: "absolute",
    left: x + "px",
    top: y + "px",
    fontSize: "24px",
    animation: "float 1s ease-out",
    pointerEvents: "none",
  });
  game.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

// Criar animações via JavaScript (sem CSS externo)
const style = document.createElement("style");
style.textContent = `
@keyframes fall {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100px); opacity: 0; }
}
@keyframes float {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-40px); opacity: 0; }
}
`;
document.head.appendChild(style);

// Clique para alimentar ou fazer carinho
game.addEventListener("click", (e) => {
  const bearRect = bear.getBoundingClientRect();
  const bearX = bearRect.left + bearRect.width / 2;
  const bearY = bearRect.top + bearRect.height / 2;
  const dist = Math.hypot(e.clientX - bearX, e.clientY - bearY);

  if (dist < 80) {
    happiness = Math.min(100, happiness + 10);
    showHeart(e.clientX, e.clientY);
  } else {
    spawnFood(e.clientX, e.clientY);
  }

  updateStatus();
});

// Redução natural com o tempo
setInterval(() => {
  hunger = Math.max(0, hunger - 1);
  happiness = Math.max(0, happiness - (hunger < 30 ? 2 : 1));
  updateStatus();
}, 3000);

// Inicializa
updateStatus();
