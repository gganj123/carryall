document.addEventListener("DOMContentLoaded", function() {
  const addItem = document.getElementById("addItem");

  addItem.addEventListener("click", addItemToCart);

});

function addItemToCart() {
  // 기존에 저장된 cartItems 데이터 가져오기, 없으면 빈 배열로 초기화
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // 더미 데이터를 생성하여 배열에 추가
  const dummyData = {
      imageUrl: "../img/chanel.png",
      name: "Name " + (cartItems.length + 1),
      brand: "Brand " + (cartItems.length + 1),
      option: "Option " + (cartItems.length + 1),
      quantity: 1,
      price: 10000,
      totalPrice: 10000
  };

  // cartItems 배열에 새로운 아이템을 추가합니다.
  cartItems.push(dummyData);

  // 업데이트된 cartItems를 다시 로컬 스토리지에 저장하고 장바구니 페이지로 이동합니다.
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayUserCartInfo();
}
