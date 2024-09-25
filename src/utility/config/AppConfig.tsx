import { EnvCd } from '../constants/EnvCdEnum';

export interface AppConfig {
  /**
   * api url 주소
   */
  apiUrl: string | undefined;

  /**
   * 환경 코드
   */
  envCd: EnvCd;
}

/**
 * 환경 정보를 반환한다.
 *
 * @returns 환경
 */
export const config = (): AppConfig => {
  /**
   * 접두사
   */
  const prefix = 'REACT_APP';

  /**
   * 원하는 키값의 환경정보를 반환한다.
   *
   * @param key 키
   */
  const get = (key: string): string | undefined => {
    return process.env[key];
  };

  return {
    apiUrl: 'http://54.249.88.125/api/',
    envCd: (get(`${prefix}_ENV_CD`) as EnvCd) ?? EnvCd.LOCAL,
  };
};
