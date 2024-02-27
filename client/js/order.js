const btnPayment = document.querySelector(".btnPayment")

btnPayment.addEventListener('click', () => {
  alert('상품 구매가 완료되었습니다.');
})

displayUserOrderInfo();
updateTotalPrice();

// isChecked 값이 true인 배열 받기
function displayUserOrderInfo() {
  const orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];

  const itemContainer = document.querySelector(".itemContainer");


  orderItems.forEach(item => {
    const newItem = document.createElement("div");
    newItem.classList.add("orderItem");
    newItem.innerHTML = `
      <div class="cartBoxH1 item" style="display: flex;">
          <img src="${item.imageUrl}" alt="${item.name} 이미지" class="itemImg">
          <div class="item itemInfo">
              <p class="itemName">${item.name}</p>
              <p class="itemBrand">${item.brand}</p>
          </div>
      </div>
      <p class="cartBoxH2 item">${item.option}</p>
      <div class="cartBoxH3 quantityBox item">
          <p class="quantity item">${item.quantity}</p>
      </div>
      <p class="cartBoxH4 item">${item.price}</p>
      <p class="cartBoxH5 item">${item.totalPricePerItem}</p>
    `;
    itemContainer.appendChild(newItem);
  });
}


/** 결제 예정금액 업데이트 */
function updateTotalPrice(sumItemPrice) {
  const orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
  const totalPriceBox = document.querySelector(".totalPriceBox");
  let sumOrderItemPrice = orderItems.reduce((sum, item) => sum + item.totalPricePerItem, 0);
  let discountPrice = 0;

  const newTotalPrice = document.createElement("div");
  newTotalPrice.classList.add("totalBox");
  newTotalPrice.innerHTML = `
    <p class="cartBoxH1 header sumItemPrice">${sumOrderItemPrice.toLocaleString() + "원"}</p>
    <p class="cartBoxH2 header ">-</p>
    <p class="cartBoxH3 header delPrice">${discountPrice.toLocaleString() + "원"}</p>
    <p class="cartBoxH4 header ">=</p>
    <p class="cartBoxH5 header totalPrice">${(sumOrderItemPrice - discountPrice).toLocaleString() + "원"}</p>
  `;
  totalPriceBox.appendChild(newTotalPrice);
}
