document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.querySelector(".totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");
  const btnOrderSubmit = document.querySelector(".btnOrderSubmit");

  btnOrderSubmit.addEventListener("click", function() {
    addItemToOrder();
  });

  displayUserCartInfo1();

});  

function displayUserCartInfo1() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemsContainer = document.querySelector(".itemContainer");
  itemsContainer.innerHTML = "";
  let p_list = [];

  cartItems.forEach(item => { 
    axios.get('http://localhost:5001/api/products/' + item._id)
    .then(response => {
      // 성공했을 때
      data = response.data["data"];
      data["count"] = item.quantity;
      console.log(data);
      console.log(item.option);
      p_list.push(data);
      localStorage.setItem("cartItems", JSON.stringify(p_list));

      // 모든 상품 정보를 받아온 후에 drawItems 함수 호출
      if (p_list.length === cartItems.length) {
        drawItems(p_list);
      }

    })
    .catch(error => {
      // 에러가 났을 때
      console.log(error);
    });
  });
}

function drawItems(cartItems) {
  const itemsContainer = document.querySelector(".itemContainer");
  itemsContainer.innerHTML = ""; // 이전에 그려진 아이템을 지웁니다.

  cartItems.forEach(cartItem => {
    const itemPrice = cartItem.price * cartItem.count;
    const formattedNum = itemPrice.toLocaleString();

    const newItem = document.createElement("div");
    newItem.classList.add("cartItem");
    newItem.innerHTML = `
      <input type="checkbox" class="itemCkBtn" value="${cartItem._id}">
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
          <input class="quantity item" type="number" value="${cartItem.count}" min="1" max="99"></input>
          <span class="quantityPlus item"><button onclick="increaseQuantity('${cartItem._id}')">+</button></span>
      </div>
      <p class="cartBoxH4 item">${cartItem.price}</p>
      <p class="cartBoxH5 item">${formattedNum}</p>
    `;
    itemsContainer.appendChild(newItem);
  });
}


function increaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // 해당 상품의 수량을 증가시킵니다.
  cartItems.forEach(item => {
    if (item._id === itemId) {
      item.count++; // 수량 증가
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayUserCartInfo1();
}

function decreaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // 해당 상품의 수량을 감소시킵니다. 단, 최소 수량은 1로 제한합니다.
  cartItems.forEach(item => {
    if (item._id === itemId) {
      if (item.count > 1) {
        item.count--; // 수량 감소
      }
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayUserCartInfo1();
}