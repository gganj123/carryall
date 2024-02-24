document.addEventListener("DOMContentLoaded", function() {
  const addItem = document.getElementById("addItem");
  const addItem2 = document.getElementById("addItem2");
  const addItem3= document.getElementById("addItem3");

  addItem.addEventListener("click", addItemToCart);
  addItem2.addEventListener("click", addItemToCart);
  addItem3.addEventListener("click", addItemToCart);

});

function addItemToCart() {
  // 기존에 저장된 cartItems 데이터 가져오기, 없으면 빈 배열로 초기화
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let isExist = false;


  const itemId = this.id;

  cartItems.forEach(item => {
    if (item._id === itemId) isExist = true; 
  });

  if (isExist) {
    alert("이미 장바구니에 담긴 상품입니다.");
    return;
  }

  // 더미 데이터를 생성하여 배열에 추가
  const dummyData = {
    _id: itemId,
    isChecked: false,
    imageUrl: "../img/chanel.png",
    name: "Name ",
    brand: "Brand ",
    option: "Option ",
    quantity: 1,
    price: 10000,
    totalPricePerItem: 0
  };

  // cartItems 배열에 새로운 아이템을 추가
  cartItems.push(dummyData);

  // 업데이트된 cartItems를 다시 로컬 스토리지에 저장하고 장바구니 페이지로 이동
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayUserCartInfo();
}

