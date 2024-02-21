// 회원 스키마

const customerSchema = new Schema({
  // 회원 고유번호(아이디)
  custId: {
    type: String,
    required: true,
  },
  // 비밀번호
  password: {
    type: String,
    required: true,
  },
  // 이메일
  email: {
    type: String,
  },
  // 성별
  gender: {
    type: String,
  },
  // 전화번호
  tel: {
    type: String,
    required: true,
  },
  // 생일
  birthday: {
    type: Date,
  },
  // 휴대폰 수신 동의
  telSubscription: {
    type: Boolean,
    required: true,
  },
  // 이메일 수신 동의
  emailSubscription: {
    type: Boolean,
    required: true,
  },
});