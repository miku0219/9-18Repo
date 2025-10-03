const Add = document.getElementById("add");
const Cut = document.getElementById("cut");
const Quantity = document.getElementById("quantity");

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
