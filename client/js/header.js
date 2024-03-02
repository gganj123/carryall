function loggedIn() {
  axios
    .get("/api/get-session")
    .then((response) => {
      const userData = response.data;

      if (userData.user.username === "adminCarryAll") {
        console.log("관리자");
      } else {
        console.log("일반회원임");
      }
    })
    .catch((error) => {
      console.error(error);
      console.log('로그아웃됨')
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
        <button class="headmenu logout"><a href="/">로그아웃</a></button>
        <button class="headmenu mypage"><a href="/mypage">마이페이지</a></button>
        <button class="headmenu admin" style="display: none;"><a href="/admin">관리자 페이지</a></button>
        <button class="headmenu"><a href="/join">회원가입</a></button>
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
