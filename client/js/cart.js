document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.getElementById("totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");
  const btnOrderSubmit = document.querySelector(".btnOrderSubmit");

  btnOrderSubmit.addEventListener("click", addItemToOrder);
  totalCheck.addEventListener("click", toggleAllCheckboxes);
  btnDeleteAll.addEventListener("click", deleteAllItems);
  btnDeleteSelected.addEventListener("click", deleteSelectedItems);
  displayUserCartInfo();
});

function toggleAllCheckboxes() {
  const isChecked = totalCheck.checked;
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn');

  checkboxes.forEach(checkbox => {
      checkbox.checked = isChecked;
  });

  cartItems.forEach(item => {
      item.isChecked = isChecked;
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  drawItems(cartItems);
}

function displayUserCartInfo() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemsContainer = document.querySelector(".itemContainer");

  itemsContainer.innerHTML = "";

  cartItems.forEach(item => {
      axios.get('http://localhost:5001/api/products/cartInformation/' + item._id)
          .then(response => {
              const data = response.data["data"];
              data.quantity = item.quantity;
              data.option = item.option;
              data.isChecked = item.isChecked;
              updateLocalStorageAndDrawItems(cartItems, data);
          })
          .catch(error => {
              console.error(error);
          });
  });
}

function updateLocalStorageAndDrawItems(cartItems, data) {
  const index = cartItems.findIndex(item => item._id === data._id);
  if (index !== -1) {
      cartItems[index] = data;
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  drawItems(cartItems);
}

function drawItems(cartItems) {
  const itemsContainer = document.querySelector(".itemContainer");
  const totalPriceBox = document.querySelector(".totalPrice");
  let sumItemPrice = 0;

  itemsContainer.innerHTML = "";
  
  cartItems.forEach(cartItem => {
      const itemPrice = cartItem.price * cartItem.quantity;
      const cartItemPrice = (cartItem.price).toLocaleString();
      const formattedNum = itemPrice.toLocaleString();
      if (cartItem.isChecked) sumItemPrice += itemPrice;

      const newItem = document.createElement("div");
      newItem.classList.add("cartItem");
      newItem.innerHTML = `
          <input type="checkbox" class="itemCkBtn" value="${cartItem._id}" ${cartItem.isChecked ? 'checked' : ''}>
          <div class="cartBoxH1 item" style="display: flex;">
              <img src="${cartItem.image}" alt="${cartItem.name} 이미지" class="itemImg">
              <div class="item itemInfo">
                  <p class="itemName">${cartItem.name}</p>
                  <p class="itemBrand">${cartItem.brand}</p>
              </div>
          </div>
          <p class="cartBoxH2 item">${cartItem.option}</p>
          <div class="cartBoxH3 quantityBox item">
              <span class="quantityMinus item"><button onclick="decreaseQuantity('${cartItem._id}')">-</button></span>
              <input class="quantity item" type="number" value="${cartItem.quantity}" min="1" max="99"></input>
              <span class="quantityPlus item"><button onclick="increaseQuantity('${cartItem._id}')">+</button></span>
          </div>
          <p class="cartBoxH4 item">${cartItemPrice + " 원"}</p>
          <p class="cartBoxH5 item">${formattedNum + " 원"}</p>
      `;
      itemsContainer.appendChild(newItem);

      newItem.querySelector(".itemCkBtn").addEventListener("click", function() {
          cartItem.isChecked = this.checked;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          sumItemPrice = calculateTotalPrice(cartItems);
          updateTotalPrice(sumItemPrice);
          updateCheckboxesStatus();
      });
  });

  updateTotalPrice(sumItemPrice);
  updateCheckboxesStatus();

  function calculateTotalPrice(items) {
      return items.reduce((total, item) => {
          return item.isChecked ? total + (item.price * item.quantity) : total;
      }, 0);
  }

  function updateTotalPrice(sumItemPrice) {
      totalPriceBox.innerHTML = `
          <div class="paymentBoxBody">
              <p class="cartBoxH1 header sumItemPrice">${sumItemPrice.toLocaleString() + " 원"}</p>
              <p class="cartBoxH2 header ">-</p>
              <p class="cartBoxH3 header delPrice">0 원</p>
              <p class="cartBoxH4 header ">=</p>
              <p class="cartBoxH5 header totalPrice">${sumItemPrice.toLocaleString() + " 원"}</p>
          </div>
      `;
  }

  function updateCheckboxesStatus() {
      const checkboxes = document.querySelectorAll('.itemCkBtn');
      const totalCheck = document.getElementById("totalCkBtn");
      const areAllChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
      totalCheck.checked = areAllChecked;
  }
}

function deleteSelectedItems() {
  const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn:checked');
  if (checkboxes.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
  }
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.filter(item => !Array.from(checkboxes).some(checkbox => checkbox.value === item._id));
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}

function deleteAllItems() {
  localStorage.removeItem("cartItems");
  itemsContainer.innerHTML = "";
  const totalCheck = document.getElementById("totalCkBtn");
  totalCheck.checked = false;
}

function increaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId && item.quantity < 99) {
          item.quantity++;
      }
      return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}

function decreaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId && item.quantity > 1) {
          item.quantity--;
      }
      return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}

function addItemToOrder() {
  // 로컬 스토리지에서 저장된 cartItems 데이터 가져오기, 없으면 빈 배열로 초기화
  // orderItems 데이터 빈 배열로 초기화
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let orderItems = [];
  // isChecked 값이 true인 아이템만 필터링
  let checkedItems = cartItems.filter(item => item.isChecked);


  // 중복된 아이템이 있는지 확인하고 없으면 orderItems에 추가
  checkedItems.forEach(checkedItem => {
    let isExist = orderItems.some(orderItem => orderItem._id === checkedItem._id);
    if (!isExist) {
      // 중복된 아이템이 없으면 orderItems에 추가
      orderItems.push({
        _id: checkedItem._id,
        option: checkedItem.option,
        quantity: checkedItem.quantity,
      });
    }
  });

  let uncheckedItems = cartItems.filter(item => !item.isChecked);
  localStorage.setItem("cartItems", JSON.stringify(uncheckedItems));

  // orderItems를 로컬 스토리지에 다시 저장
  localStorage.setItem("orderItems", JSON.stringify(orderItems));
  drawItems(uncheckedItems)
}