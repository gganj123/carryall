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

  // 선택한 아이템 삭제
  btnDeleteSelected.addEventListener('click', function() {
    const checkedItems = document.querySelectorAll('.cartItemContainer input[type="checkbox"]:checked');

    checkedItems.forEach(function(item) {
      item.closest('.cartItemContainer').remove();
    });
  });
    
  const quantityInputs = document.querySelectorAll('.cartItemContainer .quantity');
  quantityInputs.forEach(function(input) {
    input.addEventListener('input', updateOrderAmount); // input 이벤트 사용
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

    // 상품 금액과 수량을 가져옵니다
    let price = parseFloat(priceElement.textContent);
    let quantity = parseInt(quantityElement.value);
    let total = price * quantity;

    price = addCommasToNumber(price);
    total = addCommasToNumber(total);
    totalElement.textContent = total;
  });
}



/** 숫자 3자리마다 , 찍기 */
function addCommasToNumber(number) {
return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}