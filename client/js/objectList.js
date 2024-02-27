
axios.get('/api/products')
  .then(res => {
    const productList = res.data;
    let htmlString = '';
    console.log(res.data);

herf = '/detail?id=asdadsadadad'

    productList.forEach((product,index) => {
      if(index<=7){
        htmlString += `<div style="height: 300px; width: 23%; margin-right: 20px;">
        <ul>`
      htmlString += `<li><img class="obimg" id="${product._id}" src="${product.image}" alt="${product.name}"></li>`;// 이미지 삽입 부분
      htmlString += `<li><h2 id="root"> ${product.brand}</h2></li> `;
      htmlString += `<li><div p>${product.name}</div> </li>`;
      htmlString += `<li><p>${product.price.toLocaleString('ko-KR')}</p></li>`;
      htmlString += `</div>`;
      }
    });

    document.getElementById('objectList').innerHTML = htmlString;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  axios.get('/api/products')
  .then(res => {
    // 등록일순으로 데이터 정렬
    const productList = res.data.sort((a, b) => {
      return new Date(a.price) - new Date(b.price);
    });

    let htmlString = '';
    console.log(productList); // 정렬된 productList를 출력

    productList.forEach((product,index) => {
      if(index<=7){
        htmlString += `<div style="height: 300px; width: 23%; margin-right: 20px;">
        <ul>`
      htmlString += `<li><img class="obimg" id="${product._id}" src="${product.image}" alt="${product.name}"></li>`;// 이미지 삽입 부분
      htmlString += `<li><h2 id="root"> ${product.brand}</h2></li> `;
      htmlString += `<li><div p>${product.name}</div> </li>`;
      htmlString += `<li><p>${product.price.toLocaleString('ko-KR')}</p></li>`;
      htmlString += `</div>`;
      }
    });

    document.getElementById('obListDateSorting').innerHTML = htmlString;
  
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
