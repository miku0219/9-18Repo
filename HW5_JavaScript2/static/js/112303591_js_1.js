let GNum = Math.floor(Math.random() * 101);
N = 0;
function Guess() {
  const num = parseInt(document.getElementById("guess").value);
  const result = document.getElementById("guessresult");
  const oldresult = result.querySelector("p");
  const newresult = document.createElement("p");
  if (num > GNum) {
    newresult.textContent = "猜0~100之間的整數：太大了，請再試一次。";
    result.replaceChild(newresult, oldresult);
    N++;
  } else if (num < GNum) {
    newresult.textContent = "猜0~100之間的整數：太小了，請再試一次。";
    result.replaceChild(newresult, oldresult);
    N++;
  } else if (num === GNum) {
    N++;
    newresult.textContent = "猜0~100之間的整數：猜中了！共猜了" + N + "次";
    result.replaceChild(newresult, oldresult);
    GNum = Math.floor(Math.random() * 100);
    N = 0;
  }
}
