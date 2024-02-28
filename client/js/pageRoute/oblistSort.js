                   
  function fetchProductsByBrand(brand) {
    axios.get(`/api/products`)
      .then(res => {
        const productList = res.data;
        console.log(productList);
        let htmlString = '';
    
        productList.forEach(product => {
          htmlString += `<div class="item" style="height: 330px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
            htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
            htmlString += `<h2 id="root"> ${product.brand}</h2>`;
            htmlString += `<div p>${product.name}</div> `;
            htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
            htmlString += `</div></a>`;
        });
    
        document.getElementById('oblistSort').innerHTML = htmlString;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const bareButton = document.getElementById('barebutt');
        
        // bareButton에 클릭 이벤트 리스너 추가
        bareButton.addEventListener('click', function() {
          window.location.href = '/product?brand=bare';
            fetchProductsByBrand("BARE");
        });