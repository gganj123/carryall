function fetchData() {
  axios.get('http://localhost:5001/categories')
    .then(response => {
      const productList = response.data;
      let htmlString = '';

      productList.forEach((product, index) => {
        htmlString += `
        <div class="adminList">
          <div class="check">
            <input type="checkbox" name="checkbox1" id="${product._id}">&ensp;&nbsp;${index + 1}
          </div>
          <div class="sort">
            <input type="text" class ="cate font_17" value="${product.name}">
          </div>
          <div class="sortbutton">
            <button class="change col font_17">수정</button>
          </div>
          <div class="infoCont" style="width:100%; padding-top: 0;">
            <h3> </h3>
          </div>
        </div>`;
      });

      document.getElementById('adminCateList').innerHTML = htmlString;
      const changeButton = document.getElementsByClassName('change')
      for (let button of changeButton) {
        button.addEventListener('click', changeFunc);
        console.log('asd');
    }

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

fetchData();

  
// 추가 버튼 클릭시 폼 추가
let htmlString2 = '';

function addForm(){
    htmlString2 += `
    <div class="adminList">
    <div class="check">
      <input type="checkbox" name="checkbox1">&ensp;&nbsp;1</div>
      <div class="sort"><input type="text" class ="regi cate font_17"></div>
      <div class="sortbutton"><button id="regiButton" class="col font_17">등록</button></div>
      <div class="infoCont" style="width:100%; padding-top: 0;">
        <h3> </h3></div>
</div>`;

    document.getElementById('adminCateAdd').innerHTML = htmlString2;
    const regiButton = document.getElementById('regiButton');

    regiButton.addEventListener('click',function(){
      cateRegifunc();

      alert(`카테고리 등록이 완료 되었습니다`)
      setTimeout(function () {
        location.reload();
      }, 500);;
    })
    // 카데고리 등록버튼 실행
}
const addButton = document.getElementById('addButton');

addButton.addEventListener('click',addForm);


function cateRegifunc() {
    const inputCate = document.querySelector('.regi');
    const value = inputCate.value
    console.log(value)
    const dataToSend = {   
        "name" : value
};
    axios.post('http://localhost:5001/categories', dataToSend)
.then(response => {
    // 서버로부터 받은 응답을 처리합니다.
    console.log(response.data); // 서버에서 전송된 데이터 출력
})
.catch(error => {
    // 오류가 발생했을 때 처리합니다.
    console.error('Error fetching data:', error);
});
}

//삭제버튼

const deleteButton = document.getElementById('deleteButton');

// '선택된 카테고리 삭제' 버튼에 클릭 이벤트 리스너를 추가합니다.
deleteButton.addEventListener('click', function () {
  // 'adminList' 클래스를 가진 요소들을 모두 가져옵니다.
  const adminListItems = document.querySelectorAll('.adminList');

  // 가져온 모든 'adminList' 요소를 순회하면서 체크된 카테고리를 삭제합니다.
  adminListItems.forEach(function (adminListItem) {
      // 각 'adminList' 요소에서 체크된 카테고리를 찾습니다.
      const checkbox = adminListItem.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
          // 체크된 카테고리의 ID를 가져옵니다.
          const categoryId = checkbox.id;

          // 카테고리를 삭제하는 요청을 보냅니다.
          axios.delete(`http://localhost:5001/categories/${categoryId}`)
          .then(response => {
              // 카테고리 삭제에 성공한 경우
              alert(`카테고리가 삭제되었습니다.`);
              
              // 화면에서 해당 카테고리를 제거합니다.
              adminListItem.parentNode.removeChild(adminListItem);
              console.log(categoryId)  
      setTimeout(function () {
        location.reload();
      }, 500);;      
            })
          .catch(error => {
            console.log(categoryId)  
              // 카테고리 삭제에 실패한 경우
              console.error(`카테고리 ID ${categoryId} 삭제 요청 실패:`, error);
          });
      }
  });
});

// 수정버튼

function changeFunc(event) {
  // 클릭된 요소가 수정 버튼인지 확인
  if (event.target.classList.contains('change')) {
      // 수정 버튼이 클릭된 경우, 해당 수정 버튼의 부모 요소를 찾음
      const adminListItem = event.target.closest('.adminList');

      // 부모 요소 내에서 체크박스를 찾음
      const checkbox = adminListItem.querySelector('input[type="checkbox"]');
      const input = adminListItem.querySelector('input[type="text"]');
     
      // 체크박스가 있는지 확인 후 변수에 할당
      if (checkbox && input) {
        // 체크박스와 input 텍스트가 모두 있는 경우
        const checkboxId = checkbox.id; // 체크박스의 id 가져오기
        const inputValue = input.value; // input 텍스트의 값 가져오기

        // 원하는 작업 수행
        console.log('체크박스 ID:', checkboxId);
        console.log('입력된 텍스트:', inputValue);
          const putdata = {   
            "name": inputValue
        }
          // 카테고리를 수정하는 요청을 보냄
          axios.put(`http://localhost:5001/categories/${checkboxId}`, putdata)
              .then(response => {
                  // 카테고리 수정에 성공한 경우
                 alert(`카테고리명이 수정되었습니다. '${inputValue}'`);
              })
              .catch(error => {
                  // 카테고리 수정에 실패한 경우
                  console.error(`카테고리 ID ${checkboxId} 수정 요청 실패:`, error);
              });
      } else {
          // 체크박스가 없는 경우
          console.error('해당 수정 버튼의 부모 요소에 체크박스가 없습니다.');
      }
  }
}
