function loggedIn() {
  axios
    .get("/api/get-session")
    .then((response) => {
      const userData = response.data;

      if (userData.user.username === "adminCarryAll") {
        const adminEl = document.querySelectorAll('.headmenu.admin');
        adminEl.forEach( idx => idx.classList.add('on') );
        console.log("관리자", adminEl);
        
      } else {
        const loginEl = document.querySelectorAll('.headmenu.logout');
        loginEl.forEach( idx => idx.classList.add('on') );
        console.log("일반회원임");
      }
    })
    .catch((error) => {
      const logoutEl = document.querySelectorAll('.headmenu.login');
      logoutEl.forEach( idx => idx.classList.add('on') );
      console.log("로그아웃됨");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // axios 라이브러리 추가
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
  document.head.appendChild(script);

  var headerElement = document.getElementById("header");
  headerElement.innerHTML = `
    <div class="header headerWrap">
        <button class="logoButton">
            <h1 class="logo slideDown" style="color:black"><a href="/">CarryAll</a></h1>
        </button>

        <div class="headmenuWrap">
        <button class="headmenu login"><a href="/loginMember">로그인</a></button>
        <button class="headmenu logout admin"><a href="/">로그아웃</a></button>
        <button class="headmenu login"><a href="/joinAgree">회원가입</a></button>
        <button class="headmenu on"><a href="/cart">장바구니</a></button>
        <button class="headmenu logout"><a href="/mypage">마이페이지</a></button>
        <button class="headmenu admin"><a href="/admin">관리자 페이지</a></button>
        </div>
    </div>`;

  loggedIn();

  document
    .querySelector(".headmenu.logout")
    .addEventListener("click", function (event) {
      event.preventDefault();
      axios
        .post("/api/logout")
        .then((response) => {
          console.log("로그아웃 성공:", response.data);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("로그아웃 중 오류 발생:", error);
        });
    });
});
