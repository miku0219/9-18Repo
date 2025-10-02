let GNum = Math.floor(Math.random() * 101);
let startTime;
let timerInterval;
let Gaming = false;

N = 0;
A = 0;

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
      "猜0~100之間的整數：猜中了！共猜了" + N + "次，花了" + totalTime + " 秒";
    alert("猜中了！共猜了" + N + "次，花了" + totalTime + "秒");
    A++;
    const GList = document.getElementById("guessList");
    const NList = document.createElement("p");
    const now = new Date();
    const time = now.toLocaleTimeString("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    NList.textContent =
      A + ". 猜了" + N + "次，耗時" + totalTime + " 秒 " + time;
    GList.appendChild(NList);
    GNum = Math.floor(Math.random() * 101);
    N = 0;
    Gaming = false;
  }
}

// function List() {
//   const GList = document.getElementById("guessList");
//   const NList = document.createElement("li");
//   const now = new Date();
//   NList.textContent = "猜了" + N + "次，耗時" + totalTime + " 秒 " + now;
//   GList.appendChild();
// }
