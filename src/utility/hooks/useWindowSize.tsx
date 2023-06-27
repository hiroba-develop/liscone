import { useEffect, useState } from 'react';

/**
 * 윈도우 현재 가로, 세로 길이를 반환한다.
 *
 * @returns width , height
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * react hook 가로, 세로 길이 반환 한다.
 *
 * @returns width , height
 */
export const useWindowDimensions = () => {
  /**
   * 윈도우 가로, 세로
   */
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  /**
   * react hook
   */
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
