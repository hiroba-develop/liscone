import { atom } from "recoil";
import { StoargeEnum } from "../effect/constant/StorageEnum";
import { sessionStorageEffect } from "../effect/Storage";

/**
 * 商材　상품
 */
interface Products {
  coId: string;
  product_number: string;
  product_name: string;
  product_price: number;
}

/**
 * 商材　상품 atom
 */
const productsAtom = atom<Products[]>({
  key: "products",
  default: [],
  effects: [sessionStorageEffect(StoargeEnum.PRODUCTS)],
});

export { productsAtom, type Products };
