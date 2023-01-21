import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CACHE_EXPIRY, PORTFOLIO_URL} from '../../constants';
import {PortfolioContext, PortfoliosResponse} from './PortfolioContext';

type Props = {
  children?: React.ReactNode;
};

export const PortfolioProvider: React.FC<Props> = ({children}) => {
  const [portfolioData, setPortfolioData] = useState<PortfoliosResponse | null>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const cachedTime = useRef<number>();
  const intervalId = useRef<number>();

  const fetchPortfolioData = useCallback(async () => {
    if (portfolioData && cachedTime.current) {
      let cacheAge = (Date.now() - cachedTime.current) / 1000;
      if (cacheAge < CACHE_EXPIRY) {
        return Promise.resolve(portfolioData);
      }
    }

    try {
      setIsFetching(true);
      const res = await fetch(PORTFOLIO_URL);
      if (res.ok) {
        const dataObj: PortfoliosResponse = await res.json();
        setPortfolioData(dataObj);
        cachedTime.current = Date.now();
        setIsFetching(false);
        return Promise.resolve(portfolioData);
      }
      setIsFetching(false);
      return Promise.reject(res);
    } catch (e) {
      cachedTime.current = undefined;
      setIsFetching(false);
      return Promise.reject(e);
    }
  }, [portfolioData]);

  useEffect(() => {
    fetchPortfolioData();
    intervalId.current = setInterval(fetchPortfolioData, CACHE_EXPIRY * 1000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PortfolioContext.Provider
      value={{setPortfolioData, portfolioData, fetchPortfolioData, isFetching}}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
