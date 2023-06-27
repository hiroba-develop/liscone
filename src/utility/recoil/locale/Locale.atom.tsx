import { atom } from 'recoil';

/**
 * 번역기 타입
 */
type Locale = 'ko' | 'jp' | 'en';

/**
 * 번역기 atom
 */
const localeAtom = atom<Locale>({
  key: 'locale',
  default: 'ko',
});

export { localeAtom };
