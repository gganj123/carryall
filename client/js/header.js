document.addEventListener("DOMContentLoaded", function() {
  var footerElement = document.getElementById("header");
  footerElement.innerHTML = `
  <div class="heade"></div>
  <div class="heade" style="background-color: #fafafa;">
    <button class="logoButton">
      <h1 class="logo" style="color:black"><a href="/">CARRYALL</h1></a>
    </button>
    <input class="headInput" type="text" placeholder="검색">
    <button class="headmenu"><a href="./cart.html">장바구니</button>
    <button class="headmenu login " ><a href="./loginMember.html">로그인</button>
    <button class="headmenu logout none" ><a href="./loginMember.html">로그아웃</button>
    <button class="headmenu"><a href="./loginMember.html">마이페이지</button>
    <button class="headmenu"><a href="./join.html">회원가입</button>
  </div>`;
});

