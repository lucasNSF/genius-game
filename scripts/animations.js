import { borderH1, modalLose, btnModLose } from "./elements.js";

// Funções

const animateBorder = () => {
  setInterval(() => {
    borderH1.style.transform = "translateX(210px)";
    setTimeout(() => {
      borderH1.style.transform = "translateX(0px)";
    }, 700);
  }, 1500);
};

export const showGame = () => {
  document.querySelectorAll(".genius > button").forEach((btn) => {
    btn.style.opacity = "1";
  });
};

const playAudio = (button) => {
  const audio = document.querySelector(
    `audio[data-code="${button.dataset.codecolor}"]`
  );

  audio.currentTime = 0;
  audio.play();
};

export const showSelectedButton = (btn) => {
  switch (btn.classList[0]) {
    case "btn-1":
      btn.classList.add("btn-1-focus");
      break;
    case "btn-2":
      btn.classList.add("btn-2-focus");
      break;
    case "btn-3":
      btn.classList.add("btn-3-focus");
      break;
    case "btn-4":
      btn.classList.add("btn-4-focus");
      break;
  }
  playAudio(btn);
};

export const hideSelectedButton = (btn) => {
  switch (btn.classList[0]) {
    case "btn-1":
      btn.classList.remove("btn-1-focus");
      break;
    case "btn-2":
      btn.classList.remove("btn-2-focus");
      break;
    case "btn-3":
      btn.classList.remove("btn-3-focus");
      break;
    case "btn-4":
      btn.classList.remove("btn-4-focus");
      break;
  }
};

const showModalLose = () => {
  modalLose.classList.remove("hidden");
};

const hideModalLose = () => {
  modalLose.classList.add("hidden");
};

// Eventos

window.addEventListener("load", animateBorder);
