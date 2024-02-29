document.addEventListener("DOMContentLoaded", function() {
  const addItem = document.getElementById("addItem");
  const addItem1 = document.getElementById("addItem2");
  const addItem2= document.getElementById("addItem3");
  

  addItem.addEventListener("click", addItemToCart);
  addItem1.addEventListener("click", addItemToCart1);
  addItem2.addEventListener("click", addItemToCart2);

});

const dummyData = {
  _id: "65e00aa83651c7df60af0b95",
  quantity: 99,
  option: "black",
  isChecked: true
};  

const dummyData1 = {
  _id: "65e00aa83651c7df60af0b96",
  quantity: 3,
  option: "white",
  isChecked: true
};  

const dummyData2 = {
  _id: "65e00aa83651c7df60af0b97",
  quantity: 1,
  option: "brown",
  isChecked: true
};  

function addItemToCart() {
  // 기존에 저장된 cartItems 데이터 가져오기, 없으면 빈 배열로 초기화
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // cartItems 배열에 새로운 아이템을 추가
  for(let i = 0; i < cartItems.length; i++){
    if(dummyData._id === cartItems[i]._id){
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }
  }
  cartItems.push(dummyData);
  // 업데이트된 cartItems를 다시 로컬 스토리지에 저장하고 장바구니 페이지로 이동
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addItemToCart1() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // cartItems 배열에 새로운 아이템을 추가
  for(let i = 0; i < cartItems.length; i++){
    if(dummyData1._id === cartItems[i]._id){
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }
  }
  cartItems.push(dummyData1);
  // 업데이트된 cartItems를 다시 로컬 스토리지에 저장하고 장바구니 페이지로 이동
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addItemToCart2() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // cartItems 배열에 새로운 아이템을 추가
  for(let i = 0; i < cartItems.length; i++){
    if(dummyData2._id === cartItems[i]._id){
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }
  }
  cartItems.push(dummyData2);
  // 업데이트된 cartItems를 다시 로컬 스토리지에 저장하고 장바구니 페이지로 이동
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}