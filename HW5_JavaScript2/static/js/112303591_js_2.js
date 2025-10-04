//全選
function CheckAll() {
  const SelectAll = document.getElementById("selectAll").checked;
  const CheckBoxes = document.querySelectorAll(".item");
  CheckBoxes.forEach((CheckBox) => (CheckBox.checked = SelectAll));
  calculateTotal();
}

//單項
function updateCheckAll() {
  const items = document.querySelectorAll(".item");
  const all = Array.from(items).every((cb) => cb.checked);
  document.getElementById("selectAll").checked = all;
  calculateTotal();
}

//變更數量
function changeQty(button, change) {
  const product = button.closest(".product");
  const input = product.querySelector(".num");
  const stock = parseInt(product.querySelector(".stock").innerText);
  let val = parseInt(input.value) || 1;

  if (stock >= 1) {
    if (change === 1 && val < stock) val++;
    else if (change === -1 && val > 1) val--;
  } else {
    val = 0;
  }

  input.value = val;
  updateSubtotal(product);
  calculateTotal();
}

//計算總額
function calculateTotal() {
  let total = 0;
  const products = document.querySelectorAll(".product");
  products.forEach((p) => {
    const checked = p.querySelector(".item").checked;
    const subtotal = parseInt(p.querySelector(".subtotal").innerText) || 0;
    if (checked) total += subtotal;
  });
  document.getElementById("total").innerText = total;
}

//blur 時驗證數量是否正確
function validateQty(input) {
  const product = input.closest(".product");
  const stock = parseInt(product.querySelector(".stock").innerText);
  let val = parseInt(input.value);

  if (isNaN(val) || val < 1) val = 1;
  if (val > stock) val = stock;

  input.value = val;
  updateSubtotal(product);
  calculateTotal();
}

//更新單項小計
function updateSubtotal(product) {
  const price = parseInt(product.querySelector(".price").innerText);
  const qty = parseInt(product.querySelector(".num").value);
  product.querySelector(".subtotal").innerText = price * qty;
}

//結帳邏輯
function checkout() {
  const total = parseInt(document.getElementById("total").innerText);
  if (total <= 0) return;

  let message = "感謝您的購買，您購買的產品如下：\n";
  const products = document.querySelectorAll(".product");

  products.forEach((p) => {
    const checked = p.querySelector(".item").checked;
    if (!checked) return;

    const name = p.querySelector("td:nth-child(2)").innerText;
    const qty = parseInt(p.querySelector(".num").value);
    const stockElem = p.querySelector(".stock");
    let stock = parseInt(stockElem.innerText);

    // 顯示資訊
    message += name + "：" + qty + "件\n";

    // 更新庫存
    stock -= qty;
    if (stock < 0) stock = 0;
    stockElem.innerText = stock;

    // 重設數量欄位
    const input = p.querySelector(".num");
    if (stock === 0) {
      input.value = 0;
    } else {
      input.value = 1;
    }

    updateSubtotal(p);
    p.querySelector(".item").checked = false;
  });

  document.getElementById("selectAll").checked = false;
  calculateTotal();
  alert(message + "總金額：$" + total);
}

//初始化時更新總計
window.onload = () => {
  document.querySelectorAll(".product").forEach((p) => updateSubtotal(p));
  calculateTotal();
};
