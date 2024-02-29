// // 클래스가 "price"인 모든 요소를 가져옵니다.
// var priceElements = document.getElementsByClassName("price");

// // 각 요소에 대해 반복합니다.
// for (var i = 0; i < priceElements.length; i++) {
//     // 요소의 텍스트 내용을 가져옵니다.
//     var priceText = priceElements[i].textContent;

//     // 쉼표를 추가하기 위해 정규식을 사용합니다.
//     var formattedPrice = priceText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//     // 숫자 뒤에 "원"을 붙입니다.
//     formattedPrice += "원";

//     // 포맷된 값을 다시 요소에 설정합니다.
//     priceElements[i].textContent = formattedPrice;
// }




  // 총 가격을 계산합니다.
  //var totalPrice = price * num;

  // 총 가격을 화면에 업데이트합니다.
  //priceElement.textContent = totalPrice.toLocaleString() + "원";
//}
// document.addEventListener("DOMContentLoaded", function() {
//   // 서버로부터 데이터를 받아온 후에 실행될 함수
//   axios.get('http://localhost:5001/products')
//     .then(res => {
//       const product = res.data; // 받아온 상품 데이터

//       // dataToSend 객체의 정보를 각 요소에 할당
//       document.querySelector('.totalDetailOption h1').innerText = product.name;
//       document.querySelector('.totalDetailOption .price').innerText = product.price;
//       document.querySelector('.totalPrice .price').innerText = product.price;
//       document.querySelector('.totalDetailOption .categoryName').innerText = product.categoryName;
//       document.querySelector('.contentPoint ul').innerHTML = `
//           <li class="point">소재: 합성피혁</li>
//           <li class="point">색상: 블랙 / 아이보리 / 카멜</li>
//           <li class="point">추가 상세 : ${product.detail}</li>
//           <li class="point">추가 상세 : ${product.detail}</li>
//       `;
//       document.querySelector('.totalDetailOption dl select[name="selectbox"]').innerHTML = `
//           <option value="1">${product.option}</option>
//           <option value="2">아이보리</option>
//           <option value="3">브라운</option>
//       `;

//       // 이미지 변경
//       document.querySelector('.mainImage img').src = product.image;
//     })
//     .catch(error => {
//       console.error('Error fetching product data:', error);
//     });
// });
