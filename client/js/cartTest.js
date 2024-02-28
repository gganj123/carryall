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




  // cartItems.forEach(item => {
  //   if (item.id ==) isExist = true; 
  // });

  // if (isExist) {
  //   alert("이미 장바구니에 담긴 상품입니다.");
  //   return;
  // }

  // 더미 데이터를 생성하여 배열에 추가
  const dummyData = {
    _id: "65df3221cd2e08150fc2a141",
    quantity: 1
  };  

  // cartItems 배열에 새로운 아이템을 추가
  cartItems.push(dummyData);
  console.log("test");

  // 업데이트된 cartItems를 다시 로컬 스토리지에 저장하고 장바구니 페이지로 이동
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}