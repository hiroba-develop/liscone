import { atom } from "recoil";
import { StoargeEnum } from "../effect/constant/StorageEnum";
import { sessionStorageEffect } from "../effect/Storage";

/**
 * 인증
 */
interface Auth {
  /**
   * 유저 아이디
   */
  userId: string;
  /**
   * 사업체 식별자
   */
  coId: string;
}

/**
 * 인증 atom
 */
const authAtom = atom<Auth>({
  key: "auth",
  default: {
    userId: "",
    coId: "",
  } as Auth,
  effects: [sessionStorageEffect(StoargeEnum.AUTH)],
});

export { authAtom, type Auth };
