
<<<<<<< HEAD
const urlParams = new URLSearchParams(window.location.search); //http://localhost:5001/product/?brand=bare
const brand = urlParams.get('brand');
console.log(brand);
 const bran =  brand.toUpperCase()
 function fetchProductsByBrand(bran) {
  console.log(bran);
    axios.get(`/api/products?categoryName=${bran}`)
=======
      function getFilterValueFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const brand = urlParams.get('brand');
        const categoryId = urlParams.get('categoryId');
        // 브랜드 값이 있으면 브랜드를 반환, 그렇지 않으면 카테고리 ID 반환
        return brand !== null ? brand : categoryId;
      }

      // URL에서 브랜드 값 또는 카테고리 ID 가져오기
      const filterValue = getFilterValueFromURL();
      console.log(filterValue);

      // 카테고리 ID가 있는 경우에만 해당 카테고리의 상품을 필터링
      if (filterValue !== null && filterValue !== undefined && filterValue.startsWith("65")) {
        const filteredProducts = productList.filter(product => product.categoryId === filterValue);
        console.log(filteredProducts);

        filteredProducts.forEach(product => {
          htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
          htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
          htmlString += `<h2 id="root"> ${product.categoryName}</h2>`;
          htmlString += `<div p>${product.name}</div> `;
          htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
          htmlString += `</div></a>`;
        });
      } else {
        // 카테고리 ID가 없는 경우에는 전체 상품을 출력
        productList.forEach(product => {
          htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
          htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
          htmlString += `<h2 id="root"> ${product.brand}</h2>`;
          htmlString += `<div p>${product.name}</div> `;
          htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
          htmlString += `</div></a>`;
        });
      }

      document.getElementById('oblistSort').innerHTML = htmlString;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


  function fetchProductsByBrand(categoryName) {
    axios.get(`/api/products`)
>>>>>>> 07b7479805c9a1fea711ac3cf530286a19d5a1bf
      .then(res => {
        const productList = res.data;
        let htmlString = '';
        console.log(res.data);
        
        productList.forEach(product => {
          htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
            htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
            htmlString += `<h2 id="root"> ${product.categoryName}</h2>`;
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


    function changeText() {
      const urlParams2 = new URLSearchParams(window.location.search); //http://localhost:5001/product/?brand=bare
      const brand2 = urlParams2.get('brand');
        // chanText ID를 가진 요소 가져오기
        const chanText = document.getElementById('chanText');
        
        // h2와 h3 요소 가져오기
        const h2Element = chanText.querySelector('h2');

        // 텍스트 변경
        h2Element.textContent = `${brand2}`;
    }

  const bareButton = document.getElementById('barebutt');
  const stussyButton = document.getElementById('stussybutt');
  const supremeButton = document.getElementById('supremebutt');

  bareButton.addEventListener('click', function() {
    fetchProductsByBrand('BARE');
    window.history.pushState(null, null, '?brand=bare');
    changeText();
});
stussyButton.addEventListener('click', function() {
  fetchProductsByBrand('STUSSY');
  window.history.pushState(null, null, '?brand=stussy');
  console.log("gg");
  changeText();
});
supremeButton.addEventListener('click', function() {
    fetchProductsByBrand('SUPREME');
    window.history.pushState(null, null, '?brand=supreme');
    changeText();
});
// supremeButton.addEventListener('click', function() {
//   fetchProductsByBrand('brandUp');
//   window.history.pushState(null, null, `?brand=${brandUp}`);
// });


window.onload = function() {
  fetchProductsByBrand(bran);
};
