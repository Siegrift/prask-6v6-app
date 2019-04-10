const startContainer = document.getElementById("start-container");
const mainContainer = document.getElementById("main-container");
const restartButton = document.getElementById("restart");
const timeText = document.getElementById("time");
const untappedCodeText = document.getElementById("untapped-code");
const tappedCodeText = document.getElementById("tapped-code");
const buttons = Array.apply(null, { length: 9 }).map((_, i) =>
  document.getElementById(`btn${i + 1}`)
);

let startTime;
let currentInterval;
const updateTimeValue = () => {
  timeText.innerHTML = (Date.now() - startTime) / 1000;
};

const LENGTH = 3;
let untappedCode = "";
let tappedCode = "";

const updateCodePanel = () => {
  untappedCodeText.innerHTML = untappedCode;
  tappedCodeText.innerHTML = tappedCode;
};

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const shuffleButtonText = () => {
  const newButtonsText = shuffle(buttons.map(btn => btn.innerHTML));
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = newButtonsText[i];
  }
};
shuffleButtonText();

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!currentInterval) return;

    new Audio("click.wav").play();

    if (btn.innerHTML[0] === untappedCode[0]) {
      tappedCode += untappedCode[0];
      untappedCode = untappedCode.substr(1);
      if (untappedCode.length === 0) {
        clearInterval(currentInterval);
        currentInterval = undefined;
        new Audio("winner.wav").play();
      }
    } else {
      $(document.body).effect("shake");
      untappedCode = tappedCode + untappedCode;
      tappedCode = "";
      new Audio("fail.wav").play();
    }

    shuffleButtonText();
    updateCodePanel();
  });
});

startContainer.addEventListener("click", () => {
  startContainer.classList.toggle("hidden");
  mainContainer.classList.toggle("hidden");

  for (let i = 0; i < LENGTH; i++) {
    untappedCode += Math.ceil(Math.random() * 9);
  }
  untappedCodeText.innerHTML = untappedCode;
  updateCodePanel();

  startTime = Date.now();
  currentInterval = setInterval(updateTimeValue, 47);
});

restartButton.addEventListener("click", () => {
  startContainer.classList.toggle("hidden");
  mainContainer.classList.toggle("hidden");

  untappedCode = "";
  tappedCode = "";

  clearInterval(currentInterval);
  timeText.innerHTML = "";
});
