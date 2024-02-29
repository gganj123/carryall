function fetchProducts() {
  axios.get(`/api/products`)
    .then(res => {
      const productList = res.data;
      let htmlString = '';
      function getBrandFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('brand');
      }
      const filteredProducts = productList.filter(product => product.brand.toLowerCase() === getBrandFromURL().toLowerCase()); // 대소문자 구분 없이 필터링
        console.log(filteredProducts);
        console.log(getBrandFromURL().toLowerCase());

        filteredProducts.forEach(product => {
        htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
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


  function fetchProductsByBrand(brand) {
    axios.get(`/api/products`)
      .then(res => {
        const productList = res.data;

        const filteredProducts = productList.filter(product => product.brand.toLowerCase() === brand.toLowerCase()); // 대소문자 구분 없이 필터링
        console.log(filteredProducts);
        let htmlString = '';
 
        filteredProducts.forEach(product => {
          htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
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
      console.log(productList);
      let htmlString = '';
  
      filteredProduct.forEach(product => {
        htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
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

const tButton = document.getElementById('tbutt');
const cButton = document.getElementById('cbutt');
const bButton = document.getElementById('bbutt');


tButton.addEventListener('click', function() {
  fetchProductsByCate('토트백');
});
cButton.addEventListener('click', function() {
  fetchProductsByCate('크로스백');
});
bButton.addEventListener('click', function() {
  fetchProductsByCate('백팩');
});
window.onload = function() {
  fetchProducts();
};