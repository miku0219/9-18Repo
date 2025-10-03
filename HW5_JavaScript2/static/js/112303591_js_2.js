const SelectAll = document.getElementById("selectAll");
const CheckBoxes = document.querySelectorAll(".item");

function CheckAll(SelectAll) {
  CheckBoxes.forEach((CheckBox) => (CheckBox.checked = SelectAll.checked));
}

function updateCheckAll() {
  const checkAll = document.getElementById("selectAll");
  const items = document.getElementsByClassName("item");
  let allChecked = true;
  for (let i = 0; i < items.length; i++) {
    if (!items[i].checked) {
      allChecked = false;
      break;
    }
  }
  checkAll.checked = allChecked;
}

function increase(inputID, pID) {
  const input = document.getElementById(inputID);
  const Have = document.getElementById(pID);
  let num = parseInt(Have.textContent);
  let value = parseInt(input.value) || 0;
  if (input.value < num && input.value >= 1) {
    input.value = value + 1;
  } else {
    input.value = num;
  }
}

function decrease(inputID, pID) {
  const input = document.getElementById(inputID);
  const Have = document.getElementById(pID);
  let num = parseInt(Have.textContent);
  let value = parseInt(input.value) || 0;
  if (input.value > 1 && input.value <= num) {
    input.value = value - 1;
  } else {
    input.value = 1;
  }
}

function checkEnter(event, inputElement, pID) {
  const Have = document.getElementById(pID);
  let num = parseInt(Have.textContent);
  if (event.key === "Enter") {
    let value = parseInt(inputElement.value);
    if (isNaN(value) || value < 1 || value > num) {
      inputElement.value = 1;
    }
  }
}
