function fetchData() {
  axios
    .get("/api/orders")
    .then((response) => {
      const orderList = response.data;
      let htmlString = "";

      orderList.forEach((order, index) => {
        htmlString += `
          <div class="adminList">
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
            <div class="statusBox"><input type="text" class ="cate font_17" id="${order._id} value="${
              order.status //statusCode 만드는 박스
            }" onkeypress="changeStatus(event, '${order._id}')"></div>
            <div class="infoCont" style="width:100%; padding-top: 0;">
              <h3> </h3>
            </div>
          </div>`;
      });

      document.getElementById("adminCateList").innerHTML = htmlString;
      const changeButton = document.getElementsByClassName("change");
      for (let button of changeButton) {
        button.addEventListener("click", changeFunc);
        console.log("asd");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();

// '선택주문 삭제' 버튼에 클릭 이벤트 리스너를 추가합니다.
const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", function () {
  // 'adminList' 클래스를 가진 요소들을 모두 가져옵니다.
  const adminListItems = document.querySelectorAll(".adminList");

  // 가져온 모든 'adminList' 요소를 순회하면서 체크된 주문을 삭제합니다.
  adminListItems.forEach(function (adminListItem) {
    // 각 'adminList' 요소에서 체크된 주문을 찾습니다.
    const checkbox = adminListItem.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      // 체크된 주문을 삭제하는 요청을 보냅니다.
      const orderId = adminListItem
        .querySelector(".orderNum")
        .textContent.trim();
      axios
        .delete(`/api/orders/${orderId}`)
        .then((response) => {
          // 주문 삭제에 성공한 경우
          // 화면에서 해당 주문을 제거합니다.
          adminListItem.parentNode.removeChild(adminListItem);
        })
        .catch((error) => {
          // 주문 삭제에 실패한 경우
          console.error(`주문 ID ${orderId} 삭제 요청 실패:`, error);
        });
    }
  });
});


function changeStatus(event, orderId) {
  // 엔터 키를 눌렀을 때만 함수 실행
  if (event.key === 'Enter') {
    // 변경된 상태 가져오기
    const updatedStatus = event.target.value;

    // 변경된 상태와 주문 ID를 사용하여 API에 요청 보내기
    axios.put("/api/orders/changeStatus", { orderId, updatedStatus })
      .then(response => {
        console.log("주문 상태 변경 요청이 성공했습니다.");
        console.log("응답 데이터:", response.data);
        // 이후에 필요한 작업을 여기에 추가합니다.
      })
      .catch(error => {
        console.error("주문 상태 변경 요청이 실패했습니다:", error);
      });
  }
}