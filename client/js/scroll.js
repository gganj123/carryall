(() => {
  const $ul = document.getElementsByClassName('scroll1')[0];
  let $div = document.getElementsByClassName('scroll2')[0];
  let count = $ul.children.length;

  // IntersectionObserver 생성
  const io = new IntersectionObserver((entry, observer) => {
    // 현재 보이는 target 출력
    const ioTarget = entry[0].target;

    // viewport에 target이 보이면 하는 일
    if (entry[0].isIntersecting) {
      console.log('현재 보이는 타겟', ioTarget);

      // 현재 보이는 target 감시 취소
      io.unobserve($div);

      // 새로운 div 추가
      $div = $ul.appendChild(document.createElement('div'));
      $div.classList.add('scroll2');
      $div.setAttribute('id', 'oblistsort2');
      $div.textContent = ++count;

      // 새로 추가된 div 감시
      io.observe($div);

      // 랜덤한 상품 목록을 가져와서 화면에 출력
      fetchProducts();
    }
  }, {
    // 타겟이 50% 이상 보이면 감지
    threshold: 0.5
  });

  // div 감시
  io.observe($div);
})();

// 상품 목록을 가져와서 화면에 출력하는 함수
function fetchProducts() {
  axios.get(`/api/products`)
    .then(res => {
      const productList = res.data;
      let htmlString = '';

          // URL에서 브랜드 정보 가져오기
          function getBrandFromURL() {
              const urlParams = new URLSearchParams(window.location.search);
              return urlParams.get('brand');
          }
          const filteredProducts = productList.filter(product => product.brand.toLowerCase() === getBrandFromURL().toLowerCase()); // 대소문자 구분 없이 필터링
          console.log(filteredProducts);

      // 상품 목록을 랜덤하게 재배열
      const shuffledProducts = shuffleArray(filteredProducts);

          shuffledProducts.forEach((product,index) => {
            if(index<=3){
              htmlString += `<div class="item" style="height: 321px; width: 244.44px; margin-bottom:100px;"><a href="/practice?id=${product._id}">`
              htmlString += `<img class="img" style="width: 100%; height: auto;  display: block;" id="${product._id}" src="${product.image}">`;
              htmlString += `<h2 id="root"> ${product.brand}</h2>`;
              htmlString += `<div p>${product.name}</div> `;
              htmlString += `<p>${product.price.toLocaleString('ko-KR')}</p>`;
              htmlString += `</div></a>`;
            }
          });
          // 화면에 출력
          console.log("ttt"+ htmlString);
          document.getElementById('oblistsort2').innerHTML = htmlString;
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

// 배열을 랜덤하게 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}