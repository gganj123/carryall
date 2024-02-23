document.addEventListener("DOMContentLoaded", function() {
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');
  const btnDeleteAll = document.getElementById('btnDeleteAll');
  const btnDeleteSelected = document.getElementById('btnDeleteSelected');
  const checkboxes = document.querySelectorAll('.cartItemContainer input[type="checkbox"]');

  // 전체 체크 
  selectAllCheckbox.addEventListener('change', function() {
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // 전체 아이템 삭제 
  btnDeleteAll.addEventListener('click', function() {
    const cartItems = document.querySelectorAll('.cartItemContainer');

    cartItems.forEach(function(item) {
      item.remove();
    });
  });

  // 선택 아이템 삭제
  btnDeleteSelected.addEventListener('click', function() {
    const checkedItems = document.querySelectorAll('.cartItemContainer input[type="checkbox"]:checked');

    checkedItems.forEach(function(item) {
      item.closest('.cartItemContainer').remove();
    });
  });

  // 상품 정보 표시
  displayProductInfo();

  const quantityInputs = document.querySelectorAll('.cartItemContainer .quantity');
  quantityInputs.forEach(function(input) {
    input.addEventListener('input', updateOrderAmount); // input 이벤트
  });
});

/** 각 상품의 수량이 변경될 때 호출되는 함수 */
function updateOrderAmount() {
  const cartItems = document.querySelectorAll('.cartItemContainer');

  // 각 상품 아이템에 대해 반복
  cartItems.forEach(function(item) {
    const priceElement = item.querySelector('.price');
    const quantityElement = item.querySelector('.quantity');
    const totalElement = item.querySelector('.total');

    // 상품 금액과 수량 가져오기
    let price = parseFloat(priceElement.textContent);
    let quantity = parseInt(quantityElement.value);
    let total = price * quantity;

    price = addCommasToNumber(price);
    total = addCommasToNumber(total);
    totalElement.textContent = total;
  });
}

function displayProductInfo() {
  // JSON 파일 경로
  const jsonFilePath  = '../temp/product.json';

  // JSON 파일을 가져오기
  fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
      // 상품 정보를 가져와서 화면에 표시
      const productContainer = document.getElementById('productContainer');
      productContainer.innerHTML = `
        <div class="cartItemContainer">
          <div class="cartItem">
            <div class="checkbox"><input type="checkbox"></div>
            <div class="description">                                                                           
              <a class="image" href=""><img class="imageFrame" src="${data.productImageUrl}" alt="${data.productName}"></a>
              <div style="display: block;">
                <p><a class="descriptionItemName" href="">${data.productName}</a></p>
                <span class="descriptionItemBrand">${data.brandName}</span>
              </div>
            </div>
            <div>
              <p class="option txtCenter">Color: ${data.options.color}</p>
            </div>
            <input class="quantity quantity txtCenter" type="number" name="num" value="${data.count}" min="1" max="99">
            <span class="price txtCenter">${data.productPrice}</span>
            <span class="total txtCenter">${data.cellPrice}</span>
          </div>
        </div>
      `;
    })
    .catch(error => console.error('Error fetching product info:', error));
}

/** 숫자 3자리마다 , 찍기 */
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
