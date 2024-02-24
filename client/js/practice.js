// 클래스가 "price"인 모든 요소를 가져옵니다.
var priceElements = document.getElementsByClassName("price");

// 각 요소에 대해 반복합니다.
for (var i = 0; i < priceElements.length; i++) {
    // 요소의 텍스트 내용을 가져옵니다.
    var priceText = priceElements[i].textContent;

    // 쉼표를 추가하기 위해 정규식을 사용합니다.
    var formattedPrice = priceText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 숫자 뒤에 "원"을 붙입니다.
    formattedPrice += "원";

    // 포맷된 값을 다시 요소에 설정합니다.
    priceElements[i].textContent = formattedPrice;
}

function updatePrice() {
  // 수량을 가져와 정수로 변환합니다.
  var num = parseInt(document.getElementById("num").value);

  // 가격을 가져옵니다. 여기서는 클래스 이름이 "price"인 요소의 첫 번째 요소를 가져옵니다.
  var priceElement = document.getElementsByClassName("price")[1];
  var priceText = priceElement.textContent;
  var price = parseFloat(priceText.replace(/[^0-9]/g, '')); // 숫자 외의 문자 제거 후 부동소수점으로 변환

  // 총 가격을 계산합니다.
  var totalPrice = price * num;

  // 총 가격을 화면에 업데이트합니다.
  priceElement.textContent = totalPrice.toLocaleString() + "원";
}


