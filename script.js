const restartBtn = document.querySelector("#restartGame");
const rollBtn = document.querySelector("#rollCube");
const keepScoreBtn = document.querySelector("#keepScore");
const player1 = document.querySelector(".player-0");
const player2 = document.querySelector(".player-1");

const dice = document.querySelector(".dice");

const modalWindow = document.querySelector(".modal-window");
const closeModalWindowBtn = document.querySelector(".close-modal-btn");
const showModalWindowBtn = document.querySelector(".show-rules");

let currentPlayer = 0;
let currentValue = 0;
const totalScores = [0, 0];
const playSound = new Audio();

console.log(`Сейчас бросает кубик игрок №${currentPlayer}`);

rollBtn.addEventListener("click", () => {
  playSound.src = "./assets/audio/dice.mp3";
  playSound.play();
  let rollValue = Math.trunc(Math.random() * 6 + 1);

  if (rollValue !== 1) {
    console.log(
      `Игрок ${currentPlayer} бросает кубик и получает число ${rollValue}`
    );
    dice.src = `./assets/dice${rollValue}.png`;
    currentValue += rollValue;
    document.getElementById(`currentScore_${currentPlayer}`).textContent =
      currentValue;
  } else {
    playSound.src = "./assets/audio/dice.mp3";
    playSound.play();
    dice.src = `./assets/dice${rollValue}.png`;

    currentValue = 0;
    document.getElementById(`currentScore_${currentPlayer}`).textContent =
      currentValue;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    console.log(`Выпало число ${rollValue}`);
    player1.classList.toggle("isActive");
    player2.classList.toggle("isActive");
  }
});

keepScoreBtn.addEventListener("click", () => {
  playSound.src = "./assets/audio/click.mp3";
  playSound.play();
  totalScores[currentPlayer] += currentValue;
  document.getElementById(`totalScore-${currentPlayer}`).textContent =
    totalScores[currentPlayer];
  currentValue = 0;
  document.getElementById(`currentScore_${currentPlayer}`).textContent =
    currentValue;
  if (totalScores[currentPlayer] >= 100) {
    console.log(`Игрок №${currentPlayer + 1} победил!`);
    rollBtn.disabled = true;
    keepScoreBtn.disabled = true;
    playSound.src = "./assets/audio/win.mp3";
    playSound.play();
  }
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player1.classList.toggle("isActive");
  player2.classList.toggle("isActive");
});

restartBtn.addEventListener("click", () => {
  playSound.src = "./assets/audio/click.mp3";
  playSound.play();
  currentPlayer = 0;
  currentValue = 0;
  totalScores[0] = 0;
  totalScores[1] = 0;
  document.getElementById(`currentScore_0`).textContent = currentValue;
  document.getElementById(`totalScore-0`).textContent = 0;
  document.getElementById(`currentScore_1`).textContent = currentValue;
  document.getElementById(`totalScore-1`).textContent = 0;
  rollBtn.disabled = false;
  keepScoreBtn.disabled = false;
});

showModalWindowBtn.addEventListener("click", () => {
  modalWindow.classList.toggle("hidden");
});
closeModalWindowBtn.addEventListener("click", () => {
  modalWindow.classList.toggle("hidden");
});
