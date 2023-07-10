/**
 * 로컬 스토리지 effect
 *
 * @description auth atom이 변경되면 local 스토리지도 자동으로 반영 되게 한다.
 *
 * @param key 키
 */
export const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };
