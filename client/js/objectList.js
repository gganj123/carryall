
axios.get('http://localhost:5000/product')
  .then(res => {
    const productList = res.data;
    let htmlString = '';
    console.log(res.data);

    productList.forEach(product => {
      htmlString += `<div style="height: 200px; width: 23%; margin-right: 20px;">
      <ul>`
      htmlString += `<li><strong>Image:</strong> <img src="${product.image}" alt="Product Image"></li>`;//이미지 넣어서 나오게 해보기
      htmlString += `<li><strong>Name:</strong> ${product.name}</li> `;
      htmlString += `<li><strong>Brand:</strong> ${product.brand}</li>`;
      htmlString += `<li><strong>Price:</strong> ${product.price}</li>`;
      htmlString += `</div>`;
    });

    document.getElementById('objectList').innerHTML = htmlString;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });