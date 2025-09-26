document.write(
  '<input type = "text" id = "display" style = "width: 300px; height: 30px; margin: 5px; font-size: 30px" value = ""><br>'
);

for (let i = 0; i <= 9; i++) {
  document.write(
    '<input type = "button" onclick = "btn(' +
      i +
      ')" style = " margin: 5px; width: 40px; height: 40px; font-size: 30px" value = "' +
      i +
      '">'
  );
  if (i % 3 === 2) {
    document.write("<br>");
  }
}

document.write(
  `<input type = "button" onclick = "clr('')" style = " margin: 5px; width: 90px; height: 40px; font-size: 30px" value = "Clear"><br>`
);

const OP = ["+", "-", "*", "/", "(", ")", "="];
for (let i = 0; i < 6; i++) {
  const opr = OP[i];
  document.write(
    `<input type = "button" onclick = "ops('` +
      opr +
      `')" style = " margin: 5px; width: 40px; height: 40px; font-size: 30px" value = "` +
      opr +
      `">`
  );
}
document.write(
  `<input type = "button" onclick = "cal('` +
    OP[6] +
    `')" style = " margin: 5px; width: 40px; height: 40px; font-size: 30px" value = "` +
    OP[6] +
    `">`
);

function btn(value) {
  display = document.getElementById("display");
  display.value += value;
}
function clr(value) {
  display = document.getElementById("display");
  display.value = "";
}

function ops(value) {
  display = document.getElementById("display");
  display.value += value;
}

function cal(value) {
  display = document.getElementById("display");
  alert(display.value + "=" + eval(display.value));
  display.value = eval(display.value);
}
