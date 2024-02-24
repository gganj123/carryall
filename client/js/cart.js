document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.querySelector(".totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");


  totalCheck.addEventListener("click", function() {
    const isChecked = totalCheck.checked;
    const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn');

    if(isChecked) {
      for(i = 0; i<checkboxes.length; i++){
        checkboxes[i].checked = true;//체크된 클래스가 chk의 값은 true로 준다.
      }
    }else{
      for(i = 0; i<checkboxes.length; i++){
        checkboxes[i].checked = false;//체크된 클래스가 chk의 값은 false로 준다.
      }
    }
  });

  btnDeleteAll.addEventListener("click", function() {
    deleteAllItems();
  });

  btnDeleteSelected.addEventListener("click", function() {
    deleteSelectedItems();
  });

  displayUserCartInfo();
});


function deleteAllItems() {
  localStorage.removeItem("cartItems");
  const itemsContainer = document.querySelector('.itemContainer');
  itemsContainer.innerHTML = "";
  const selectAllCheckbox = document.querySelector(".totalCkBtn");
  selectAllCheckbox.checked = false;
}

function deleteSelectedItems() {
  const itemsContainer = document.querySelector('.itemContainer');
  const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn:checked');
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (checkboxes.length === 0) {
    alert("삭제할 상품을 선택해주세요.");
    return;
  }

  // 선택된 항목을 제외한 새로운 배열 생성
  const updatedCartItems = cartItems.filter(item => !Array.from(checkboxes).some(checkbox => checkbox.value === item._id));

  // 새로운 배열을 로컬 스토리지에 저장
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  displayUserCartInfo()
  // 전체 선택 체크박스 해제
  const totalCheck = document.querySelector(".totalCkBtn");
  totalCheck.checked = false;
}

function displayUserCartInfo() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemsContainer = document.querySelector(".itemContainer");
  const totalPriceBox = document.querySelector(".totalPrice");

  let sumItemPrice = 0;
  let discountPrice = 0;
  let totalItemPrice = 0;
  
  itemsContainer.innerHTML = "";

  cartItems.forEach(item => {
    // 각 상품의 총 가격 계산
    const itemPrice = item.price * item.quantity;

    const newItem = document.createElement("div");
    newItem.classList.add("cartItem");
    newItem.innerHTML = `
      <input type="checkbox" class="itemCkBtn" value="${item._id}">
      <div class="cartBoxH1 item" style="display: flex;">
          <img src="${item.imageUrl}" alt="${item.name} 이미지" class="itemImg">
          <div class="item itemInfo">
              <p class="itemName">${item.name}</p>
              <p class="itemBrand">${item.brand}</p>
          </div>
      </div>
      <p class="cartBoxH2 item">${item.option}</p>
      <div class="cartBoxH3 quantityBox item">
        <span class="quantityMinus item"><button onclick="decreaseQuantity('${item._id}')">-</button></span>
        <input class="quantity item" type="number" value="${item.quantity}" min="1" max="99"></input>
        <span class="quantityPlus item"><button onclick="increaseQuantity('${item._id}')">+</button></span>
      </div>
      <p class="cartBoxH4 item">${item.price}</p>
      <p class="cartBoxH5 item">${item.totalPricePerItem}</p>
    `;
    itemsContainer.appendChild(newItem);

    // 상품이 선택되어 있다면 sumItemPrice에 가격을 더합니다.
    const checkbox = document.querySelector(`.itemCkBtn[value="${item._id}"]:checked`);
    if (checkbox) {
      sumItemPrice += itemPrice;
    }
  });
  
  totalPriceBox.innerHTML = "";
  totalItemPrice = sumItemPrice - discountPrice;
  const newTotalPrice = document.createElement("div");
  newTotalPrice.classList.add("paymentBoxBody");

  newTotalPrice.innerHTML = `
    <p class="cartBoxH1 header sumItemPrice">${sumItemPrice}</p>
    <p class="cartBoxH2 header ">-</p>
    <p class="cartBoxH3 header delPrice">${discountPrice}</p>
    <p class="cartBoxH4 header ">=</p>
    <p class="cartBoxH5 header totalPrice">${totalItemPrice}</p>
  `;

  totalPriceBox.appendChild(newTotalPrice);
}









function increaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
    if (item._id === itemId) {
      item.quantity += 1;
    }
    return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  displayUserCartInfo();
}

function decreaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
    if (item._id === itemId && item.quantity > 1) {
      item.quantity -= 1;
    }
    return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  displayUserCartInfo();
}