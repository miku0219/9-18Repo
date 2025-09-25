let GNum = Math.floor(Math.random() * 101);
N = 0;
function Guess() {
  const num = parseInt(document.getElementById("guess").value);
  if (num > GNum) {
    N++;
    alert("太大了，請再試一次。");
  } else if (num < GNum) {
    N++;
    alert("太小了，請再試一次。");
  } else if (num === GNum) {
    N++;
    alert("猜對了，總共用了" + N + "次。");
    GNum = Math.floor(Math.random() * 100);
  }
}
