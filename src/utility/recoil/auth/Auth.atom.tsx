import { atom } from "recoil";
import { StoargeEnum } from "../effect/constant/StorageEnum";
import { localStorageEffect, sessionStorageEffect } from "../effect/Storage";

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
 * ls인증
 */
interface LSAuth {
  /**
   * 유저 아이디
   */
  userId: string;
  /**
   * 유저 패스워드
   */
  pw: string;
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

/**
 * ls인증 atom
 */
const lsAuthAtom = atom<LSAuth>({
  key: "lsAuth",
  default: {
    userId: "",
    pw: "",
  } as LSAuth,
  effects: [localStorageEffect(StoargeEnum.AUTH)],
});

export { lsAuthAtom, type LSAuth };
