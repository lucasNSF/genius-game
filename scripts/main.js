import {
  showGame,
  showSelectedButton,
  hideSelectedButton,
} from "./animations.js";
import { btnStart } from "./elements.js";

// Guarda a ordem do jogo
const order = [];
// Guarda a ordem do usuário
const userOrder = [];
// Guarda o nível atual do usuário
let level = 1;

/** Códigos de cada cor
 * 0 - btn-1
 * 1 - btn-2
 * 2 - btn-3
 * 3 - btn-4
 */

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
    for (let i = 0; i < 4; i++) {
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
    showSelectedButton(element);
    setTimeout(() => {
      hideSelectedButton(element);
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
  showGame();

  setTimeout(() => {
    startGame();
  }, 200);

  document.querySelectorAll(".genius > button").forEach((btn) => {
    btn.addEventListener("click", () => {
      registerClick(btn);

      showSelectedButton(btn);
      setTimeout(() => {
        hideSelectedButton(btn);
      }, 300);
    });
  });
});

// Vigia os cliques do usuário em tempo real
window.addEventListener("click", () => {
  if (userOrder.length === order.length && order.length !== 0) {
    disableButtons();
    checkOrder();
  } else if (userOrder.length > order.length) {
    gameOver();
  }
});

// Função que vai para o próximo nível
const nextLevel = () => {
  setTimeout(() => {
    alert("Parábens! Agora vai ficar mais difícil...");
  }, 250);
  level++;
  setTimeout(() => {
    cleanUserOrder();
    startGame();
  }, 250);
};

// Função que verifica se a sequência está correta
const checkOrder = () => {
  let win = true;

  for (let i in userOrder) {
    if (userOrder[i] != order[i]) {
      gameOver();
      win = false;
      break;
    }
  }

  if (win) {
    nextLevel();
  }
};

// Função que encerra o jogo
const gameOver = () => {
  setTimeout(() => {
    alert(
      `Oh não... Você não acertou a sequência!
      Seu recorde = ${level}.`
    );
    window.location.reload();
  }, 250);
};

// Função que limpa as respostas do usuário
const cleanUserOrder = () => {
  let size = userOrder.length;
  while (size >= 0) {
    userOrder.pop();
    size--;
  }
};
