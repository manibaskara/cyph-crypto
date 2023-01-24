import {useCallback, useRef} from 'react';
import {CACHE_EXPIRY} from '../constants';
export interface CacheType {
  [url: string]: {data: Response; timeStamp: number};
}
type UseFetchType = {
  fetchData: <T>(
    url: string,
    requestBody?: RequestInit,
  ) => Promise<{data: T; timeStamp: number}>;
};

const useFetch = (): UseFetchType => {
  const cacheData = useRef<CacheType>({});

  const fetchData = useCallback(async function <T>(
    url: string,
    requestBody?: RequestInit,
  ): Promise<{data: T; timeStamp: number}> {
    try {
      if (cacheData.current[url]) {
        const cache = cacheData.current;
        const {data, timeStamp} = cache[url];
        if (data) {
          let age = (Date.now() - timeStamp) / 1000;
          if (age < CACHE_EXPIRY) {
            return {data: data as T, timeStamp};
          } else {
            delete cacheData.current[url];
          }
        }
      }
      const request = new Request(url, requestBody);

      const res = await fetch(request);
      if (res.ok) {
        const data = await res.json();
        const returnData = {data, timeStamp: Date.now()};
        cacheData.current[url] = returnData;
        return returnData;
      }
      return Promise.reject(res);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  []);

  return {
    fetchData,
  };
};

export default useFetch;
