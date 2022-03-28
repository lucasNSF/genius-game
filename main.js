// Guarda a ordem do jogo
const order = [];
// Guarda a ordem do usuário
const userOrder = [];
// Guarda o nível atual do usuário
let level = 1;

/** Códigos de cada cor
 * 0 - Azul
 * 1 - Vermelho
 * 2 - Amarelo
 * 3 - Verde
 */

// Botão para iniciar o jogo
const btnStart = document.querySelector("#start");

// Função que inicia o jogo
const startGame = () => {
  disableButtons();
  sortColors();

  for (let i in order) {
    const element = document.querySelector(
      `button[data-codeColor="${order[i]}"]`
    );
    showOrder(element, Number(i) + 1);
  }

  setTimeout(enableButtons, order.length * 1000);
};

// Função que sorteia as cores
const sortColors = () => {
  if (level === 1) {
    for (let i = 0; i < 5; i++) {
      order.push(Math.floor(Math.random() * 4));
    }
  } else {
    order.push(Math.floor(Math.random() * 4));
  }
};

// Função que mostra a ordem sorteada
const showOrder = (element, number) => {
  number = number * 1000;
  setTimeout(() => {
    element.classList.add("selected");
    setTimeout(() => {
      element.classList.remove("selected");
    }, 500);
  }, number - 500);
};

// Função que registra os cliques do usuário
const registerClick = (element) => {
  userOrder.push(Number(element.dataset.codecolor));
};

// Funções de Botões

const disableButtons = () => {
  document.querySelectorAll(".genius > button").forEach((e) => {
    e.disabled = true;
  });
};

const enableButtons = () => {
  document.querySelectorAll(".genius > button").forEach((e) => {
    e.disabled = false;
  });
};

// Evento para o botão de iniciar o jogo
btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  startGame();

  document.querySelectorAll(".genius > button").forEach((btn) => {
    btn.addEventListener("click", () => {
      registerClick(btn);

      btn.classList.add("selected");

      setTimeout(() => {
        btn.classList.remove("selected");
      }, 300);
    });
  });
});

// Vigia os cliques do usuário em tempo real
window.addEventListener("click", () => {
  if (userOrder.length === order.length) {
    disableButtons();
    checkOrder();
  } else if (userOrder.length > order.length) {
    gameOver();
  }
});

// Função que verifica se a sequência está correta
const checkOrder = () => {
  for (let i in userOrder) {
    if (userOrder[i] != order[i]) {
      gameOver();
      return;
    }
  }

  nextLevel();
};

// Função que encerra o jogo
const gameOver = () => {
  alert(
    `Oh no! This is not the correct sequence...\nYour level record = ${level}`
  );
  window.location.reload(true);
};

// Função que vai para o próximo nível
const nextLevel = () => {
  alert("Congratulations! Now it will get harder...");
  level++;
  cleanUserOrder();
  startGame();
};

// Função que limpa as respostas do usuário
const cleanUserOrder = () => {
  let size = userOrder.length;
  while (size >= 0) {
    userOrder.pop();
    size--;
  }
};
