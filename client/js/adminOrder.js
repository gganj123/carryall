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
              <select name="orderStatus">
                <option value="결제완료">결제완료</option>
                <option value="상품준비">상품준비</option>
                <option value="배송중">배송중</option>
                <option value="배송완료">배송완료</option>
                <option value="취소">취소</option>
                <option value="교환">교환</option>
                <option value="반품">반품</option>
              </select>
            </div>
            <div class="infoCont" style="width:100%; padding-top: 0;">
              <h3> </h3>
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
  