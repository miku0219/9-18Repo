let GNum = Math.floor(Math.random() * 101);
let startTime;
let timerInterval;
let Gaming = false;

const start = document.getElementById("GB");

N = 0;

function startG() {
  if (!Gaming) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 10);
    Gaming = true;
  }
}

function updateTimer() {
  const timerElement = document.getElementById("getTime");
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 10) / 100;
  timerElement.textContent = elapsedTime;
}
function Guess() {
  const num = parseInt(document.getElementById("guess").value);
  const result = document.getElementById("guessResult");

  if (num > GNum) {
    result.textContent = "猜0~100之間的整數：太大了，請再試一次。";
    N++;
  } else if (num < GNum) {
    result.textContent = "猜0~100之間的整數：太小了，請再試一次。";
    N++;
  } else if (num === GNum) {
    clearInterval(timerInterval);
    const endTime = new Date().getTime();
    const totalTime = Math.floor((endTime - startTime) / 10) / 100;
    N++;
    result.textContent =
      "猜0~100之間的整數：猜中了！共猜了" + N + "次，花了" + totalTime + "秒";
    alert("猜中了！共猜了" + N + "次，花了" + totalTime + "秒");
    GNum = Math.floor(Math.random() * 101);
    N = 0;
    Gaming = false;
  }
}
