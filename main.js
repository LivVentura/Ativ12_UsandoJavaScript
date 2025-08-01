// BearFeast - Jogo Fofinho da Lívia 💜🍓
// Arquivo único JavaScript

(function() {
  document.title = "🐻 BearFeast - Criado por Lívia 💜";

  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      background: linear-gradient(to bottom, #d9c7ff, #b6d0ff);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100vh;
      overflow: hidden;
    }
    header, footer {
      width: 100%;
      padding: 15px;
      text-align: center;
      color: white;
      font-weight: bold;
    }
    header {
      background: linear-gradient(90deg, #a066d1, #4d7fdc);
      font-size: 24px;
    }
    footer {
      background: linear-gradient(90deg, #4d7fdc, #a066d1);
      font-size: 16px;
      position: absolute;
      bottom: 0;
    }
    #intro {
      margin-top: 40px;
      text-align: center;
      max-width: 600px;
      background: rgba(255, 255, 255, 0.8);
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
    }
    #game-area {
      flex-grow: 1;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    .comida {
      position: absolute;
      font-size: 48px;
      cursor: pointer;
      transition: transform 0.2s;
      user-select: none;
    }
    .comida:hover {
      transform: scale(1.2);
    }
    #hud {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 10px;
      font-size: 20px;
      color: #4d4d4d;
    }
    #start, #tentarNovamente {
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 18px;
      background: linear-gradient(90deg, #7e5dcf, #5a87e5);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #start:hover, #tentarNovamente:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 10px rgba(0,0,0,0.2);
    }
    .urso {
      font-size: 60px !important;
      color: #663399;
      text-shadow: 1px 1px 2px #a079d1;
    }
  `;
  document.head.appendChild(style);

  const header = document.createElement("header");
  header.textContent = "🐻 BearFeast - Clique nas comidinhas!";
  document.body.appendChild(header);

  const hud = document.createElement("div");
  hud.id = "hud";

  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score";
  scoreDisplay.style.display = "none";

  const timerDisplay = document.createElement("div");
  timerDisplay.id = "timer";
  timerDisplay.style.display = "none";

  const perdidasDisplay = document.createElement("div");
  perdidasDisplay.id = "perdidas";
  perdidasDisplay.style.display = "none";

  hud.appendChild(scoreDisplay);
  hud.appendChild(timerDisplay);
  hud.appendChild(perdidasDisplay);
  document.body.appendChild(hud);

  const intro = document.createElement("div");
  intro.id = "intro";
  intro.innerHTML = `
    <h2>🍰 Como jogar:</h2>
    <p>Clique nas comidinhas 🍩🍕🍓 que aparecerem na tela antes que desapareçam!</p>
    <p>Se deixar <strong>5 comidas escaparem</strong>, você perde!</p>
    <p><strong>Todas as comidas valem ponto!</strong> Os ursinhos 🐻 aparecem raramente e valem <strong>5 pontos</strong>.</p>
    <button id="start">Iniciar Jogo</button>
  `;
  document.body.appendChild(intro);

  const gameArea = document.createElement("div");
  gameArea.id = "game-area";
  document.body.appendChild(gameArea);

  const footer = document.createElement("footer");
  footer.innerHTML = "Criado com carinho por Lívia 💖";
  document.body.appendChild(footer);

  let score = 0;
  let tempo = 60;
  let comidasPerdidas = 0;
  let intervaloComidas;
  let cronometro;

  const comidas = ["🍓", "🍰", "🍕", "🍇", "🍪", "🍭", "🍉", "🍌", "🍔"];

  function criarComida() {
    const isUrso = Math.random() < 0.1;
    const emoji = isUrso ? "🐻" : comidas[Math.floor(Math.random() * comidas.length)];
    const comida = document.createElement("div");
    comida.className = "comida";
    if (isUrso) comida.classList.add("urso");
    comida.textContent = emoji;
    comida.style.left = Math.random() * 90 + "%";
    comida.style.top = Math.random() * 80 + "%";
    gameArea.appendChild(comida);

    let clicado = false;

    const tempoDeVida = 1200;
    const remover = setTimeout(() => {
      if (!clicado && gameArea.contains(comida)) {
        gameArea.removeChild(comida);
        comidasPerdidas++;
        perdidasDisplay.textContent = `Perdidas: ${comidasPerdidas}/5`;
        if (comidasPerdidas >= 5) encerrarJogo(false);
      }
    }, tempoDeVida);

    comida.addEventListener("click", () => {
      if (clicado) return;
      clicado = true;
      clearTimeout(remover);
      if (gameArea.contains(comida)) gameArea.removeChild(comida);
      score += isUrso ? 5 : 1;
      scoreDisplay.textContent = "Pontos: " + score;
    });
  }

  function iniciarJogo() {
    intro.remove();
    score = 0;
    comidasPerdidas = 0;
    tempo = 60;

    scoreDisplay.textContent = "Pontos: 0";
    perdidasDisplay.textContent = "Perdidas: 0/5";
    timerDisplay.textContent = "Tempo: 60s";

    scoreDisplay.style.display = "block";
    timerDisplay.style.display = "block";
    perdidasDisplay.style.display = "block";

    let velocidade = 1200;

    function atualizarVelocidade() {
      clearInterval(intervaloComidas);
      intervaloComidas = setInterval(criarComida, velocidade);
    }

    atualizarVelocidade();

    cronometro = setInterval(() => {
      tempo--;
      timerDisplay.textContent = "Tempo: " + tempo + "s";

      if (tempo === 45) {
        velocidade = 1000;
        atualizarVelocidade();
      } else if (tempo === 30) {
        velocidade = 800;
        atualizarVelocidade();
      } else if (tempo === 15) {
        velocidade = 600;
        atualizarVelocidade();
      }

      if (tempo <= 0) {
        encerrarJogo(true);
      }
    }, 1000);
  }

  function encerrarJogo(vitoria) {
    clearInterval(intervaloComidas);
    clearInterval(cronometro);
    gameArea.innerHTML = "";
    scoreDisplay.style.display = "none";
    timerDisplay.style.display = "none";
    perdidasDisplay.style.display = "none";

    const fim = document.createElement("div");
    fim.id = "intro";
    fim.innerHTML = `
      <h2>${vitoria ? "🎉 Fim de jogo!" : "😢 Você perdeu!"}</h2>
      <p>Seu placar final: <strong>${score}</strong></p>
      <p>Comidas perdidas: ${comidasPerdidas}/5</p>
      <button id="tentarNovamente">Tentar Novamente</button>
    `;
    document.body.insertBefore(fim, gameArea);

    document.getElementById("tentarNovamente").onclick = () => {
      fim.remove();
      iniciarJogo();
    };
  }

  document.getElementById("start").onclick = iniciarJogo;
})();
