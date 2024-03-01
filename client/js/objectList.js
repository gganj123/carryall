  document.addEventListener("DOMContentLoaded", function() {
    axios.get('/api/products')
      .then(res => {
        const productList = res.data;
        let htmlString = '';

        productList.forEach((product,index) => {
          if(index<=7){
          htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
          htmlString += `<img div class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src='${product.image}'>`;
          htmlString += `<h2 id="root"> ${product.categoryName}</h2>`;
          htmlString += `<div p>${product.name}</div> `;
          htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
          htmlString += `</div></a>`;
          }
        });
  
        document.getElementById('objectList').innerHTML = htmlString;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

                          
  document.addEventListener("DOMContentLoaded", function() {
    axios.get('/api/products')
      .then(res => {
        const productList = res.data;
        
        // 가격을 기준으로 내림차순으로 정렬
        productList.sort((a, b) => a.price - b.price);
        
        let htmlString = '';  
        productList.forEach((product, index) => {
          if (index <= 7) {
            htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
            htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
            htmlString += `<h2 id="root"> ${product.categoryName}</h2>`;
            htmlString += `<div p>${product.name}</div> `;
            htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
            htmlString += `</div></a>`;
          }
        });

        // 정렬된 결과를 oblistSort에도 넣어줌
        document.getElementById('oblistPriceSort').innerHTML = htmlString;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
   