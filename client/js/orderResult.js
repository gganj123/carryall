document.addEventListener("DOMContentLoaded", function() {
  // const phoneNumber = document.querySelector(".phone-number");
  const address = document.querySelector(".address");
  const orderNumber = document.querySelector(".order-number");
  const productName = document.querySelector(".product-name");
  const paymentAmount = document.querySelector(".payment-amount");
  const btnHome = document.getElementById("btnHome");
  const btnMypage = document.getElementById("btnMypage");
  const userName = document.querySelector(".user-name");
  const time = document.querySelector(".timestamp");

  let orderResult = JSON.parse(localStorage.getItem("orderResult")) || [];
  if (orderResult.length === 0) {
      alert("주문 정보가 없습니다.");
      location.href = "/";
  } else{
  if (orderResult.length > 0) {
      const recipientInformation = orderResult[0].recipientInformation;
      const productInformation = orderResult[0].productInformation;

      // 주문 정보 채우기
      time.textContent = orderResult[0].date;
      userName.textContent = recipientInformation.recipientName;
      // phoneNumber.textContent = recipientInformation.recipientTel;
      address.textContent = recipientInformation.recipientAddress;
      console.log(orderResult[0]._id);
      orderNumber.textContent = orderResult[0]._id; // 주문번호 채우기

      // 주문한 상품 정보 채우기
      let productNameString = "";
      productInformation.forEach(product => {
          productNameString += product.name + ", ";
      });
      if(productNameString.length > 10){
        productNameString = productNameString.slice(0, 18) + "...";
      }else{
        productNameString = productNameString.slice(0, -2);// 마지막에 추가된 쉼표와 공백 제거
      }
      productName.textContent = productNameString;
       

      // 최종 결제 금액 계산 및 채우기
      let totalPayment = 0;
      productInformation.forEach(product => {
          totalPayment += product.price * product.quantity;
      });
      paymentAmount.textContent = totalPayment.toLocaleString() + "원";
  }

  // 홈 버튼 및 주문 버튼에 대한 이벤트 리스너 추가
  btnHome.addEventListener("click", function() {
    // 홈으로 이동하는 코드 추가
    localStorage.removeItem("orderResult");
    location.href='/';
  });

  btnMypage.addEventListener("click", function() {
    localStorage.removeItem("orderResult");
    location.href='/mypage';
  });
}
});
