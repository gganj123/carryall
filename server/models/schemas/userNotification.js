const { Schema } = require("mongoose");

//여러가지 체크를 할 수 있기 때문에 UserNotification 등의 테이블로 분리
const UserNotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
  },
  {
    versionKey: false,
  }
);

module.exports = UserNotificationSchema;