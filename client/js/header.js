document.addEventListener("DOMContentLoaded", function() {
    var footerElement = document.getElementById("header");
    footerElement.innerHTML = `
<div class="heade"></div>
    <div class="heade" style="background-color: #fafafa;">
        <button class="logoButton">
            <h1 class="logo" style="color:black"><a href="/">CARRYALL</h1></a>
        </button>
        <input class="headInput" type="text" placeholder="검색">
        <button class="headmenu" style="color:black"><a href="/cart">장바구니</button>
        <button class="headmenu" style="color:black"><a href="/login_member">로그인</button>
        <button class="headmenu" style="color:black"><a href="/login_member">마이페이지</button>
        <button class="headmenu" style="color:black"><a href="/join_agree">회원가입</button>
    </div>`;
});