const LocalStorageData = localStorage.getItem("cartItems");
const orderItemList = document.querySelector("");

let data = JSON.parse(LocalStorageData);

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
    let forattedNum = itemPrice.toLocaleString();
    if(item.isChecked) sumItemPrice += itemPrice;


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
      <p class="cartBoxH4 item">${forattedNum}</p>
      <p class="cartBoxH5 item">${forattedNum}</p>
    `;
    itemsContainer.appendChild(newItem);
    
    // 각 체크박스의 상태를 확인하여 체크된 상품들만 가격을 더해서 sumItemPrice에 저장
    const checkbox = newItem.querySelector('.itemCkBtn');
    checkbox.addEventListener('change', function() {
      
      item.isChecked = checkbox.checked; // 체크박스 상태에 따라 isChecked 속성을 수정
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      sumItemPrice = calculateTotalPrice(cartItems); // 체크된 상품들의 총 가격 계산
      updateTotalPrice(sumItemPrice); // 총 가격 업데이트
      checkedcheckboxes();
    });
  });
  

  // 총 가격 업데이트
  updateTotalPrice(sumItemPrice);
  checkedcheckboxes();
  
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
      <p class="cartBoxH1 header sumItemPrice">${sumItemPrice.toLocaleString()}</p>
      <p class="cartBoxH2 header ">-</p>
      <p class="cartBoxH3 header delPrice">${discountPrice.toLocaleString()}</p>
      <p class="cartBoxH4 header ">=</p>
      <p class="cartBoxH5 header totalPrice">${(sumItemPrice - discountPrice).toLocaleString()}</p>
    `;
    totalPriceBox.appendChild(newTotalPrice);
  }

  function checkedcheckboxes(){
    const checkboxes = document.querySelectorAll('.itemCkBtn');
    const totalCheck = document.querySelector(".totalCkBtn");
    
    let boolList = [];
    for(let i of checkboxes) {
      boolList.push(i['checked']);
    }
    
    totalCheck.checked = !boolList.includes(false);

  }
}


/** 결제 예정금액 업데이트 */
function updateTotalPrice(sumItemPrice) {

  totalPriceBox.innerHTML = "";
  const newTotalPrice = document.createElement("div");
  newTotalPrice.classList.add("paymentBoxBody");
  newTotalPrice.innerHTML = `
    <p class="cartBoxH1 header sumItemPrice">${sumItemPrice.toLocaleString()}</p>
    <p class="cartBoxH2 header ">-</p>
    <p class="cartBoxH3 header delPrice">${discountPrice.toLocaleString()}</p>
    <p class="cartBoxH4 header ">=</p>
    <p class="cartBoxH5 header totalPrice">${(sumItemPrice - discountPrice).toLocaleString()}</p>
  `;
  totalPriceBox.appendChild(newTotalPrice);
}
