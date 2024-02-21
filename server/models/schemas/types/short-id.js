import { nanoid } from "nanoid";

const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  require: true,
  index: true,
};
// 전체 nanoid 사용 예정 장바구니, 제품 등 구별하고 싶을 시 어떻게?
export default shortId;
