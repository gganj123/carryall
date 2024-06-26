document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.querySelector(".totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");
  const btnOrderSubmit = document.querySelector(".btnOrderSubmit");

  btnOrderSubmit.addEventListener("click", function() {
    // if(로그인상태 == 0){
    //   alert('로그인 페이지로 이동합니다.')
    //   location.href = '로그인페이지'
    // } 
    // else {//로그인 되어 있는 상태면

    // }
    addItemToOrder();
  });




  totalCheck.addEventListener("click", function() {
    // 로컬 스토리지에서 cartItems 배열 가져오기
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
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
  
    displayUserCartInfo();
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
  if(로그인상태 == 0){
    localStorage.removeItem("cartItems");
    const itemsContainer = document.querySelector('.itemContainer');
    itemsContainer.innerHTML = "";
    const selectAllCheckbox = document.querySelector(".totalCkBtn");
    selectAllCheckbox.checked = false;
  } 
  else {//로그인 되어 있는 상태면
   
  }

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
  // if(로그인상태 == 0){
    
    
  // } 
  // else {//로그인 되어 있는 상태면
   
  // }
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
      <p class="cartBoxH1 header sumItemPrice">${sumItemPrice.toLocaleString() + "원"}</p>
      <p class="cartBoxH2 header ">-</p>
      <p class="cartBoxH3 header delPrice">${discountPrice.toLocaleString() + "원"}</p>
      <p class="cartBoxH4 header ">=</p>
      <p class="cartBoxH5 header totalPrice">${(sumItemPrice - discountPrice).toLocaleString() + "원"}</p>
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

function increaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const updatedCartItems = cartItems.map(item => {
    if (item._id === itemId) {
      
      if (item.quantity < 100) {
        item.quantity += 1;
        item.totalPricePerItem = item.price * item.quantity; // totalPricePerItem 갱신
      } else {
      alert('수량은 1 이상 99 이하여야 합니다.');
      }
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
      if (item.quantity > 0) {
        item.quantity -= 1;
        item.totalPricePerItem = item.price * item.quantity; // totalPricePerItem 갱신
      } else {
      alert('수량은 1 이상 99 이하여야 합니다.');
      }
    }
    return item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  displayUserCartInfo();
}

function addItemToOrder() {
  // 로컬 스토리지에서 저장된 cartItems 데이터 가져오기, 없으면 빈 배열로 초기화
  // 로컬 스토리지에서 저장된 orderItems 데이터 가져오기, 없으면 빈 배열로 초기화
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
        imageUrl: checkedItem.imageUrl,
        name: checkedItem.name,
        brand: checkedItem.brand,
        option: checkedItem.option,
        quantity: checkedItem.quantity,
        price: checkedItem.price,
        totalPricePerItem: checkedItem.quantity * checkedItem.price
      });
    }
  });
    
  // orderItems를 로컬 스토리지에 다시 저장
  localStorage.setItem("orderItems", JSON.stringify(orderItems));
}
    
    