const inputName = document.getElementById("userName");
const inputPhone = document.getElementById("phoneNum");
const inputZipCode = document.getElementById("address01");
const inputAddress = document.getElementById("address02");
const inputAddressDetail = document.getElementById("address03");



// let phoneNumber = document.querySelector(".phone-number");
// let address = document.querySelector(".address");
// let orderNumber = document.querySelector(".order-number");
// let productname = document.querySelector(".product-name");
// let paymentamount = document.querySelector(".payment-amount");
// let btnHome = document.getElementById("btnHome");
// let btnOrder = document.getElementById("btnOrder");

const btnPayment = document.getElementById("btnPayment");

btnPayment.addEventListener("click", function() {
  postToServer();
});

function postToServer() {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let orderItems = JSON.parse(localStorage.getItem("orderItems"));
  let totalPrice = 0;

  orderItems.forEach(item => {
    totalPrice += (item.price * item.quantity);
  });


  const recipientInformation = {
    recipientName: inputName.value,
    recipientZipCode: inputZipCode.value,
    recipientAddress: inputAddress.value,
    recipientAddressDetail: inputAddressDetail.value,
    recipientTel: inputPhone.value
  };
  
  dataToSend = {
    "userId": loggedInUser.username,
    "totalPrice": totalPrice,
    "productInformation": JSON.parse(localStorage.getItem("orderItems")),
    "recipientInformation": recipientInformation
  }
  let orderResult = JSON.parse(localStorage.getItem("orderResult")) || [];
  
  
  // console.log(JSON.stringify(dataToSend));
  // alert(JSON.stringify(dataToSend));



  axios.post('/api/orders', dataToSend)
  .then(function (response) {
    console.log("주문이 성공적으로 처리되었습니다:", response.data);
    location.href='/orderResult';
    orderResult.push(response.data);
    localStorage.setItem("orderResult", JSON.stringify(orderResult)); 
    localStorage.removeItem("orderItems");
    drawItems([]);
  })
  .catch(function (error) {
    console.log("주문을 처리하는 도중 오류가 발생했습니다:" + error);
    alert("주문을 처리하는 도중 오류가 발생했습니다.");
  });
}

function getOrerItemsInfo() {
  let orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
  p_list = [];
  
  orderItems.forEach(item => { 
    axios.get('/api/products/cartInformation/' + item._id)
    .then(response => {
      // 성공했을 때
      data = response.data["data"]; // 상품 정보를 받아옴
      data.quantity = item.quantity; // 상품 정보에 수량 정보를 추가
      data.option = item.option; // 상품 정보에 옵션 정보를 추가
      // data.image = null;
      // data.name = null;
      p_list.push(data);

      localStorage.setItem("orderItems", JSON.stringify(p_list));
      drawItems(p_list);
      

    })
    .catch(error => {
      // 에러가 났을 때
      console.log(error);
    });
  });
}

function drawItems(orderItems) {
  const itemsContainer = document.querySelector(".itemContainer");
  itemsContainer.innerHTML = "";
  let sumItemPrice = 0;
  let discountPrice = 0;
  let sumTotalPrice = 0;


  orderItems.forEach(orderItem => {
    const itemPrice = orderItem.price * orderItem.quantity;
    sumItemPrice += itemPrice;
   
    const newItem = document.createElement("div");
    newItem.classList.add("orderItem");
    newItem.innerHTML = `
      <div class="cartBoxH1 item itemImgBox">
          <img src="${orderItem.image}" alt="${orderItem.name} 이미지" class="itemImg">
          <div class="item itemInfo">
            <p class="itemBrand">${orderItem.categoryName}</p>
            <p class="itemName">${orderItem.name}</p>
          </div>
      </div>
      <p class="cartBoxH2 item option">[옵션] : ${orderItem.option}</p>
      <div class="cartBoxH3 quantityBox item">
          <p class="quantity item">${orderItem.quantity}</p>
      </div>
      <p class="cartBoxH4 item">${(orderItem.price).toLocaleString()}원</p>
      <p class="cartBoxH5 item">${(itemPrice).toLocaleString()}원</p>
    `;
    itemsContainer.appendChild(newItem);
  });

  const orderSumItemPrice = document.getElementById("orderSumItemPrice");
  const orderDiscountPrice = document.getElementById("orderDiscountPrice");
  const orderTotalPrice = document.getElementById("orderTotalPrice");
  orderSumItemPrice.innerText = sumItemPrice.toLocaleString() + "원";
  orderDiscountPrice.innerText = discountPrice.toLocaleString() + "원";
  orderTotalPrice.innerText = (sumItemPrice - discountPrice).toLocaleString() + "원";
}

function getUserInfo(){
  axios.get('/api/mypage')
    .then(response => {
      const userData = response.data;
      // const { name, tel, zipCode, address, addressDetail } = userData;
      
      inputName.value = userData.name;
      inputPhone.value = userData.tel;
      inputZipCode.value = userData.zipCode;
      inputAddress.value = userData.address;
      inputAddressDetail.value = userData.addressDetail;
    })
    .catch(error => {
      alert("로그인이 필요한 기능입니다");
      location.href = "/loginMember";
    });
}

getOrerItemsInfo();
getUserInfo();
