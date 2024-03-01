function fetchProducts() {
  axios.get(`/api/products`)
    .then(res => {
      const productList = res.data;
      let htmlString = '';

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
      .then(res => {
        const productList = res.data;

        const filteredProducts = productList.filter(product => product.categoryName.toLowerCase() === categoryName.toLowerCase()); // 대소문자 구분 없이 필터링
        console.log(filteredProducts);
        let htmlString = '';
 
        filteredProducts.forEach(product => {
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

  const bareButton = document.getElementById('barebutt');
  const stussyButton = document.getElementById('stussybutt');
  const supremeButton = document.getElementById('supremebutt');


bareButton.addEventListener('click', function() {
    fetchProductsByBrand('bare');
});
stussyButton.addEventListener('click', function() {
    fetchProductsByBrand('stussy');
});
supremeButton.addEventListener('click', function() {
    fetchProductsByBrand('supreme');
});

htmlString = '';
function fetchProductsByCate(categoryId) {
  axios.get(`/api/products`)
    .then(res => {
      const productList = res.data;

      const filteredProduct = productList.filter(product => product.categoryId === categoryId);
      console.log(filteredProduct);
      let htmlString = '';
  
      filteredProduct.forEach(product => {
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

const tButton = document.getElementById('tbutt');
const cButton = document.getElementById('cbutt');
const bButton = document.getElementById('bbutt');


tButton.addEventListener('click', function() {
  fetchProductsByCate("65df755367457938cc02e40b");
});
cButton.addEventListener('click', function() {
  fetchProductsByCate("65df752e67457938cc02e405");
});
bButton.addEventListener('click', function() {
  fetchProductsByCate("65df753a67457938cc02e408");
});
window.onload = function() {
  fetchProducts();
};
