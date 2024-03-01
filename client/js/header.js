document.addEventListener("DOMContentLoaded", function() {
    var footerElement = document.getElementById("header");
    footerElement.innerHTML = `
<div class="heade"></div>
    <div class="heade" style="background-color: #fafafa;">
        <button class="logoButton">
            <h1 class="logo slideDown" style="color:black"><a href="/">CARRYALL</h1></a>
        </button>
        <input class="headInput" type="text" placeholder="검색">
        <button class="headmenu"><a href="/cart">장바구니</button>
        <button class="headmenu login " ><a href="/loginMember">로그인</button>
        <button class="headmenu logout none" ><a href="/loginMember">로그아웃</button>
        <button class="headmenu mypage"><a href="/mypage">마이페이지</button>
        <button class="headmenu admin none"><a href="/admin">관리자 페이지</button>
        <button class="headmenu"><a href="/join">회원가입</button>
    </div>`;
  // 1. 로그인 여부 localStorage로 작성
  const loggedInUser = localStorage.getItem('loggedInUser');
  const loginButton = document.querySelector('.headmenu.login');
  const logoutButton = document.querySelector('.headmenu.logout');
  const mypageButton = document.querySelector('.headmenu.mypage');
  const adminButton = document.querySelector('.headmenu.admin');

  console.log('loggedInUser:', loggedInUser);

  if (loggedInUser) {
    const userData = JSON.parse(loggedInUser);
    if (userData.message === "로그인 성공") {
      loginButton.classList.add('none');
      logoutButton.classList.remove('none');

      // Check if the logged in user is an admin
      if (userData.username === "adminCarryAll") {
        mypageButton.classList.add('none');
        adminButton.classList.remove('none');
      }
    }
  } else {
    loginButton.classList.remove('none');
    logoutButton.classList.add('none');
  }

  // 2. 로그아웃 구현
  logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    loginButton.classList.remove('none');
    logoutButton.classList.add('none');

    // Make sure mypage button is visible after logout
    mypageButton.classList.remove('none');
    adminButton.classList.add('none');
  });

  // 3. 마이페이지 클릭 시 처리
  mypageButton.addEventListener('click', function(event) {
    if (!localStorage.getItem('loggedInUser')) {
      event.preventDefault(); // 페이지 이동을 막음
      alert("로그인시 접속가능합니다.");
    }
  });
});
