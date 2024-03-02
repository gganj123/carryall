const urlParams = new URLSearchParams(window.location.search); //http://localhost:5001/product/?brand=bare
const brand = urlParams.get('brand');
changeText();
 const bran =  brand.toUpperCase()
 function fetchProductsByBrand(bran) {
  console.log(bran);
    axios.get(`/api/products?categoryName=${bran}`)
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
