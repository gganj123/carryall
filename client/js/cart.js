displayUserCartInfo1();
document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.getElementById("totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");
  const btnOrderSubmit = document.querySelector(".btnOrderSubmit");

  btnOrderSubmit.addEventListener("click", function() {
    addItemToOrder();
  });

  totalCheck.addEventListener("click", function() {
      // 로컬 스토리지에서 cartItems 배열 가져오기
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const isChecked = totalCheck.checked;
      const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn');
      // totalCheck 버튼이 체크되어 있으면 모든 체크박스를 체크하고, 아니면 모든 체크박스를 해제
      checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });

    // 모든 체크박스의 isChecked 속성을 업데이트하고, 로컬 스토리지에 저장
    cartItems.forEach(item => {
        item.isChecked = isChecked;
    });
  
      
      // 로컬 스토리지에 업데이트된 isChecked 속성 저장
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      drawItems(cartItems);    
  });

  btnDeleteSelected.addEventListener("click", function() {
    deleteSelectedItems();
  });

  btnDeleteAll.addEventListener("click", function() {
    deleteAllItems();
  });
});  

function displayUserCartInfo1() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // 상품ID, 수량, 옵션 정보를 담은 배열
  const itemsContainer = document.querySelector(".itemContainer");
  itemsContainer.innerHTML = "";
  let p_list = []; // 상품 정보를 담을 배열

  cartItems.forEach(item => { 
    axios.get('http://localhost:5001/api/products/cartInformation/' + item._id)
    .then(response => {
      // 성공했을 때
      data = response.data["data"]; // 상품 정보를 받아옴
      data.quantity = item.quantity; // 상품 정보에 수량 정보를 추가
      data.option = item.option; // 상품 정보에 옵션 정보를 추가
      data.isChecked = item.isChecked; // 상품 정보에 체크박스 정보를 추가
      console.log(data.option);
      // console.log(data);
      // console.log(item.option);
      p_list.push(data);

      // 모든 상품 정보를 받아온 후에 drawItems 함수 호출
      if (p_list.length === cartItems.length) {
        p_list.sort((a, b) => cartItems.findIndex(item => item._id === a._id) - cartItems.findIndex(item => item._id === b._id));
        
        localStorage.setItem("cartItems", JSON.stringify(p_list)); // 수정된 위치
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
  const totalPriceBox = document.querySelector(".totalPrice");

  itemsContainer.innerHTML = ""; // 이전에 그려진 아이템을 지웁니다.
  let sumItemPrice = 0;
  let discountPrice = 0;
  let totalItemPrice = 0;

  cartItems.forEach(cartItem => {
    const itemPrice = cartItem.price * cartItem.quantity;
    const cartItemprice = (cartItem.price).toLocaleString();
    const formattedNum = itemPrice.toLocaleString();
    if(cartItem.isChecked) sumItemPrice += itemPrice;


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
      <p class="cartBoxH4 item">${cartItemprice + " 원"}</p>
      <p class="cartBoxH5 item">${formattedNum + " 원"}</p>
    `;
    itemsContainer.appendChild(newItem);

    // 각 체크박스의 상태를 확인하여 체크된 상품들만 가격을 더해서 sumItemPrice에 저장
    const checkbox = newItem.querySelector(".itemCkBtn");
    checkbox.addEventListener("click", function() {

      cartItem.isChecked = checkbox.checked;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      sumItemPrice = calculateTotalPrice(cartItems); 
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
      <p class="cartBoxH1 header sumItemPrice">${sumItemPrice.toLocaleString() + " 원"}</p>
      <p class="cartBoxH2 header ">-</p>
      <p class="cartBoxH3 header delPrice">${discountPrice.toLocaleString() + " 원"}</p>
      <p class="cartBoxH4 header ">=</p>
      <p class="cartBoxH5 header totalPrice">${(sumItemPrice - discountPrice).toLocaleString() + " 원"}</p>
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

function deleteSelectedItems() {
  const itemsContainer = document.querySelector('.itemContainer');
  console.log("itemsContainer는 " + itemsContainer);
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // 선택된 체크박스 가져오기
  const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn:checked');

  if (checkboxes.length === 0) {
    alert("삭제할 상품을 선택해주세요.");
    return;
  }
  console.log("checkboxes.length의 길이는 : " + checkboxes.length);



  // 선택된 아이템만을 제외한 새로운 배열 생성
  const updatedCartItems = cartItems.filter(item => !Array.from(checkboxes).some(checkbox => checkbox.value === item._id));
  console.log("updatedCartItems는 : " + updatedCartItems);

  // 새로운 배열을 로컬 스토리지에 저장
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  // 화면에 다시 그리기
  drawItems(updatedCartItems);

  // 전체 선택 체크박스 해제
  const totalCheck = document.querySelector(".totalCkBtn");
  totalCheck.checked = false;
}

function deleteAllItems() {
  localStorage.removeItem("cartItems");
  const itemsContainer = document.querySelector('.itemContainer');
  itemsContainer.innerHTML = "";
  const selectAllCheckbox = document.querySelector(".totalCkBtn");
  selectAllCheckbox.checked = false;
}

function increaseQuantity(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const updatedCartItems = cartItems.map(item => {
    if (item._id === itemId) {
      if (item.quantity < 99) {
        item.quantity += 1;
        item.totalPricePerItem = item.price * item.quantity; // totalPricePerItem 갱신
      } else {
        alert('최대 주문 가능 수량은 99개 입니다.');
      }
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
      if (item.quantity > 0) {
        item.quantity -= 1;
        item.totalPricePerItem = item.price * item.quantity; // totalPricePerItem 갱신
      } else {
        alert('최소 주문 가능 수량은 1개 입니다.');
      }
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
}
    