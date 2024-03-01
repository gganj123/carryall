const btnPayment = document.querySelector(".btnPayment")
const itemsContainer = document.querySelector(".itemContainer");
sumItemPrice = 0; // 초기화
discountPrice = 0; // 초기화
totalItemPrice = 0; // 초기화

// 주문 완료 페이지 이동

displayUserOrderInfo();
updateTotalPrice();
getUserInfo();

btnPayment.addEventListener('click', async () => {
  alert('상품 구매가 완료되었습니다.');
  location.href = "/orderComplete";
  const date = new Date(1651401879369);
  axios.post('http://localhost:5001/api/orders', orderInfo)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

  localStorage.removeItem("orderItems");

})

displayUserOrderInfo();
updateTotalPrice();


function displayUserOrderInfo() {
  const orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
  const itemContainer = document.querySelector(".itemContainer");
  itemsContainer.innerHTML = "";
  p_list = [];

  orderItems.forEach(item => { 

    axios.get('/api/products/cartInformation/' + item._id)
    .then(response => {
      // 성공했을 때
      data = response.data["data"]; // 상품 정보를 받아옴
      data.quantity = item.quantity; // 상품 정보에 수량 정보를 추가
      data.option = item.option; // 상품 정보에 옵션 정보를 추가
      p_list.push(data);

      // 모든 상품 정보를 받아온 후에 drawItems 함수 호출
      if (p_list.length === orderItems.length) {
        p_list.sort((a, b) => orderItems.findIndex(item => item._id === a._id) - orderItems.findIndex(item => item._id === b._id));
        
        localStorage.setItem("orderItems", JSON.stringify(p_list)); // 수정된 위치
        drawItems(p_list);
      }
    })
    .catch(error => {
      // 에러가 났을 때
      console.log(error);
    });
  });
}

function drawItems(orderItems) {
  const itemsContainer = document.querySelector(".itemContainer");
  const totalPriceBox = document.querySelector(".totalPrice");
  itemsContainer.innerHTML = ""; // 이전에 그려진 아이템을 지웁니다.


  orderItems.forEach(orderItem => {
    const itemPrice = orderItem.price * orderItem.quantity;
    sumItemPrice = sumItemPrice + itemPrice;

    const newItem = document.createElement("div");
    newItem.classList.add("orderItem");
    newItem.innerHTML = `
      <div class="cartBoxH1 item" style="display: flex;">
          <img src="${orderItem.image}" alt="${orderItem.name} 이미지" class="itemImg">
          <div class="item itemInfo">
              <p class="itemName">${orderItem.name}</p>
              <p class="itemBrand">${orderItem.brand}</p>
          </div>
      </div>
      <p class="cartBoxH2 item">${orderItem.option}</p>
      <div class="cartBoxH3 quantityBox item">
          <p class="quantity item">${orderItem.quantity}</p>
      </div>
      <p class="cartBoxH4 item">${(orderItem.price).toLocaleString()}원</p>
      <p class="cartBoxH5 item">${(itemPrice).toLocaleString()}원</p>
    `;
    itemsContainer.appendChild(newItem);
  });

  // 총 가격 계산
  totalItemPrice = sumItemPrice - discountPrice;

  // 업데이트된 가격 정보로 UI 업데이트
  updateTotalPrice();
}

function updateTotalPrice() {
  const orderSumItemPrice = document.getElementById("orderSumItemPrice");
  const orderDiscountPrice = document.getElementById("orderDiscountPrice");
  const orderTotalItemPrice = document.getElementById("orderTotalPrice");

  orderSumItemPrice.innerText = sumItemPrice.toLocaleString() + "원";
  orderDiscountPrice.innerText = discountPrice.toLocaleString() + "원";
  orderTotalItemPrice.innerText = totalItemPrice.toLocaleString() + "원";
}

/**user 정보를 받아오는 함수 */

function updateUserInfo(user) {
  document.getElementById("userName").value = user.name;
  document.getElementById("phoneNum").value = user.tel;
  document.getElementById("address01").value = user.zipCode;
  document.getElementById("address02").value = user.address;
  document.getElementById("address03").value = user.addressDetail;
}

function getUserInfo() {
  axios.get('/api/mypage')
    .then(response => {
      const userData = response.data;
      updateUserInfo(userData);
    })
    .catch(error => {
      console.log('Error fetching user data:', error);
    });
}

