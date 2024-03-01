const orderEditItems = JSON.parse(localStorage.getItem("orderEdit")) || [];
const itemData = orderEditItems[0].productInformation; // 상품 정보만 뽑은거
const userData = orderEditItems[0].recipientInformation; // 유저 정보만 뽑은거
//itemData로 새로운 로컬 스토리지에 저장하기
// const editedOrderItemsInfo = localStorage.getItem("editedOrderItemsInfo") || [];
// editedOrderItemsInfo.push(itemData);
// localStorage.setItem("editedOrderItemsInfo", JSON.stringify(editedOrderItemsInfo));


const userId = userData.userId; // 유저 아이디
const orderNumber = orderEditItems[0]._id; // 주문번호
const totalPrice = orderEditItems[0].totalPrice; // 총 가격

const orderName = document.getElementById("name");
const orderTel = document.getElementById("phone");
const orderZipcode = document.getElementById("zipcode");
const orderAddress = document.getElementById("address");
const orderAddressDetail = document.getElementById("addressDetail");

// 주문자 입력한 정보 붙여넣기
orderName.value = userData.recipientName;
orderTel.value = userData.recipientTel;
orderZipcode.value = userData.recipientZipCode;
orderAddress.value = userData.recipientAddress;
orderAddressDetail.value = userData.recipientAddressDetail;

btnCancel = document.getElementById("btnCancel");
btnCanCelOrder = document.getElementById("btnCanCelOrder");
btnEditOrder = document.getElementById("btnEditOrder");

btnCancel.addEventListener("click", backToMypage);
btnCanCelOrder.addEventListener("click", deleteAllItems);
btnEditOrder.addEventListener("click", submitEditInfo);

drawOrderItem(itemData);


/** 로컬 데이터 기반으로 화면 그려주는 함수 */
function drawOrderItem(itemData) {
  const itemContainer = document.querySelector(".itemContainer");
  
  itemContainer.innerHTML = "";

  itemData.forEach(item => {

    const itemPrice = (item.price || 0) * item.quantity;
    const orderItemPrice = (item.price || 0).toLocaleString();
    const formattedNum = itemPrice.toLocaleString();



    const newOrderItem = document.createElement("div");
    newOrderItem.classList.add("order-item");
    newOrderItem.innerHTML = `
    <div class="cartBoxH1 item" style="display: flex;">
        <img src="${item.image}" alt="${item.name} 이미지" class="itemImg">
        <div class="item itemInfo">
            <p class="itemName">${item.name}</p>
            <p class="itemBrand">${item.categoryName}</p>
        </div>
    </div>
    <p class="cartBoxH2 item">${item.option}</p>
    <div class="cartBoxH3 quantityBox item">
      <p class="quantity item">${item.quantity}</p>        
    </div>
    <p class="cartBoxH4 item">${orderItemPrice + " 원"}</p>
    <p class="cartBoxH5 item">${formattedNum + " 원"}</p>
    `;
    itemContainer.appendChild(newOrderItem);
  });
}



/**주문 자체를 삭제하는 함수 */
function deleteAllItems() {
  const confirmflag = confirm("모든 상품의 주문을 취소하시겠습니까?");

  if(confirmflag){
    //확인 버튼 클릭 true 
    // localStorage.removeItem("editedOrderItemsInfo");
    localStorage.removeItem("orderEdit");
    axios.delete("/api/orders/" + orderNumber)
    .then(res => {
      location.href = "/mypage";
    })
    .catch(err => {
      console.error(err);
    });
     
  }else{
    //취소 버튼 클릭 false
    return;
  }
}

function backToMypage() {
  const confirmflag = confirm("주문 수정을 취소하시겠습니까?");

  if(confirmflag){
    //확인 버튼 클릭 true 
    localStorage.removeItem("orderEdit");
    location.href = "/mypage";
  }else{
    //취소 버튼 클릭 false
    return;
  }

}

/** 주문 수정 버튼 클릭 시 실행되는 함수 */
function submitEditInfo() {

  const recipientInformation = {
    recipientName: orderName.value,
    recipientZipCode: orderZipcode.value,
    recipientAddress: orderAddress.value,
    recipientAddressDetail: orderAddressDetail.value,
    recipientTel: orderTel.value
  };
 
  
  dataToSend = {
    "userId": userId,
    "totalPrice": totalPrice,
    "productInformation": itemData,
    "recipientInformation": recipientInformation
  }

  axios.put('/api/orders/' + orderNumber, dataToSend)
  .then(function (response) {
    console.log("주문이 성공적으로 수정되었습니다:", response.data);
    location.href='/mypage';
    localStorage.removeItem("orderEdit");
    drawOrderItem([]);
  })
  .catch(function (error) {
    console.log("주문을 수정하는 도중 오류가 발생했습니다:" + error);
    alert("주문을 수정하는 도중 오류가 발생했습니다.");
  });
}

