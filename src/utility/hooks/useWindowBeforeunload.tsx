import { useEffect } from 'react';

/**
 * 새로고침 이벤트 리스너
 *
 * @param value 값
 */
const useWindowBeforeunload = (value: string) => {
  useEffect(() => {
    window.addEventListener('beforeunload', (event) => beforeunloadListener(event, value));

    return () => {
      window.removeEventListener('beforeunload', (event) => beforeunloadListener(event, value));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * 로드 될시 이벤트 리스너
   *
   * @param event 이벤트
   */
  const beforeunloadListener = (event: any, value: string) => {
    event.preventDefault();
    event.returnValue = value;
  };
};

export default useWindowBeforeunload;
