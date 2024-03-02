function fetchData() {
  axios
    .get("/api/orders")
    .then((response) => {
      const orderList = response.data;
      let htmlString = "";

      orderList.forEach((order, index) => {
        htmlString += `
          <div class="adminList orderList">
            <div class="check">
              <input type="checkbox" name="checkbox1" id="${
                order._id
              }">&ensp;&nbsp;${index + 1}
            </div>
            <div class="orderNum">
                <span>${order._id}</span>
            </div>

            <div class="name"><span>${
              order.recipientInformation.recipientName
            }</span></div>
            <div class="status">
              <select class="orderStatus designInput" name="orderStatus">
                <option value="${order.status}">${order.status}</option>
                <option value="결제완료">결제완료</option>
                <option value="상품준비">상품준비</option>
                <option value="배송중">배송중</option>
                <option value="배송완료">배송완료</option>
                <option value="취소">취소</option>
                <option value="교환">교환</option>
                <option value="반품">반품</option>
              </select>
            </div>
            <div class="sortbutton">
              <button class="change butt col font_17 designButton">수정</button>
            </div>
          </div>`;
      });

      document.getElementById("adminCateList").innerHTML = htmlString;
      const changeButton = document.getElementsByClassName("change");
      for (let button of changeButton) {
        button.addEventListener("click", orderUpdate);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();

function orderUpdate(event) {
  // 클릭된 요소가 수정 버튼인지 확인
  if (event.target.classList.contains("change")) {
    // 수정 버튼이 클릭된 경우, 해당 수정 버튼의 부모 요소를 찾음
    const adminListItem = event.target.closest(".adminList");

    // 부모 요소 내에서 체크박스를 찾음
    const orderNum = adminListItem.querySelector(".orderNum span");
    const orderStatus = adminListItem.querySelector(".orderStatus");

    // 체크박스가 있는지 확인 후 변수에 할당
    if (orderNum && orderStatus) {
      // 체크박스와 input 텍스트가 모두 있는 경우
      const orderId = orderNum.innerText; // 체크박스의 id 가져오기
      const orderStatusValue = orderStatus.value; // 셀렉트박스 텍스트의 값 가져오기

      // 원하는 작업 수행
      console.log("체크박스 ID:", orderId);
      console.log("입력된 텍스트:", orderStatusValue);
      const putdata = {
        status: orderStatusValue,
      };
      // 주문를 수정하는 요청을 보냄
      axios
        .put(`/api/orders/admin/${orderId}`, putdata)
        .then((response) => {
          // 주문 수정에 성공한 경우
          alert(`주문상태가 수정되었습니다. '${orderStatusValue}'`);
        })
        .catch((error) => {
          // 주문 수정에 실패한 경우
          console.error(`${orderId} 주문상태 수정 요청 실패:`, error);
        });
    } else {
      // 체크박스가 없는 경우
      console.error("해당 수정 버튼의 부모 요소에 체크박스가 없습니다.");
    }
  }
}

//삭제버튼

const deleteButton = document.getElementById("deleteButton");

// '선택된 주문 삭제' 버튼에 클릭 이벤트 리스너를 추가합니다.
deleteButton.addEventListener("click", function () {
  // 'adminList' 클래스를 가진 요소들을 모두 가져옵니다.
  const adminListItems = document.querySelectorAll(".adminList");

  // 가져온 모든 'adminList' 요소를 순회하면서 체크된 주문를 삭제합니다.
  adminListItems.forEach(function (adminListItem) {
    // 각 'adminList' 요소에서 체크된 주문를 찾습니다.
    const checkbox = adminListItem.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      // 체크된 주문의 ID를 가져옵니다.
      const orderId = checkbox.id;

      // 주문를 삭제하는 요청을 보냅니다.
      axios
        .delete(`/api/orders/${orderId}`)
        .then((response) => {
          // 주문 삭제에 성공한 경우

          // 화면에서 해당 주문를 제거합니다.
          adminListItem.parentNode.removeChild(adminListItem);

          setTimeout(function () {
            location.reload();
          }, 500);
        })
        .catch((error) => {
          console.log(orderId);
          // 주문 삭제에 실패한 경우
          console.error(`주문 ID ${orderId} 삭제 요청 실패:`, error);
        });
    }
  });
});
