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
  const totalCheck = document.getElementById("totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
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

  if(!cartItems.length) {
    itemsContainer.innerHTML = `<div class="noCart">상품이 없습니다.</div>`;
  }

  cartItems.forEach(item => {
      axios.get('/api/products/cartInformation/' + item._id)
          .then(response => {
              const data = response.data["data"];
              data.quantity = item.quantity;
              data.option = item.option;
              data.isChecked = item.isChecked;
              updateLocalStorageAndDrawItems(cartItems, data);
          })
          .catch(error => {
              console.error(error);
              alert("상품 정보를 가져오는 도중 오류가 발생했습니다." + error);
          });
  });
}

function updateLocalStorageAndDrawItems(cartItems, data) {
  const index = cartItems.findIndex(item => item._id === data._id && item.option === data.option);
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
      const itemPrice = (cartItem.price || 0) * cartItem.quantity;
      const cartItemPrice = (cartItem.price || 0).toLocaleString();
      const formattedNum = itemPrice.toLocaleString();
      if (cartItem.isChecked) sumItemPrice += itemPrice;

      const newItem = document.createElement("div");
      newItem.classList.add("cartItem");
      newItem.innerHTML = ` 
          <input type="checkbox" class="itemCkBtn" value="${cartItem._id}, ${cartItem.option}" ${cartItem.isChecked ? 'checked' : ''}>
          <div class="cartBoxH1 item itemImgBox">
              <a href="/practice/?id=${cartItem._id}" class="itemImg"><img src="${cartItem.image}" alt="${cartItem.name} 이미지"></a>
              <div class="item itemInfo">
                <p class="itemBrand">${cartItem.categoryName}</p>
                <p class="itemName">${cartItem.name}</p>
              </div>
          </div>
          <p class="cartBoxH2 item option">[옵션] : ${cartItem.option}</p>
          <div class="cartBoxH3 quantityBox item">
              <span class="quantityMinus item"><button onclick="decreaseQuantity('${cartItem._id}', '${cartItem.option}')">-</button></span>
              <input class="quantity item" type="number" value="${cartItem.quantity}" min="1" max="99"></input>
              <span class="quantityPlus item"><button onclick="increaseQuantity('${cartItem._id}', '${cartItem.option}')">+</button></span>
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
              <p class="cartBoxH1 cartHeader sumItemPrice">${sumItemPrice.toLocaleString() + " 원"}</p>
              <p class="cartBoxH2 cartHeader ">-</p>
              <p class="cartBoxH3 cartHeader delPrice">0 원</p>
              <p class="cartBoxH4 cartHeader ">=</p>
              <p class="cartBoxH5 cartHeader totalPrice">${sumItemPrice.toLocaleString() + " 원"}</p>
          </div>
      `;
  }

  function updateCheckboxesStatus() {
      const checkboxes = document.querySelectorAll('.itemCkBtn');
      const totalCheck = document.getElementById("totalCkBtn");
      const areAllChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
      totalCheck.checked = areAllChecked;
  }
  const quantityInputs = document.querySelectorAll('.quantity');
  quantityInputs.forEach(input => {
      input.addEventListener('change', function() {
          const itemId = input.closest('.cartItem').querySelector('.itemCkBtn').value;
          const newQuantity = parseInt(input.value);
          if (newQuantity < 1 || newQuantity > 99 || isNaN(newQuantity)) {
              alert('수량은 1부터 99 사이의 정수여야 합니다.');
              input.value = cartItems.find(item => item._id === itemId).quantity; // 변경된 수량이 유효하지 않으면 이전 수량으로 되돌림
          } else {
              updateQuantity(itemId, newQuantity);
          }
      });
  });
}

function deleteSelectedItems() {
  const itemsContainer = document.querySelector(".itemContainer");
  const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn:checked');
  if (checkboxes.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
  }
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.filter(item => !Array.from(checkboxes).some(checkbox => checkbox.value === (item._id + ', ' + item.option)));
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}

function deleteAllItems() {
  const itemsContainer = document.querySelector(".itemContainer");
  localStorage.removeItem("cartItems");
  itemsContainer.innerHTML = "";
  const totalCheck = document.getElementById("totalCkBtn");
  totalCheck.checked = false;
}

function increaseQuantity(itemId, option) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId && item.option === option) {
        if(item.quantity < 99){
          item.quantity++;
        }else{
          alert("최대 수량은 99개 입니다.");
          item.quantity = 99;
      }
    }
    return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}

function decreaseQuantity(itemId, option) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId && item.option === option) {
        if(item.quantity > 1){
          item.quantity--;

        }else {
          alert("최소 수량은 1개 입니다.");
          item.quantity = 1; 
      }
      }
      return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}

function addItemToOrder() {
  axios.get('/api/mypage')
  .then(response => {
    const user = response.data;
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      location.href = "/loginmember";
      return;
    }
    // 로컬 스토리지에서 저장된 cartItems 데이터 가져오기, 없으면 빈 배열로 초기화
    // orderItems 데이터 빈 배열로 초기화
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let orderItems = [];
    // isChecked 값이 true인 아이템만 필터링
    let checkedItems = cartItems.filter(item => item.isChecked);
    if(checkedItems.length){
        // 중복된 아이템이 있는지 확인하고 없으면 orderItems에 추가
    checkedItems.forEach(checkedItem => {
      let isExist = orderItems.some((orderItem) => orderItem._id === checkedItem._id && orderItem.option === checkedItem.option);

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
    if(cartItems = []) localStorage.removeItem("cartItems");
  
    // orderItems를 로컬 스토리지에 다시 저장
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
    drawItems(uncheckedItems)
    location.href = "/order";
    }else{
      alert("주문할 상품을 선택해주세요.");
      return;
    }

  }).catch(error => {
    console.error(error);
    alert("로그인이 필요한 서비스입니다.");
    location.href = "/loginmember";
  });
}

function updateQuantity(itemId, newQuantity) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId) {
          item.quantity = newQuantity;
      }
      return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  drawItems(updatedCartItems);
}