document.addEventListener("DOMContentLoaded", function() {
  const totalCheck = document.querySelector(".totalCkBtn");
  const itemsContainer = document.querySelector(".itemContainer");
  const btnDeleteAll = document.querySelector(".btnDeleteAll");
  const btnDeleteSelected = document.querySelector(".btnDeleteSelected");
  

  totalCheck.addEventListener("click", function() {
    const isChecked = totalCheck.checked;
    const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn');

    if(isChecked) {
      for(i = 0; i<checkboxes.length; i++){
        checkboxes[i].checked = true;//체크된 클래스가 chk의 값은 true로 준다.
      }
    }else{
      for(i = 0; i<checkboxes.length; i++){
        checkboxes[i].checked = false;//체크된 클래스가 chk의 값은 false로 준다.
      }
    }

  });

  btnDeleteAll.addEventListener("click", function() {
    deleteAllItems();
  });

  btnDeleteSelected.addEventListener("click", function() {
    deleteSelectedItems();
  });
  // 각 수량 증가/감소 버튼에 대한 이벤트 리스너 추가
  itemsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains('quantityMinus')) {
      decreaseQuantity(event.target);
    } else if (event.target.classList.contains('quantityPlus')) {
      increaseQuantity(event.target);
    }
  });

  displayUserCartInfo();
});

function deleteAllItems() {
  localStorage.removeItem("cartItems");
  const itemsContainer = document.querySelector('.itemContainer');
  itemsContainer.innerHTML = "";
  const selectAllCheckbox = document.querySelector(".totalCkBtn");
  selectAllCheckbox.checked = false;
}

function deleteSelectedItems() {
  const itemsContainer = document.querySelector('.itemContainer');
  const checkboxes = itemsContainer.querySelectorAll('.itemCkBtn');

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const index = Array.from(checkboxes).indexOf(checkbox);
      // 로컬 스토리지에서 해당 상품을 삭제
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // 화면에서 해당 상품을 삭제
      checkbox.closest('.cartItem').remove();
    }
  });

  // 전체 체크박스 해제
  const totalCheck = document.querySelector(".totalCkBtn");
  totalCheck.checked = false;
}

function decreaseQuantity(element) {
  const quantityInput = element.closest('.quantityBox').querySelector('.quantity');
  let newValue = parseInt(quantityInput.value) - 1;
  if (newValue < 1) newValue = 1;
  quantityInput.value = newValue;
  updateQuantityAndStorage(element, newValue);
}

function increaseQuantity(element) {
  const quantityInput = element.closest('.quantityBox').querySelector('.quantity');
  let newValue = parseInt(quantityInput.value) + 1;
  if (newValue > 99) newValue = 99;
  quantityInput.value = newValue;
  updateQuantityAndStorage(element, newValue);
}

function updateQuantityAndStorage(element, newValue) {
  const quantityInput = element.closest('.quantityBox').querySelector('.quantity');
  const cartItem = element.closest('.cartItem');
  const index = Array.from(cartItem.parentElement.children).indexOf(cartItem);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems[index].quantity = newValue;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateTotalPrice(element, newValue, cartItems[index].price);
  displayUserCartInfo();
}

function updateTotalPrice(element, newValue, itemPrice) {
  const totalPriceElement = element.closest('.cartItem').querySelector('.cartBoxH5');
  totalPriceElement.textContent = newValue * itemPrice;
}

// 수량 증가/감소 버튼에 대한 이벤트 리스너 추가
itemsContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains('quantityMinus')) {
    decreaseQuantity(event.target);
  } else if (event.target.classList.contains('quantityPlus')) {
    increaseQuantity(event.target);
  }
});

function displayUserCartInfo() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemsContainer = document.querySelector(".itemContainer");
  
  itemsContainer.innerHTML = "";

  cartItems.forEach(item => {
      const newItem = document.createElement("div");
      newItem.classList.add("cartItem");
      newItem.innerHTML = `
          <input type="checkbox" class="itemCkBtn">
          <div class="cartBoxH1 item" style="display: flex;">
              <img src="${item.imageUrl}" alt="${item.name} 이미지" class="itemImg">
              <div class="item itemInfo">
                  <p class="itemName">${item.name}</p>
                  <p class="itemBrand">${item.brand}</p>
              </div>
          </div>
          <p class="cartBoxH2 item">${item.option}</p>
          <div class="cartBoxH3 quantityBox item">
              <span class="quantityMinus item"><button>-</button></span>
              <input class="quantity item" type="number" value="${item.quantity}" min="1" max="99"></input>
              <span class="quantityPlus item"><button>+</button></span>
          </div>
          <p class="cartBoxH4 item">${item.price}</p>
          <p class="cartBoxH5 item">${item.price * item.quantity}</p>
      `;
      itemsContainer.appendChild(newItem);
  });

  // 장바구니 정보를 표시한 후에는 수량 증가/감소 버튼에 대한 이벤트 리스너를 다시 추가
  itemsContainer.querySelectorAll('.quantityMinus').forEach(button => {
    button.addEventListener('click', function() {
      decreaseQuantity(button);
    });
  });
  itemsContainer.querySelectorAll('.quantityPlus').forEach(button => {
    button.addEventListener('click', function() {
      increaseQuantity(button);
    });
  });
}

