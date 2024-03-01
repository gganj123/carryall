function fetchData() {
    axios.get('/api/orders')
      .then(response => {
        const orderList = response.data;
        let htmlString = '';
  
        orderList.forEach((order, index) => {
          htmlString += `
          <div class="adminList">
            <div class="check">
              <input type="checkbox" name="checkbox1" id="${order._id}">&ensp;&nbsp;${index + 1}
            </div>
            <div class="orderNum">
                <span>${order._id}</span>
            </div>

            <div class="name"><span>${order.recipientInformation.recipientName}</span></div>
            <div class="status">
              <select class="orderStatus" name="orderStatus">
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
              <button class="change butt col font_17">수정</button>
            </div>
          </div>`;
        });
        
  
        document.getElementById('adminCateList').innerHTML = htmlString;
        const changeButton = document.getElementsByClassName('change')
        for (let button of changeButton) {
          button.addEventListener('click', changeFunc);
          console.log('asd');
      }
  
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  fetchData();

  function changeFunc(event) {
    // 클릭된 요소가 수정 버튼인지 확인
    if (event.target.classList.contains('change')) {
        // 수정 버튼이 클릭된 경우, 해당 수정 버튼의 부모 요소를 찾음
        const adminListItem = event.target.closest('.adminList');
  
        // 부모 요소 내에서 체크박스를 찾음
        const checkbox = adminListItem.querySelector('input[type="checkbox"]');
        const orderStatus = adminListItem.querySelector('.orderStatus');
       
        // 체크박스가 있는지 확인 후 변수에 할당
        if (checkbox && orderStatus) {
          // 체크박스와 input 텍스트가 모두 있는 경우
          const checkboxId = checkbox.id; // 체크박스의 id 가져오기
          const orderStatusValue = orderStatus.value; // input 텍스트의 값 가져오기
  
          // 원하는 작업 수행
          console.log('체크박스 ID:', checkboxId);
          console.log('입력된 텍스트:', orderStatusValue);
            const putdata = {   
              "name": inputValue
          }
            // 카테고리를 수정하는 요청을 보냄
            axios.put(`/api/categories/${checkboxId}`, putdata)
                .then(response => {
                    // 카테고리 수정에 성공한 경우
                   alert(`카테고리명이 수정되었습니다. '${inputValue}'`);
                })
                .catch(error => {
                    // 카테고리 수정에 실패한 경우
                    console.error(`카테고리 ID ${checkboxId} 수정 요청 실패:`, error);
                });
        } else {
            // 체크박스가 없는 경우
            console.error('해당 수정 버튼의 부모 요소에 체크박스가 없습니다.');
        }
    }
  }
  
