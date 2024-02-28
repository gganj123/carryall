module.exports = () => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@";
  let password = "";
  for (let i = 0; i < 6; i++) { // 이부분 오류
    // charset에서 랜덤으로 문자 선택
    const randomIndex = Math.floor(Math.random() * 12);
    password += charset[randomIndex];
  }
  return password;
}; 
