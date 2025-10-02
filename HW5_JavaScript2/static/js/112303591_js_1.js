let GNum = Math.floor(Math.random() * 101);
N = 0;
function Guess() {
  const num = parseInt(document.getElementById("guess").value);
  if (num > GNum) {
    N++;
  } else if (num < GNum) {
    N++;
  } else if (num === GNum) {
    N++;
    GNum = Math.floor(Math.random() * 100);
    N = 0;
  }
}
