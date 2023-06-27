/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

let intl: any;
/**
 * 번역기 글로벌로 제공한다.
 *
 * @param param0 { children : 리액트 노드 }
 * @returns ReactNode
 */
export const IntlGlobalProvider = ({ children }: any) => {
  intl = useIntl();
  return children;
};

export const truncateString = (str: string, maxLength: number = 6): string => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  } else {
    return str;
  }
}

/**
 * intl를 반환한다.
 *
 * @returns intl
 */
export const appIntl = () => {
  return intl;
};

/**
 * 다음 화면으로 이동한다.
 *
 * @TODO 주석수정
 * @returns 다음 화면
 */
export const useGoPush = () => {
  return (url: string, state?: any) => useNavigate()(url, { state });
};

/**
 * 화면으로 이동 하면서 변경한다.
 *
 * @TODO 주석수정
 * @returns 다음 화면
 */
export const useGoReplace = () => {
  return (url: string, state?: any) => useNavigate()(url, { state, replace: true });
};

/**
 * 이전 페이지로 이동한다.
 *
 * @returns 이전 페이지
 */
export const useGoBack = () => {
  return () => useNavigate()(-1);
};

/**
 * string 유틸리티
 */
export const stringUtil = Object.freeze({
  isString: function (value: any) {
    return typeof value === 'string';
  },
  emptyString: function (value: any) {
    return value === '';
  },
});

/**
 * number 유틸리티
 */
export const numberUtil = Object.freeze({
  isNumber: function (value: any) {
    return typeof value === 'number';
  },
});

/**
 * date 유틸리티
 */
export const dateUtil = Object.freeze({
  isDate: function (d: any) {
    return d instanceof Date && !Number.isNaN(d);
  },
});

/**
 * array 유틸리티
 */
export const arrayUtil = Object.freeze({
  forEachRight: function (array: any[], iteratee: any) {
    return [...array].reverse().forEach((value, index) => {
      iteratee(value, array.length - 1 - index, array);
    });
  },
  castArray: function (...args: any) {
    return args[0] instanceof Array ? args[0] : args;
  },
  isEmptyArray: function (array: any[]) {
    return Array.isArray(array) && array.length !== 0;
  },
});

/**
 * ojbet 유틸리티
 */
export const objectUtil = Object.freeze({
  zipObject: function (keys: string[], values: any[]) {
    return keys.reduce((acc: any, key: any, idx: any) => {
      acc[key] = values[idx];
      return acc;
    }, {});
  },
  isEmptyObj: function (passedObj: any) {
    return !(passedObj && passedObj === Object(passedObj) && Object.keys(passedObj).length !== 0);
  },
  isObject: function (value: any) {
    return value instanceof Object;
  },
});

/**
 * 공통 유틸리티
 */
export const commonUtil = Object.freeze({
  isNil: function (value: any): value is null | undefined {
    return value === null || value === undefined;
  },
  isUndefined: function (value: any): value is undefined | boolean {
    return value === undefined;
  },
  isNull: function (value: any): value is null {
    return value === null;
  },
  empty: function (value: any) {
    if (value === null) return true;
    if (this.isUndefined(value)) return true;
    if (stringUtil.isString(value) && stringUtil.emptyString(value)) {
      return true;
    }
    if (arrayUtil.isEmptyArray(value)) return true;
    if (objectUtil.isEmptyObj(value)) return true;

    return false;
  },
  deepCopy: function deepCopy(item: any) {
    if (!item) {
      return item;
    } // null, undefined values check

    let types = [Number, String, Boolean],
      result: any;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
      if (item instanceof type) {
        result = type(item);
      }
    });

    if (typeof result === 'undefined') {
      if (Object.prototype.toString.call(item) === '[object Array]') {
        result = [];
        item.forEach(function (child: any, index: any) {
          result[index] = deepCopy(child);
        });
      } else if (typeof item === 'object') {
        // testing that this is DOM
        if (item.nodeType && typeof item.cloneNode === 'function') {
          result = item.cloneNode(true);
        } else if (!item.prototype) {
          // check that this is a literal
          if (item instanceof Date) {
            result = new Date(item);
          } else {
            // it is an object literal
            result = {};
            for (const i in item) {
              result[i] = deepCopy(item[i]);
            }
          }
        } else {
          if (false && item.constructor) {
          } else {
            result = item;
          }
        }
      } else {
        result = item;
      }
    }

    return result;
  },
});
