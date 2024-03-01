function fetchProducts(){
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');
console.log(brand);
 const bran =  brand.toUpperCase()
 const selectedValue = document.getElementById("sort").value;
 console.log(selectedValue)

  function fetchProducts2(bran,selectedValue) {


        console.log(`/api/products?categoryName=${bran}&sortOrder=${selectedValue}`);

        axios.get(`/api/products?categoryName=${bran}&sortOrder=${selectedValue}`)
      .then(res => {
        const productList = res.data;
        let htmlString = '';  
        productList.forEach(product => {
            htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
            htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
            htmlString += `<h2 id="root"> ${product.categoryName}</h2>`;
            htmlString += `<div p>${product.name}</div> `;
            htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
            htmlString += `</div></a>`;
        });
        // 정렬된 결과를 oblistSort에도 넣어줌
        document.getElementById('oblistSort').innerHTML = htmlString;
    
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  function changeText() {
    const urlParams2 = new URLSearchParams(window.location.search); //http://localhost:5001/product/?brand=bare
    const Svalue = urlParams2.get('sort');
      // chanText ID를 가진 요소 가져오기
      const chanText = document.querySelector('.hdsort');
      // h2와 h3 요소 가져오기
      const h3Element = chanText.querySelector('h3');
      if(Svalue== 'desc'){
        h3Element.textContent = '고가상품';
      }else if(Svalue=='asc'){
        h3Element.textContent = '저가상품';
      }else
      h3Element.textContent = '최신상품';
      // 텍스트 변경
      
  }
  fetchProducts2(bran,selectedValue);
  window.history.pushState(null, null, `?brand=${brand}&sort=${selectedValue}`);
  changeText()

}

