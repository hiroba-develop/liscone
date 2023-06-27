import { useEffect, useState } from 'react';

/**
 * 디바운스 값을 반환한다.
 *
 * @param value 감지 값
 * @param delay 딜레이
 * @returns 디바운스 값
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
