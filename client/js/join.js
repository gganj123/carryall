// 빈 칸 알럿창
function saveToSessionStorage() {
  window.sessionStorage.clear();

  const inputEl = document.querySelectorAll('.inputType01');
  for (let idx = 0; idx < inputEl.length; idx++) {
    const value = inputEl[idx].value.trim();
    if (!value) {
      title = inputEl[idx].closest('.label').querySelector('span');
      alert(title.innerHTML + '을(를) 입력해주세요');
      window.scrollTo(0, (title.offsetTop - 200));
      return false;
    }
  }
}

