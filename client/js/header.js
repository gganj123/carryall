document.addEventListener("DOMContentLoaded", function() {
    var footerElement = document.getElementById("header");
    footerElement.innerHTML = `
<div class="heade"></div>
    <div class="heade" style="background-color: #fafafa;">
        <button class="logoButton">
            <h1 class="logo"><a href="./main.html">CARRYALL</h1>
        </button>
        <input class="headInput" type="text" placeholder="검색">
        <button class="headmenu"><a href="./cart.html">장바구니</button>
        <button class="headmenu" ><a href="./member/login_member.html">로그인</button>
        <button class="headmenu"><a href="./member/login_member.html">마이페이지</button>
        <button class="headmenu"><a href="./member/join.html">회원가입</button>
    </div>`;
});