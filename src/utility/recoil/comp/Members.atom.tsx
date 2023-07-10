import { atom } from "recoil";
import { StoargeEnum } from "../effect/constant/StorageEnum";
import { sessionStorageEffect } from "../effect/Storage";

/**
 * メンバー 회원
 */
interface Memebers {
  coId: string;
  member_id: string;
  member_name: string;
}

/**
 * メンバー 회원 atom
 */
const membersAtom = atom<Memebers[]>({
  key: "members",
  default: [],
  effects: [sessionStorageEffect(StoargeEnum.MEMBERS)],
});

export { membersAtom, type Memebers };
