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
            <div class="status"><input type="text" class ="cate font_17" value="${order.status}"></div>
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
  