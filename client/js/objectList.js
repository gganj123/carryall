
axios.get('http://localhost:5000/product')
  .then(res => {
    const productList = res.data;
    let htmlString = '';
    console.log(res.data);

    productList.forEach(product => {
      htmlString += `<div style="height: 300px; width: 23%; margin-right: 20px;">
      <ul>`
      htmlString += `<li><img class="obimg" src="${product.image}" alt="Product Image"></li>`;//이미지 넣어서 나오게 해보기
      htmlString += `<li><strong>Name: ${product.name}</strong></li> `;
      htmlString += `<li><strong>Brand:</strong> ${product.brand}</li>`;
      htmlString += `<li><strong>Price: ${product.price.toLocaleString('ko-KR')}</strong></li>`;
      htmlString += `</div>`;
    });

    document.getElementById('objectList').innerHTML = htmlString;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  axios.get('http://localhost:5000/product')
  .then(res => {
    // 등록일순으로 데이터 정렬
    const productList = res.data.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let htmlString = '';
    console.log(productList); // 정렬된 productList를 출력

    productList.forEach(product => {
      htmlString += `<div class ="font_17" style="height: 300px; width: 23%; margin-right: 20px;">
      <ul>`
      htmlString += `<li><img class="obimg" src="${product.image}" alt="${product.name}"></li>`;// 이미지 삽입 부분
      htmlString += `<li><strong>Name:${product.name}</strong> </li> `;
      htmlString += `<li><strong>Brand:</strong> ${product.brand}</li>`;
      htmlString += `<li><strong>Price: ${product.price.toLocaleString('ko-KR')}</strong></li>`;
      htmlString += `</div>`;
    });

    document.getElementById('obListDateSorting').innerHTML = htmlString;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });