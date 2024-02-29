const fetchData = (id) => () => {
  axios
    .put(`/api/admin/${id}`)
    .then((response) => {
      const user = response.data;

      let htmlString = `
        <form id="signupForm" action="#" method="post" class="inputForm">
        <fieldset>
          <legend class="formTit">회원정보 수정</legend>
              <div class="box formBox">
              <ul class="joinBox">
                <li>
                  <label for="idName" class="label">
                      <span>아이디</span>
                      <p>${user.username}</p>
                  </label>
                </li>
                <li>
                  <label for="name" class="label">
                    <span>이름</span>
                    <p>${user.name}</p>
                  </label>
                </li>
                <li>
                  <label for="password" class="label">
                    <span>비밀번호</span>
                    <input type="password" class="inputType01" id="password" required=""  value="${user.password}">
                  </label>
                </li>
                <li class="f_fs f_d_c label02">
                  <label for="email" class="label">
                    <span>이메일</span>
                    <input type="text" class="inputType01" id="email" value="${user.email}">
                  </label>
                  <div class="errTxt n2">
                    이메일 주소를 확인하세요.
                  </div>
                </li>
                <li>
                  <label for="phoneNum" class="label">
                    <span>휴대폰 번호</span>
                    <input type="text" class="inputType01" id="phoneNum" required="" maxlength='13'  value="${user.tel}"/>
                  </label>
                </li>
              </ul>
              <li>
                <label for="address01" class="label">
                  <span style="white-space: nowrap;">주소</span>
                  <input type="text" name="address" id="address01" class="inputType01" style="width: 54%; margin-left: 13.4%; margin-right: 20px;" value="${user.zipCode}">
                  <a class="addressBtn" href="#" onclick="findAddr()">우편번호 검색</a>
                </label>
                <div style="flex-direction: column; align-items: flex-end;" class="address_line address_line02 f_c label">
                    <label for="address02" class="label"></label>
                    <input style="margin-top: 20px;" type="text" name="address" id="address02" class="inputType01" value="${user.address1}">
                    <label for="address03" class="label"></label>
                    <input style="margin-top: 20px;" type="text" name="address" id="address03" class="inputType01" placeholder="추가 상세 주소를 입력하세요."  value="${user.address2}">
                </div>
              </li>
            </div>
        </fieldset>                        
      </form>
        `;

      document.getElementById("userEditForm").innerHTML = htmlString;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();
