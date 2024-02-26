module.exports = () => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@";
  let password = "";
  for (let i = 0; i < length; i++) {
    // charset에서 랜덤으로 문자 선택
    const randomIndex = Math.floor(Math.random() * 12);
    password += charset[randomIndex];
  }
  return password;
}; 
