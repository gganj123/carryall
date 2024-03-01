// // 상품 데이터를 생성하는 함수
// function createProduct(index) {
//   return {
//       img: `/carryall/client/img/ban_${index}.jpeg`, // 이미지 경로 예시
//       categoryName: `categoryName ${index}`,
//       name: `Product ${index}`,
//       price: `${index}`
//   };
// }

// // 상품 개수 설정
// const numberOfProducts = 20;

// // Mock 데이터 생성
// const products = Array.from({ length: numberOfProducts }, (_, index) => createProduct(index + 1));

// // 이제 products 배열에 20개의 상품이 들어 있습니다.
// // 이 배열을 renderProducts 함수에 전달하여 화면에 표시할 수 있습니다.

// // productList 요소 찾기
// const productList = document.getElementById("detail");

// // 상품을 렌더링하는 함수
// function renderProducts(products) {
//   products.forEach(product => {
//     // div.item 요소 생성
//     const item = document.createElement("div");
//     item.classList.add("item");

//     // div.img 요소 생성
//     const imgDiv = document.createElement("div");
//     imgDiv.classList.add("img");
//     const img = document.createElement("img");
//     img.src = product.img;
//     img.alt = "Product Image";
//     imgDiv.appendChild(img);

//     // div.text 요소 생성
//     const textDiv = document.createElement("div");
//     textDiv.classList.add("text");
//     const brandHeading = document.createElement("h2");
//     brandHeading.textContent = product.categoryName;
//     const nameParagraph = document.createElement("p");
//     nameParagraph.textContent = product.name;
//     const priceParagraph = document.createElement("p");
//     priceParagraph.textContent = product.price;

//     // div.text에 하위 요소 추가
//     textDiv.appendChild(brandHeading);
//     textDiv.appendChild(nameParagraph);
//     textDiv.appendChild(priceParagraph);

//     // div.item에 하위 요소 추가
//     item.appendChild(imgDiv);
//     item.appendChild(textDiv);

// //     // productList에 div.item 추가
// //     productList.appendChild(item);
// //   });
// // }
// axios.get('http://localhost:5001/products')
// .then(res => {
//   const productList = res.data;
//   let htmlString = '';
//   console.log(res.data);

//   productList.forEach(product => {
//     htmlString += `<div style="height: 300px; width: 23%; margin-right: 20px;">
//     <ul>`
//     htmlString += `<li><img class="obimg" src="${product.image}" alt="Product Image"></li>`;//이미지 넣어서 나오게 해보기
//     htmlString += `<li><strong>Name: ${product.name}</strong></li> `;
//     htmlString += `<li><strong>categoryName:</strong> ${product.categoryName}</li>`;
//     htmlString += `<li><strong>Price: ${product.price.toLocaleString('ko-KR')}</strong></li>`;
//     htmlString += `</ul></div>`;
//   });
// }

// // 초기 상품 데이터 로드
// renderProducts(products);



// // 초기 페이지 번호와 페이지당 상품 수 설정
// let currentPage = 1;
// const productsPerPage = 10;

// // 스크롤 이벤트 핸들러
// function handleScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     loadMoreProducts();
//   }
// }

// // 추가 상품 로드 함수
// function loadMoreProducts() {
//   // 상품 데이터를 가져오는 비동기 함수 호출 (예: Ajax 요청 등)
//   const newProducts = fetchProducts(currentPage, productsPerPage);
//   // 상품 데이터를 화면에 추가
//   renderProducts(newProducts);
//   // 페이지 번호 증가
//   currentPage++;
// }

// // 초기 상품 데이터 로드
// renderProducts(products);

// // 스크롤 이벤트 리스너 등록
// window.addEventListener('scroll', handleScroll);

// // 가상의 fetchProducts 함수 (실제로는 Ajax 등으로 서버에서 데이터를 가져와야 함)
// function fetchProducts(page, perPage) {
//   // 예시로 현재 페이지와 페이지당 상품 수에 해당하는 데이터를 임의로 반환합니다.
//   const startIndex = (page - 1) * perPage;
//   const endIndex = startIndex + perPage;
//   return products.slice(startIndex, endIndex);
// }