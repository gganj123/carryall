<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>


axios.get('http://localhost:5000/product')
.then(res => {
  // 서버로부터 받은 응답을 처리합니다.
  const productList = res.data;

  // HTML로 나열하기 위한 문자열 초기화
  let htmlString = '<ul>';

  // 각 제품을 순회하면서 리스트 아이템 생성
  productList.forEach(product => {
  console.log(res.data);

  htmlString += `<div class="main_story"
                          style="height: 400px; width: 100%; background-color: #fafafa; display: flex; flex-wrap: wrap; margin-top:50px">
  <div class="main_object" style="height: 400px; width: 23%; margin-right: 20px;">
                              <div>
                                  <ul>`
    htmlString += `<li><strong>Image:</strong> <img src="${product.image}" alt="Product Image"></li>`;
    htmlString += `<li><strong>Name:</strong> ${product.name}</li> `;
    htmlString += `<li><strong>Brand:</strong> ${product.brand}</li>`;
    htmlString += `<li><strong>Price:</strong> ${product.price}</li>`;
    htmlString += `</ul> </div>

</div>`;
  });

  // 목록을 닫습니다.
  htmlString += '</ul>';

  // 결과를 표시할 요소에 HTML 삽입
  document.getElementById('productList').innerHTML = htmlString;
})
.catch(error => {
  // 오류가 발생했을 때 처리합니다.
  console.error('Error fetching data:', error);
});