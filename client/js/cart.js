document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.querySelector(".totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");

  // 로컬 스토리지에서 cartItems 배열 가져오기
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  totalCheck.addEventListener("click", function() {
    const isChecked = totalCheck.checked;
    const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn');
  
    for(let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = isChecked;
  
      // 각 아이템의 isChecked 속성 업데이트
      const itemId = checkboxes[i].value;
      const itemIndex = cartItems.findIndex(item => item._id === itemId);
      if (itemIndex !== -1) {
        cartItems[itemIndex].isChecked = isChecked;
      }
    }
  

    
    // 로컬 스토리지에 업데이트된 isChecked 속성 저장
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    // 각 상품의 체크 여부에 따라 총 가격 계산
    const sumItemPrice = calculateTotalPrice(cartItems);
    updateTotalPrice(sumItemPrice);
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
  
  itemsContainer.innerHTML = "";
  let sumItemPrice = 0;
  let discountPrice = 0;
  let totalItemPrice = 0;

  cartItems.forEach(item => {
    // 각 상품의 총 가격 계산
    const itemPrice = item.price * item.quantity;
    sumItemPrice += itemPrice;

    const newItem = document.createElement("div");
    newItem.classList.add("cartItem");
    newItem.innerHTML = `
      <input type="checkbox" class="itemCkBtn" value="${item._id}" ${item.isChecked ? 'checked' : ''}>
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
      <p class="cartBoxH5 item">${itemPrice}</p>
    `;
    itemsContainer.appendChild(newItem);

    // 아이템 수량 변경 시 totalPricePerItem 갱신
    const quantityInput = newItem.querySelector('.quantity');
    quantityInput.addEventListener('change', function() {
      const newQuantity = parseInt(quantityInput.value);
      if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 99) {
        item.quantity = newQuantity;
        item.totalPricePerItem = item.price * newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayUserCartInfo(); // 화면 갱신
      } else {
        alert('수량은 1 이상 99 이하여야 합니다.');
      }
    });

    // 각 체크박스의 상태를 확인하여 체크된 상품들만 가격을 더해서 sumItemPrice에 저장
    const checkbox = newItem.querySelector('.itemCkBtn');
    checkbox.addEventListener('change', function() {
      item.isChecked = checkbox.checked; // 체크박스 상태에 따라 isChecked 속성을 수정
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      sumItemPrice = calculateTotalPrice(cartItems); // 체크된 상품들의 총 가격 계산
      updateTotalPrice(sumItemPrice); // 총 가격 업데이트
    });
  });
  
  // 총 가격 업데이트
  totalItemPrice = sumItemPrice - discountPrice;
  updateTotalPrice(sumItemPrice);

  function calculateTotalPrice(items) {
    return items.reduce((total, item) => {
      if (item.isChecked) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  }

  function updateTotalPrice(sumItemPrice) {

    totalPriceBox.innerHTML = "";
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
}

function increaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
    if (item._id === itemId) {
      item.quantity += 1;
      item.totalPricePerItem = item.price * item.quantity; // totalPricePerItem 갱신
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
      item.totalPricePerItem = item.price * item.quantity; // totalPricePerItem 갱신
    }
    return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  displayUserCartInfo();
}
